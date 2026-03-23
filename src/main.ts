import { Renderer } from "./core/Renderer";
import { Player } from "./entities/Player";

export class Game {
    private renderer: Renderer
    private currentTime: number = 0
    private player: Player

    constructor() {
        this.renderer = new Renderer("canvas")
        this.player = new Player(this.renderer.width / 2, this.renderer.height / 2, 50, 50)
        this.start()
    }

    private start(): void {
        requestAnimationFrame(this.loop.bind(this))
    }

    private loop(timestamp: number): void {

        if (this.currentTime === 0) this.currentTime = timestamp

        const deltaTime = (timestamp - this.currentTime) / 1000
        this.currentTime = timestamp

        this.update(deltaTime)
        this.draw()
        requestAnimationFrame(this.loop.bind(this))
    }

    private draw() {
        this.renderer.clear()
        this.renderer.drawRectangle(0, 0, this.renderer.width, this.renderer.height, "#1b1b1b")
        this.player.draw(this.renderer)
    }

    private update(deltaTime: number) {

    }
}


window.addEventListener("load", () => new Game())