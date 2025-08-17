import { Node } from "./primitives/node.js";

export class Viewport {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");

    this.zoom = 1;


    this.#addEventListeners();
  }

  #addEventListeners() {
    this.canvas.addEventListener("wheel", this.#handleMouseWheel.bind(this));
  }

  #handleMouseWheel(event) {
    const direction = Math.sign(event.deltaY);
    const steps = 0.2;
    this.zoom = Math.max( 1.0, Math.min(5.0, this.zoom + steps * direction));
    console.log(this.zoom);
  }

  getMouse(event) {
    return new Node(event.offsetX * this.zoom, event.offsetY * this.zoom);
  }
}
