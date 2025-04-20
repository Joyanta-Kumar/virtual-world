import { Point } from "./javascript/primitive/point.js";
import { Segment } from "./javascript/primitive/segment.js";
import { Graph } from "./javascript/math/graph.js";
import { GraphEditor } from "./javascript/math/graph-editor.js";

// Test functions
function addRandomPoint() { console.log("Added point") }
function addRandomSegment() { console.log("Added segment") }
function removeRandomPoint() { console.log("Removed point") }
function removeRandomSegment() { console.log("Removed segment") }
window.addRandomPoint = addRandomPoint;
window.addRandomSegment = addRandomSegment;
window.removeRandomPoint = removeRandomPoint;
window.removeRandomSegment = removeRandomSegment;


// Test constants
const p1 = new Point(100, 100);
const p2 = new Point(300, 300);
const s1 = new Segment(p1, p2);

const graph = new Graph([p1, p2], [s1]);
const graphEditor = new GraphEditor(canvas, graph);

graphEditor.display();
animate();

// Functions
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  graph.draw(ctx);
  requestAnimationFrame(animate);
}