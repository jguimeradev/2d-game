# Game Engine Documentation

## Overview

This document describes the two core classes of the game engine: `Game` and `Renderer`. Together they implement a classic **game loop architecture** with a clean separation between orchestration and rendering.

---

## `Game` class

**File:** `src/Game.ts`

The `Game` class is the central orchestrator of the engine. It owns the game loop, delegates updates to logic, and delegates drawing to the `Renderer`.

### Properties

| Property | Type | Description |
|---|---|---|
| `renderer` | `Renderer` | The rendering engine instance |
| `lastTime` | `number` | Timestamp of the previous frame, used to compute `deltaTime` |

### Constructor

```typescript
constructor()
```

Instantiates the `Renderer` and immediately kicks off the game loop via `requestAnimationFrame`. This is the only external call needed — the loop is self-sustaining from this point.

```typescript
this.renderer = new Renderer("canvas");
requestAnimationFrame(this.gameLoop.bind(this));
```

> `.bind(this)` is required because `requestAnimationFrame` invokes the callback in a different context, which would cause `this` to be `undefined` inside `gameLoop`.

### Methods

#### `gameLoop(timestamp: number): void` *(private)*

The core loop, called by the browser before every repaint (typically 60 times per second).

```typescript
private gameLoop(timestamp: number): void {
    if (this.lastTime === 0) this.lastTime = timestamp;
    const deltaTime = (timestamp - this.lastTime) / 1000;
    this.lastTime = timestamp;

    this.update(deltaTime);
    this.draw();

    requestAnimationFrame(this.gameLoop.bind(this));
}
```

**Flow per frame:**
1. Guard against a large first-frame delta by initializing `lastTime` to the first timestamp
2. Compute `deltaTime` in **seconds** (dividing by 1000 converts from milliseconds)
3. Call `update()` with the delta for frame-rate-independent logic
4. Call `draw()` to render the current state
5. Re-schedule itself for the next frame

> The loop is **not recursive** — `gameLoop` does not call itself directly. It hands a reference to the browser, which calls it after the current execution stack is fully cleared. The call stack never grows.

#### `update(deltaTime: number): void` *(private)*

Placeholder for all game logic: movement, collisions, state changes, input handling. Everything here should be multiplied by `deltaTime` to be frame-rate independent.

```typescript
// Example usage inside update:
player.x += speed * deltaTime; // moves at `speed` pixels/second regardless of FPS
```

#### `draw(): void` *(private)*

Clears the canvas and issues draw commands via `Renderer`. Contains no logic — only rendering calls.

```typescript
private draw(): void {
    this.renderer.clear();
    this.renderer.drawRect(10, 10, 100, 100, "red");
    this.renderer.drawText("Hello World", 10, 150);
}
```

### Entry point

```typescript
window.addEventListener("load", () => new Game());
```

Instantiation is deferred until the page is fully loaded to ensure the canvas DOM element exists.

---

## `Renderer` class

**File:** `src/engine/Renderer.ts`

The `Renderer` class is a **Facade** over the native Canvas 2D API. It abstracts away low-level context management and exposes a clean, stateless drawing interface.

### Properties

| Property | Type | Access | Description |
|---|---|---|---|
| `canvas` | `HTMLCanvasElement` | private | The underlying HTML canvas element |
| `ctx` | `CanvasRenderingContext2D` | private | The 2D rendering context |
| `boundResize` | `() => void` | private | Stored reference to the bound resize handler, needed for cleanup |

### Constructor

```typescript
constructor(canvasId: string)
```

Resolves the canvas by ID, validates both the element and the 2D context, sets `textBaseline` to `"top"` for predictable text positioning, and registers the resize listener.

**Throws** if the canvas element is not found or the context cannot be obtained:
```typescript
if (!canvas) throw new Error(`Canvas element with id "${canvasId}" not found`);
if (!ctx) throw new Error("Failed to get 2D rendering context");
```

### Getters

```typescript
get width(): number   // returns canvas.width
get height(): number  // returns canvas.height
```

Expose canvas dimensions for boundary checks in game logic (e.g. keeping a player on screen) without exposing the canvas element itself.

### Methods

#### `resize(): void` *(private)*

Automatically called on construction and on every `window resize` event. Sets the canvas dimensions to match the viewport.

```typescript
private resize(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
}
```

> **Note:** Setting `canvas.width` or `canvas.height` clears the canvas as a browser side effect. This is harmless in a game loop since the canvas is cleared and redrawn every frame anyway.

#### `destroy(): void`

Removes the resize event listener. Must be called if the `Renderer` instance is being discarded to prevent memory leaks.

```typescript
destroy(): void {
    window.removeEventListener("resize", this.boundResize);
}
```

> `boundResize` stores the result of `.bind(this)` as a class property. This is necessary because `.bind()` produces a new function reference every time — storing it ensures the same reference is passed to both `addEventListener` and `removeEventListener`.

#### `clear(): void`

Clears the entire canvas. Should be called at the start of every `draw()` call.

```typescript
clear(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}
```

#### `drawRect(x, y, w, h, color): void`

Draws a filled rectangle. Wraps the operation in `save/restore` to prevent style leaking to subsequent draw calls.

| Parameter | Type | Description |
|---|---|---|
| `x` | `number` | Left edge in pixels |
| `y` | `number` | Top edge in pixels |
| `w` | `number` | Width in pixels |
| `h` | `number` | Height in pixels |
| `color` | `string` | Any valid CSS color string |

#### `drawText(text, x, y, color?, font?): void`

Draws a text string. `y` refers to the **top** of the text (because `textBaseline` is set to `"top"` in the constructor). Also wrapped in `save/restore`.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `text` | `string` | — | The string to render |
| `x` | `number` | — | Left edge in pixels |
| `y` | `number` | — | Top edge in pixels |
| `color` | `string` | `"white"` | Any valid CSS color string |
| `font` | `string` | `"16px Arial"` | Any valid CSS font string |

---

## Design patterns used

| Pattern | Where | Purpose |
|---|---|---|
| **Game Loop** | `Game.gameLoop()` | Frame-rate-independent update and render cycle |
| **Facade** | `Renderer` | Simplifies the Canvas 2D API behind a clean interface |
| **Separation of Concerns** | `Game` vs `Renderer` | Logic and rendering are fully decoupled |
| **Orchestrator** | `Game` | Coordinates systems without performing low-level work itself |

---

## Class diagram

```
Game
├── renderer: Renderer
├── lastTime: number
├── gameLoop(timestamp) → update() + draw() + rAF
├── update(deltaTime)   → game logic
└── draw()              → renderer calls

Renderer
├── canvas: HTMLCanvasElement  (private)
├── ctx: CanvasRenderingContext2D  (private)
├── width / height  (getters)
├── clear()
├── drawRect(x, y, w, h, color)
├── drawText(text, x, y, color?, font?)
├── resize()  (private, auto on window resize)
└── destroy()
```