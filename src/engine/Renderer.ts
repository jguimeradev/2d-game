export class Renderer {
    public canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;
    private boundResize = this.resize.bind(this);

    constructor(canvasId: string) {
        const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        if (!canvas) throw new Error(`Canvas element with id "${canvasId}" not found`);

        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Failed to get 2D rendering context");

        this.canvas = canvas;
        this.ctx = ctx;
        this.ctx.textBaseline = "top";

        this.resize();
        window.addEventListener("resize", this.boundResize);
    }

    get width(): number { return this.canvas.width; }
    get height(): number { return this.canvas.height; }

    destroy(): void {
        window.removeEventListener("resize", this.boundResize);
    }

    private resize(): void {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    clear(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawRect(x: number, y: number, w: number, h: number, color: string): void {
        this.ctx.save();
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, w, h);
        this.ctx.restore();
    }

    drawText(
        text: string, x: number, y: number, color: string = "white", font: string = "16px Arial"
    ): void {
        this.ctx.save();
        this.ctx.fillStyle = color;
        this.ctx.font = font;
        this.ctx.fillText(text, x, y);
        this.ctx.restore();
    }

    drawCircle(x: number, y: number, radius: number, fillColor: string, strokeColor: string = "#2176ae", lineWidth: number = 2): void {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.fillStyle = fillColor;
    this.ctx.strokeStyle = strokeColor;
    this.ctx.lineWidth = lineWidth;
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.restore();
}
}