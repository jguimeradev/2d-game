import { Renderer } from "../core/Renderer";
import { IEntity } from "../Interfaces/Entity";
import { Vector2D } from "../motion/Vector2D";
import { Input } from "../core/Input";
import { Bullet } from "./Bullet";



export class Player implements IEntity {

    public position: Vector2D
    public speed: number = 1500
    public radius: number
    private input: Input
    public bullets: Array<Bullet> = []
    public bulletSpeed: number = 1000

    constructor(x: number, y: number, radius: number, input: Input) {
        this.position = new Vector2D(x, y)
        this.radius = radius
        this.input = input
    }


    update(deltaTime: number, renderer: Renderer): void {
        //1. Clamp
        this.clamp(renderer)

        //2. Attach keyboard to player direction
        const direction = this.input.motion()
        const velocity = direction.multiply(this.speed)
        this.position = this.position.add(velocity.multiply(deltaTime))


        //3. Aiming and shooting

        const mousePos = this.input.getMousePos()
        const aim = mousePos.substract(this.position).normalise()
        if (this.input.mouse.justClicked) {
            this.bullets.push(new Bullet(this.position, aim, this.bulletSpeed))
        }
        this.bullets.forEach(b => b.update(deltaTime, renderer))
        this.bullets = this.bullets.filter(b => b.isActive)

    }


    draw(renderer: Renderer): void {

        //1. player
        renderer.drawCircle(this.position.x, this.position.y, this.radius, "#cc00ff")

        //2. bullets
        this.bullets.forEach(b => b.draw(renderer))

    }

    clamp(renderer: Renderer) {
        if (this.position.x < 0) this.position.x = 0
        if (this.position.x > renderer.width) this.position.x = renderer.width
        if (this.position.y < 0) this.position.y = 0
        if (this.position.y > renderer.height) this.position.y = renderer.height
    }

}