export class GraphEditor {
  constructor(graph, canvas) {
    this.graph = graph;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
  }

  containsNode(node) {
    return this.graph.nodes.find(n => node.equals(n))
  }

  containsEdge(edge) {
    return this.graph.edges.find(e => edge.equals(e))
  }

  addNode(node) {
    this.graph.nodes.push(node);
  }

  addEdge(edge) {
    this.graph.edges.push(edge);
  }

  tryAddNode(node) {
    if (this.containsNode(node) == undefined) {
      this.addNode(node);
    }
  }

  tryAddEdge(edge) {
    if (this.containsEdge(edge) == undefined) {
      this.addEdge(edge);
    }
  }

  removeNode(index) {
    const connections = this.getConnections(this.graph.nodes[index])
    for (const edge of connections) {
      this.removeEdge(this.graph.edges.findIndex(e => edge.equals(e)));
    }
    this.graph.nodes.splice(index, 1);
  }

  tryRemoveNode(node) {
    const index = this.graph.nodes.findIndex(n => node.equals(n));
    if (index == undefined || this.graph.nodes.length == 0) {
      return;
    }
    this.removeNode(index);
  }

  removeEdge(index) {
    this.graph.edges.splice(index, 1);
  }

  tryRemoveEdge(edge) {
    const index = this.graph.edges.findIndex(e => edge.equals(e));
    if (index == undefined || this.graph.edges.length == 0) {
      return;
    }
    this.removeEdge(index);
  }

  getConnections(node) {
    const connections = []
    for (const edge of this.graph.edges) {
      if (edge.contains(node)) {
        connections.push(edge);
      }
    }
    return connections;
  }
}