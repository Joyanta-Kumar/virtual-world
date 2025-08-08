import { Node } from "./primitives/node.js";
import { Edge } from "./primitives/edge.js";
import { Graph } from "./math/graph.js";
import { GraphEditor } from "./math/graphEditor.js";

const n1 = new Node(100, 100);
const n2 = new Node(300, 100);
const n3 = new Node(300, 300);
const n4 = new Node(100, 400);

const e1 = new Edge(n1, n2);
const e2 = new Edge(n2, n3);
const e3 = new Edge(n3, n4);

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const graph = new Graph([n1,n2,n3,n4],[e1,e2,e3]);
const graphEditor = new GraphEditor(graph, canvas);

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


// This function is useful, both now and later.
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  graphEditor.display();
  requestAnimationFrame(animate);
}

animate();
