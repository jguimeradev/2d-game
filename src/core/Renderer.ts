export class Renderer {
    public canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;

    constructor(canvasId: string) {
        const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        if (!canvas) throw new Error(`Canvas ${canvasId} not found`)
        const ctx = canvas.getContext("2d")
        if (!ctx) throw new Error('Failed to get the context')

        this.canvas = canvas
        this.ctx = ctx

        this.size()
    }

    private size() {
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
    }

    get width(): number {
        return this.canvas.width
    }

    get height(): number {
        return this.canvas.height
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawRectangle(x: number, y: number, w: number, h: number, color: string): void {
        //save the current state
        this.ctx.save()
        this.ctx.fillStyle = color
        this.ctx.fillRect(x, y, w, h)
        this.ctx.restore()
    }

    drawCircle(x: number, y: number, radius: number, color: string): void {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.restore();
    }
}