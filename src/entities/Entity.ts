import { Vector2D } from "../utils/Vector2D";
import { Renderer } from "../engine/Renderer";

export abstract class Entity{
    public position: Vector2D
    public velocity: Vector2D
    public width: number
    public height: number
    public isActive: boolean = true


    constructor(x: number, y: number, width: number, heigth: number) {
        this.position = new Vector2D(x, y)
        this.velocity = new Vector2D(0, 0)
        this.width = width
        this.height = heigth
    }

    abstract update(deltaTime: number): void
    abstract draw(render: Renderer): void

    collidesWith(other: Entity): boolean {
        return (
            this.position.x < other.position.x + other.width &&
            this.position.x + this.width > other.position.x &&
            this.position.y < other.position.y + other.height &&
            this.position.y + this.height > other.position.y
        )
    }
    
}