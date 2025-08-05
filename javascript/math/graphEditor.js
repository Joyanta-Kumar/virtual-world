export class GraphEditor {
  constructor(graph, canvas) {
    this.graph = graph;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
  }
}