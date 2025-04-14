class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw(ctx, { size = 10, color = "white" } = {}) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, size / 2, 0, Math.PI * 2);
    ctx.fill();
  }

  equals(other) {
    return this.x === other.x && this.y === other.y;
  }
}