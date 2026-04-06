import { Vector2D } from "../motion/Vector2D";
import { Renderer } from "../core/Renderer";
import { Entity } from "./Entity";

export class Weapon extends Entity {
    public isActive: boolean
    public speed: number = 1500


    constructor(x: number, y: number, width: number, height: number) {

        super(x, y, width, height);
        this.isActive = true
    }

    draw(renderer: Renderer): void {
        renderer.drawCircle(this.position.x, this.position.y, this.width / 4, "#00000000");
    }

    update(deltaTime: number, renderer: Renderer): void {
        this.clamp(renderer)
        this.position.x += this.velocity.x * deltaTime
        this.position.y += this.velocity.y * deltaTime
    }

    clamp(renderer: Renderer) {
        if (this.position.x < 0) this.position.x = 0
        if (this.position.x > renderer.width) this.position.x = renderer.width
        if (this.position.y < 0) this.position.y = 0
        if (this.position.y > renderer.height) this.position.y = renderer.height
    }
}

