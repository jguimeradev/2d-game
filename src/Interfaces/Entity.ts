// Every object in the game must implement these two methods

import { Renderer } from "../core/Renderer";

export interface IEntity {
    draw(renderer: Renderer): void
    update(deltaTime: number, renderer: Renderer): void
    clamp(renderer: Renderer): void
}

