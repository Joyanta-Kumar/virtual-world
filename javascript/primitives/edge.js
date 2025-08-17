export class Edge {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  draw(ctx, { width=2, color="#C5B0CD", dash=[] } = {}) {
    ctx.beginPath();
    ctx.setLineDash(dash);
    ctx.moveTo(this.start.x, this.start.y);
    ctx.lineTo(this.end.x, this.end.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
  }

  contains(node) {
    return node.equals(this.start) || node.equals(this.end);
  }

  equals(that) {
    return this.contains(that.start) && this.contains(that.end);
  }


}

