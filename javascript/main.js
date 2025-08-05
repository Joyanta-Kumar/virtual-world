import { Node } from "./primitives/node.js"
import { Edge } from "./primitives/edge.js"
import { Graph } from "./math/graph.js"

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const graph = new Graph([],[]);


function addRandomNode() {
  graph.tryAddNode(new Node(
    Math.floor(Math.random() * canvas.width),
    Math.floor(Math.random() * canvas.height)
  ));
  console.log(graph.nodes.length, graph.edges.length);
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
  console.log(graph.nodes.length, graph.edges.length);
}

// Making things globally available
window.canvas = canvas;
window.ctx = ctx;
window.addRandomNode = addRandomNode;
window.addRandomEdge = addRandomEdge;


function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  graph.draw(ctx);
  requestAnimationFrame(animate)
}

requestAnimationFrame(animate);