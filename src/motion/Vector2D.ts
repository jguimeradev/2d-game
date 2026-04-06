export class Vector2D {
    constructor(public x: number = 0, public y: number = 0) { }

    add(v: Vector2D): Vector2D {
        return new Vector2D(this.x + v.x, this.y + v.y)
    }

    substract(v: Vector2D): Vector2D {
        return new Vector2D(this.x - v.x, this.y - v.y)
    }

    multiply(scalar: number = 1): Vector2D {
        return new Vector2D(this.x * scalar, this.y * scalar)
    }

    //length
    magnitude(): number {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
    }

    normalise(): Vector2D {
        const mag = this.magnitude()
        return mag > 0 ? this.multiply(1 / mag) : new Vector2D(0, 0)
    }

    /**
        * Calculates the Euclidean distance between two vectors.
        * @param v1 - The first vector.
        * @param v2 - The second vector.
        * @returns The distance between v1 and v2.
        */
    static distance(v1: Vector2D, v2: Vector2D): number {
        return Math.sqrt((v1.x - v2.x) ** 2 + (v1.y - v2.y) ** 2);
    }



}