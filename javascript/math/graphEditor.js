import { Node } from "../primitives/node.js";
import { Edge } from "../primitives/edge.js";
import { getNearestNode } from "./utils.js";

export class GraphEditor {
  constructor(graph, canvas) {
    this.graph = graph;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    
    this.selected = null;
    this.hovered = null;
    this.mouse = null;

    
    this.#addEventListeners();
  }

  #addEventListeners() {

    this.canvas.addEventListener("mousemove", (event) => {
      this.mouse = new Node(event.offsetX, event.offsetY);
      this.hovered = getNearestNode(this.mouse, this.graph.nodes, 20);
    });

    this.canvas.addEventListener("mousedown", (event) => {
      if (event.button == 0) {
        // left click -> select or add
        if (this.hovered != null) {
          // select
          this.selected = this.hovered;
        }
        else if (this.mouse != null) {
          // add
          this.addNode(this.mouse);
        }
      }
      else if (event.button == 2) {
        // right click -> deselect or remove
        if (this.hovered != null) {
          this.tryRemoveNode(this.hovered);
          if (this.selected != null && this.selected.equals(this.hovered)) {
            this.selected = null;
          }
          this.hovered = null;
          // remove
        }
        else {
          this.selected = null;
          // deselect 
        }
      }
    });

    this.canvas.addEventListener("contextmenu", (event) => {
      event.preventDefault();
    });
  }

  display() {
    this.graph.draw(this.ctx);
    const color = "#17313E";
    if (this.hovered != null) {
      this.hovered.draw(this.ctx, { radius:7, color:color })
    }
    if (this.selected != null) {
      this.selected.draw(this.ctx, { radius:5, color:color })
    }
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

  removeAll() {
    this.graph.nodes.length = 0;
    this.graph.edges.length = 0;
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