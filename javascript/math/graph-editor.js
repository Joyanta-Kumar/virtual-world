import { Point } from "../primitive/point.js";
import { getClosestPoint } from "./utils.js";

export class GraphEditor {
  constructor(canvas, graph) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.graph = graph;
    this.addEventListeners();
  }

  display(ctx) {
    this.graph.draw(this.ctx);
  }

  addEventListeners() {
    this.canvas.addEventListener("mousedown", this.handleClick.bind(this));
    this.canvas.addEventListener("mousemove", this.handleMouseMove.bind(this));
  }

  handleClick(evt) {
  }

  handleMouseMove(evt) {

  }

}