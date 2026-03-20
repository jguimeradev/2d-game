import { Renderer } from "./engine/Renderer";


class Game {
    private renderer: Renderer;
    private lastTime: number = 0;

    constructor() {
        this.renderer = new Renderer("canvas");
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    private gameLoop(timestamp: number): void {
        if (this.lastTime === 0) this.lastTime = timestamp;
        const deltaTime = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;

        this.update(deltaTime);
        this.draw();

        requestAnimationFrame(this.gameLoop.bind(this));
    }

    private update(deltaTime: number): void {
        // game logic here
    }

    private draw(): void {
        this.renderer.clear();
        this.renderer.drawRect(0, 0, this.renderer.width, this.renderer.height, "#1b1b1b");
        this.renderer.drawText("Hello World", 10, 150); // moved below the rect
    }
}

window.addEventListener("load", () => new Game());