import { Node } from "./primitives/node.js";
import { Edge } from "./primitives/edge.js";
import { Graph } from "./graph.js";
import { GraphEditor } from "./graphEditor.js";
import { Viewport } from "./viewport.js";


const status = document.getElementById("status");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const graph = new Graph([],[]);
const graphEditor = new GraphEditor(graph, canvas);
const viewport = new Viewport(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// Initial testing and building base.
function addRandomNode() {
  graphEditor.tryAddNode(new Node(
    Math.floor(Math.random() * canvas.width),
    Math.floor(Math.random() * canvas.height)
  ));
}

function addRandomEdge() {
  const startIndex = Math.floor(Math.random() * graphEditor.graph.nodes.length);
  const endIndex = Math.floor(Math.random() * graphEditor.graph.nodes.length);
  if (startIndex == endIndex) {
    return;
  }
  graphEditor.tryAddEdge(new Edge(
    graphEditor.graph.nodes[startIndex],
    graphEditor.graph.nodes[endIndex]
  ));
}

function removeRandomNode() {
  const index = Math.floor(Math.random() * graphEditor.graph.nodes.length);
  graphEditor.removeNode(index);
}

function removeRandomEdge() {
  const index = Math.floor(Math.random() * graphEditor.graph.edges.length);
  graphEditor.removeEdge(index);
}


// Making things globally available
window.canvas = canvas;
window.ctx = ctx;
window.addRandomNode = addRandomNode;
window.addRandomEdge = addRandomEdge;
window.removeRandomNode = removeRandomNode;
window.removeRandomEdge = removeRandomEdge;
window.viewport = viewport;


// This function is useful, both now and later.
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.scale(1/viewport.zoom, 1/viewport.zoom);
  graphEditor.display();
  ctx.restore();
  status.textContent = `${graph.nodes.length} ${graph.edges.length}`
  requestAnimationFrame(animate);
}

animate();
