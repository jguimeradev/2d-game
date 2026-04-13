import { Vector2D } from "../motion/Vector2D"
export class Input {

    public keys: { [key: string]: boolean } = {}

    public mouse = {
        x: 0,
        y: 0,
        isDown: false,
        justClicked: false
    }

    constructor(canvas: HTMLCanvasElement) {
        window.addEventListener('keydown', (e) => this.keys[e.code] = true)
        window.addEventListener('keyup', (e) => this.keys[e.code] = false)

        canvas.addEventListener('mousedown', (e) => {
            this.mouse.isDown = true
            this.mouse.justClicked = true
            this.mouse.x = e.clientX
            this.mouse.y = e.clientY
        })

        canvas.addEventListener('mouseup', () => {
            this.mouse.isDown = false
        })

    }

    public motion(): Vector2D {
        let move = new Vector2D(0, 0)
        if (this.keys['ArrowRight'] || this.keys['KeyD']) move.x += 1;
        if (this.keys['ArrowLeft'] || this.keys['KeyA']) move.x -= 1;
        if (this.keys['ArrowDown'] || this.keys['KeyS']) move.y += 1;
        if (this.keys['ArrowUp'] || this.keys['KeyW']) move.y -= 1;
        return move.normalise();
    }

    public getMousePos(): Vector2D {
        return new Vector2D(this.mouse.x, this.mouse.y)
    }

    public resetPerFrameState() {
        this.mouse.justClicked = false
    }

}