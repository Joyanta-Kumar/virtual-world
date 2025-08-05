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

  removeNode(index) {
    const connections = this.getConnections(this.nodes[index])
    for (const edge of connections) {
      this.removeEdge(this.edges.findIndex(e => edge.equals(e)));
    }
    this.nodes.splice(index, 1);
  }

  tryRemoveNode(node) {
    const index = this.nodes.findIndex(n => node.equals(n));
    if (index == undefined || this.nodes.length == 0) {
      return;
    }
    this.removeNode(index);
  }

  removeEdge(index) {
    this.edges.splice(index, 1);
  }

  tryRemoveEdge(edge) {
    const index = this.edges.findIndex(e => edge.equals(e));
    if (index == undefined || this.edges.length == 0) {
      return;
    }
    this.removeEdge(index);
  }

  getConnections(node) {
    const connections = []
    for (const edge of this.edges) {
      if (edge.contains(node)) {
        connections.push(edge);
      }
    }
    return connections;
  }
}