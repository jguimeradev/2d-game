import { Renderer } from "./core/Renderer";
import { Player } from "./entities/Player";
import { Weapon } from "./entities/Weapon";
import { Input } from "./core/Input";
import { Vector2D } from "./motion/Vector2D";
import { Bullets } from "./entities/Bullets";

export class Game {
    private renderer: Renderer
    private currentTime: number = 0
    private player: Player
    private input: Input
    private weapon: Weapon
    private bullets: Bullets

    constructor() {
        this.renderer = new Renderer("canvas")
        this.player = new Player(this.renderer.width / 2, this.renderer.height / 2, 150, 150)
        this.weapon = new Weapon(this.player.position.x, this.player.position.y, 150, 150)
        this.bullets = new Bullets(this.weapon.position.x, this.weapon.position.y, 70, 70)
        this.input = new Input()
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
        this.weapon.draw(this.renderer)
        this.bullets.draw(this.renderer)
    }

    private update(deltaTime: number) {

        const axis = this.input.axis()
        const shot = this.input.shot()
        const move = new Vector2D(axis.x, axis.y).normalise()
        const shooting = new Vector2D(shot.x, shot.y).normalise()

        this.player.velocity = move.multiply(this.player.speed)
        this.weapon.velocity = move.multiply(this.player.speed)
        this.bullets.velocity = shooting.multiply(this.bullets.speed)

        this.player.update(deltaTime, this.renderer)
        this.weapon.update(deltaTime, this.renderer)
        this.bullets.update(deltaTime, this.renderer)
    }
}

window.addEventListener("load", () => new Game())