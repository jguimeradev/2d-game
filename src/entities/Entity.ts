import { Vector2D } from "../motion/Vector2D";
import { Renderer } from "../core/Renderer";

export abstract class Entity {
    public position: Vector2D
    public velocity: Vector2D
    public width: number
    public height: number
    public isActive: boolean


    constructor(x: number, y: number, width: number, height: number) {
        this.position = new Vector2D(x, y)
        this.velocity = new Vector2D(0, 0)
        this.width = width
        this.height = height
        this.isActive = true
    }

    abstract draw(renderer: Renderer): void

    abstract update(deltaTime: number, renderer: Renderer): void

}

