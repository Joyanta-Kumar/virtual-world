import { Node } from "./primitives/node.js";
import { Edge } from "./primitives/edge.js";
import { getNearestNode } from "./math/utils.js";
import { Viewport } from "./viewport.js";

export class GraphEditor {
  constructor(graph, canvas) {
    this.graph = graph;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.mouse;
    this.selected = null;
    this.hovered = null;
    this.dragging = false;


    this.#addEventListeners();
  }

  #addEventListeners() {
    this.canvas.addEventListener("mousemove", this.#handleMouseMove.bind(this));
    this.canvas.addEventListener("mousedown", this.#handleMouseDown.bind(this));
    this.canvas.addEventListener("mouseup", this.#handleMouseUp.bind(this));
    this.canvas.addEventListener("contextmenu", this.#handleContextMenu);
  }

  #handleMouseMove(event) {
    this.mouse = window.viewport.getMouse(event);
    if (event.shiftKey && this.selected) {
      if (Math.abs(this.selected.x - this.mouse.x) > Math.abs(this.selected.y - this.mouse.y)) {
        this.mouse.y = this.selected.y;
      }
      else {
        this.mouse.x = this.selected.x;
      }
    }

    if (this.dragging) {
      this.hovered.x = this.mouse.x;
      this.hovered.y = this.mouse.y;
    }
    else {
      this.hovered = getNearestNode(this.mouse, this.graph.nodes, 20*window.viewport.zoom);
    }
  }

  #handleMouseDown(event) {
    // this.mouse = new Node(event.offsetX, event.offsetY); // seems unnecessary.
    this.hovered = getNearestNode(this.mouse, this.graph.nodes, 20);

    // Left click
    if (event.button == 0) {
      if (this.hovered) {
        this.dragging = true;
        if (this.selected) {
          this.tryAddEdge(new Edge(this.selected, this.hovered));
        }
        this.selected = this.hovered;
        console.log("Selected", this.selected);
      }
      else {
        if (this.selected) {
          this.tryAddEdge(new Edge(this.selected, this.mouse));
        }
        this.addNode(this.mouse);
        this.selected = this.mouse;
        this.hovered = this.mouse;
      }
    }

    // Right click
    else if (event.button == 2) {
      if (this.selected) {
        console.log("Deselected node", this.selected);
        this.selected = null;
      }
      else if (this.hovered) {
        this.tryRemoveNode(this.hovered);
        if (this.hovered == this.selected) {
          this.selected = null;
        }
        this.hovered = null;
      }
    }
  }

  #handleMouseUp() {
    this.dragging = false;
  }
  #handleContextMenu(event) {
    event.preventDefault();
  }


  display() {
    this.graph.draw(this.ctx);
    const color = "#415E72";
    if (this.hovered) {
      this.hovered.draw(this.ctx, { radius: 7, color: color })
    }
    if (this.selected) {
      const predictedEdge = new Edge(this.selected, (this.hovered) ? this.hovered : this.mouse);
      predictedEdge.draw(this.ctx, { width: 2, color: color, dash: [4, 4] });
      this.selected.draw(this.ctx, { radius: 5, color: color })
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
    console.log("Added node", node);
  }

  addEdge(edge) {
    this.graph.edges.push(edge);
    console.log("Added edge", edge);
  }

  tryAddNode(node) {
    if (this.containsNode(node) == undefined) {
      this.addNode(node);
    }
  }

  tryAddEdge(edge) {
    if (this.containsEdge(edge) == undefined && !edge.end.equals(edge.start)) {
      this.addEdge(edge);
    }
  }

  removeNode(index) {
    const connections = this.getConnections(this.graph.nodes[index])
    for (const edge of connections) {
      this.removeEdge(this.graph.edges.findIndex(e => edge.equals(e)));
    }
    console.log("Removed node", this.graph.nodes[index]);
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
    console.log("Removed edge", this.graph.edges[index]);
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
    console.log("Cleared the graph")
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