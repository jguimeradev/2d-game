import { Renderer } from "../core/Renderer";
import { Vector2D } from "../motion/Vector2D";
import { Entity } from "./Entity";
import { Bullets } from "./Bullets";


export class Player extends Entity {

    public speed: number = 1500

    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height);
    }

    draw(renderer: Renderer): void {
        renderer.drawCircle(this.position.x, this.position.y, this.width / 2, "#2176ae")
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