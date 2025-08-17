export class Graph {
  constructor(nodes = [], edges = []) {
    this.nodes = nodes;
    this.edges = edges;
  }

  draw(ctx) {
    for (const element of this.edges) {
      element.draw(ctx);
    }
    for (const element of this.nodes) {
      element.draw(ctx);
    }
  }
}