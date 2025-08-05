import { Node } from "./primitives/node.js";
import { Edge } from "./primitives/edge.js";
import { Graph } from "./math/graph.js";
// import { GraphEditor } from "./math/graphEditor.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const graph = new Graph([],[]);
// const graphEditor = new GraphEditor(graph, canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// Initial testing and building base.
function addRandomNode() {
  graph.tryAddNode(new Node(
    Math.floor(Math.random() * canvas.width),
    Math.floor(Math.random() * canvas.height)
  ));
}

function addRandomEdge() {
  const startIndex = Math.floor(Math.random() * graph.nodes.length);
  const endIndex = Math.floor(Math.random() * graph.nodes.length);
  if (startIndex == endIndex) {
    return;
  }
  graph.tryAddEdge(new Edge(
    graph.nodes[startIndex],
    graph.nodes[endIndex]
  ));
}

function removeRandomNode() {
  const index = Math.floor(Math.random() * graph.nodes.length);
  graph.removeNode(index);
}

function removeRandomEdge() {
  const index = Math.floor(Math.random() * graph.edges.length);
  graph.removeEdge(index);
}


// Making things globally available
window.canvas = canvas;
window.ctx = ctx;
window.addRandomNode = addRandomNode;
window.addRandomEdge = addRandomEdge;
window.removeRandomNode = removeRandomNode;
window.removeRandomEdge = removeRandomEdge;


// This function is useful, both now and later.
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  graph.draw(ctx);
  requestAnimationFrame(animate)
}

requestAnimationFrame(animate);