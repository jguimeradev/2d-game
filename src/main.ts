import { Renderer } from "./core/Renderer";
import { Player } from "./entities/Player";
import { Input } from "./core/Input";

export class Game {
    private renderer: Renderer
    private currentTime: number = 0
    private player: Player
    private input: Input


    constructor() {
        this.renderer = new Renderer("canvas")
        this.input = new Input(this.renderer.canvas)
        this.player = new Player(this.renderer.width / 2, this.renderer.height / 2, 100, this.input)
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
        this.player.update(deltaTime, this.renderer)
        this.input.resetPerFrameState()
    }
}
window.addEventListener("load", () => new Game())