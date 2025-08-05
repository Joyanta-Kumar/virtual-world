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

  containsNode(node) {
    return this.nodes.find(n => node.equals(n))
  }

  containsEdge(edge) {
    return this.edges.find(e => edge.equals(e))
  }

  addNode(node) {
    this.nodes.push(node);
  }

  tryAddNode(node) {
    if (this.containsNode(node) == undefined) {
      this.addNode(node);
    }
  }

  addEdge(edge) {
    this.edges.push(edge);
  }

  tryAddEdge(edge) {
    if (this.containsEdge(edge) == undefined) {
      this.addEdge(edge);
    }
  }
}