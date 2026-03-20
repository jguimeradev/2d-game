export class Input {
    private keys: Set<string> = new Set();

    constructor() {
        window.addEventListener('keydown', (e) => this.keys.add(e.code));
        window.addEventListener('keyup', (e) => this.keys.delete(e.code));
    }

    isPressed(key: string): boolean {
        return this.keys.has(key);
    }

    getAxis(): { x: number, y: number } {
        let x = 0;
        let y = 0;
        if (this.isPressed('KeyW') || this.isPressed('ArrowUp')) y -= 1;
        if (this.isPressed('KeyS') || this.isPressed('ArrowDown')) y += 1;
        if (this.isPressed('KeyA') || this.isPressed('ArrowLeft')) x -= 1;
        if (this.isPressed('KeyD') || this.isPressed('ArrowRight')) x += 1;
        return { x, y };
    }
}