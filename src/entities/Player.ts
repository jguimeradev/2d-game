import { Entity } from "./Entity";
import { Renderer } from "../engine/Renderer";

export class Player extends Entity {
    public speed: number = 50;

    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height);
    }

    update(deltaTime: number): void {
        this.position.x += this.velocity.x * deltaTime * this.speed;
        this.position.y += this.velocity.y * deltaTime * this.speed;
    }

    draw(renderer: Renderer): void {
        renderer.drawCircle(this.position.x, this.position.y, this.width / 2, "#3498bd");
    }
}