export class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw(ctx, radius = 10, color = "white") {
    ctx.beginPath();
    ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  }
}