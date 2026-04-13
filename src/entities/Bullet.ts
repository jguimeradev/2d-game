import { IEntity } from "../Interfaces/Entity";
import { Vector2D } from "../motion/Vector2D";
import { Renderer } from "../core/Renderer";

export class Bullet implements IEntity {

    public position: Vector2D
    public velocity: Vector2D
    public speed: number = 1000
    public radius: number = 5
    public isActive: boolean = true

    constructor(position: Vector2D, velocity: Vector2D, speed: number) {
        this.position = new Vector2D(position.x, position.y)
        this.velocity = velocity.normalise().multiply(speed)
    }


    update(deltaTime: number, renderer: Renderer): void {
        if (!this.clamp(renderer)) return
        this.position = this.position.add(this.velocity.multiply(deltaTime))
    }


    draw(renderer: Renderer): void {
        renderer.drawCircle(this.position.x, this.position.y, this.radius, "#ae2140")
    }

    clamp(renderer: Renderer): boolean {
        if (this.position.x < 0 || this.position.x > renderer.width || this.position.y < 0 || this.position.y > renderer.height) {
            this.isActive = false
        }
        return this.isActive
    }



}