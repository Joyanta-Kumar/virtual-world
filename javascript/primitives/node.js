export class Node {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw(ctx, radius=10, color="#F3E2D4") {
    ctx.beginPath();
    ctx.arc(this.x, this.y, radius, 0, Math.PI*2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
  }

  equals(that) {
    return this.x == that.x && this.y == that.y;
  }
}