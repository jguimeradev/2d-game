import { Renderer } from "./engine/Renderer";
import { Player } from "./entities/Player";
import { Input } from "./engine/Input";
import { Vector2D } from "./utils/Vector2D";

class Game {
    private renderer: Renderer;
    private lastTime: number = 0;
    private player: Player
    private input: Input

    constructor() {
        this.renderer = new Renderer("canvas");
        this.player = new Player(500, 500, 200, 200)
        this.input = new Input()
        this.start();
    }

    private start(): void {
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
        const axis = this.input.getAxis();
        const move = new Vector2D(axis.x, axis.y).normalize();
        this.player.velocity = move.multiply(this.player.speed);
        this.player.update(deltaTime);
    }

    private draw(): void {
        this.renderer.clear();
        this.renderer.drawRect(0, 0, this.renderer.width, this.renderer.height, "#1b1b1b"); // background first
        this.player.draw(this.renderer)  // player on top
        this.renderer.drawText("Hello World", 10, 150);
    }
}

window.addEventListener("load", () => new Game());