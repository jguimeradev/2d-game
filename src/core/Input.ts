export class Input {
    private keys: Set<string> = new Set()

    /** 
     *  Initializes input listeners on the window *
     */

    constructor() {
        window.addEventListener("keydown", (e) => this.keys.add(e.key))
        window.addEventListener("keyup", (e) => this.keys.delete(e.key))
    }

    /** 
    * check if a specific key is pressed. 
    *  @returns true if the key is pressed, false otherwise.
    */

    isPressed(key: string): boolean {
        return this.keys.has(key)
    }

    axis(): { x: number, y: number } {

        let x = 0
        let y = 0

        if (this.isPressed("ArrowUp")) y -= 1
        if (this.isPressed("ArrowDown")) y += 1
        if (this.isPressed("ArrowLeft")) x -= 1
        if (this.isPressed("ArrowRight")) x += 1

        return { x, y }
    }


}