import { Renderer } from "../core/Renderer";
import { Vector2D } from "../motion/Vector2D";
import { Entity } from "./Entity";
export class Player extends Entity {

    public speed: number = 1000

    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height);
    }


    draw(renderer: Renderer): void {
        renderer.drawCircle(this.position.x, this.position.y, this.width / 2, "#2176ae")
    }

    update(deltaTime: number, renderer: Renderer): void {
        this.position.x += this.velocity.x * deltaTime
        this.position.y += this.velocity.y * deltaTime
    }

}