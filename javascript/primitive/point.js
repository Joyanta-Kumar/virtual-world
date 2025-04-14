class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  // Method to draw the point on a canvas context
  draw(ctx, {size = 10, color = "white"} = {}) {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(this.x, this.y, size / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }

  equals(other) {
    return this.x === other.x && this.y === other.y;
  }
}