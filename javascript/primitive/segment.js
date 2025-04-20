export class Segment {
  constructor(start, end) {
    // Choosing the closest point to Y axis as start.
    // Not necessary. But it might help later.
    if (start.x <= end.x) {
      this.start = start;
      this.end = end;
    }
    else {
      this.start = end;
      this.end = start;
    }
  }

  draw(ctx, color = "white", width = 2) {
    ctx.beginPath();
    ctx.moveTo(this.start.x, this.start.y);
    ctx.lineTo(this.end.x, this.end.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
  }
}