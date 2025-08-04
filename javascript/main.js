import { Node } from "./primitives/node.js"
import { Edge } from "./primitives/edge.js"
import { Graph } from "./math/graph.js"

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const n1 = new Node(100, 100);
const n2 = new Node(300, 100);
const n3 = new Node(400, 300);
const n4 = new Node(200, 500);
const e1 = new Edge(n1, n2);
const e2 = new Edge(n2, n3);
const e3 = new Edge(n3, n4);
const e4 = new Edge(n2, n4)
const graph = new Graph([n1, n2, n3, n4], [e1, e2, e3, e4]);
graph.draw(ctx);


