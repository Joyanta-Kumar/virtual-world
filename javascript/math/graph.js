export class Graph {
  constructor(points = [], segments = []) {
    this.points = points;
    this.segments = segments;
  }

  draw(ctx) {
    this.points.forEach(point => point.draw(ctx));
    this.segments.forEach(segment => segment.draw(ctx));
  }

  addPoint(point) {
    if (!this.points.includes(point)) this.points.push(point);
  }
}