import { Node } from "./primitives/node.js";
import { subtract, add, multiply } from "./math/utils.js";

export class Viewport {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");

    this.zoom = 1;
    this.offset = new Node(0, 0);
    this.drag = {
      start: new Node(0, 0),
      end: new Node(0, 0),
      offset: new Node(0, 0),
      active: false
    }


    this.#addEventListeners();
  }

  #addEventListeners() {
    this.canvas.addEventListener("wheel", this.#handleMouseWheel.bind(this));
    this.canvas.addEventListener("mousedown", this.#handleMouseDown.bind(this));
    this.canvas.addEventListener("mousemove", this.#handleMouseMove.bind(this));
    this.canvas.addEventListener("mouseup", this.#handleMouseUp.bind(this));
  }

  #handleMouseDown(event) {
    if (event.button == 1) {
      this.drag.start = this.getMouse(event);
      this.drag.active = true;
    }
  }

  #handleMouseMove(event) {
    if (this.drag.active) {
      this.drag.end = this.getMouse(event);
      this.drag.offset = subtract(this.drag.start, this.drag.end);
      this.offset = add(this.drag.offset, this.offset);
    }
  }
  
  #handleMouseUp(event) {
    if (this.drag.active) {
      this.offset = add(this.drag.offset, this.offset);
      this.drag.active = false;
      this.drag.start = new Node(0, 0);
      this.drag.end = new Node(0, 0);
      this.drag.offset = new Node(0, 0);
    }
  }

  #handleMouseWheel(event) {
    const direction = Math.sign(event.deltaY);
    const steps = 0.2;
    this.zoom = Math.max(1.0, Math.min(5.0, this.zoom + steps * direction));
  }

  getMouse(event) {
    return new Node(event.offsetX * this.zoom, event.offsetY * this.zoom);
  }
}
