export class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw(ctx, color = "white", radius = 10) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  }
}