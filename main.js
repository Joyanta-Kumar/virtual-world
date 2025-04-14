const floor = document.getElementById("floor");
const ctx = floor.getContext("2d");

floor.width = floor.clientWidth;
floor.height = floor.clientHeight;

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const p1 = new Point(100, 100);
const p2 = new Point(200, 300);
const p3 = new Point(500, 250);

const s1 = new Segment(p1, p2);
const s2 = new Segment(p2, p3);


const graph = new Graph([p1, p2, p3], [s1, s2]);

animate();

// Functions
function resizeCanvas() {
  floor.width = floor.clientWidth;
  floor.height = floor.clientHeight;
}

function addRandomPoint() {
  const x = Math.random() * floor.width;
  const y = Math.random() * floor.height;
  graph.tryAddPoint(new Point(x, y));
}

function addRandomSegment() {
  const index1 = Math.floor(Math.random() * graph.points.length);
  const index2 = Math.floor(Math.random() * graph.points.length);
  if (index1 === index2) return;
  const segment = new Segment(graph.points[index1], graph.points[index2]);
  graph.tryAddSegment(segment);
}

function removeRandomPoint() {
  if (graph.points.length === 0) return;
  const index = Math.floor(Math.random() * graph.points.length);
  const point = graph.points[index];
  graph.removePoint(point);
}

function removeRandomSegment() {
  if (graph.segments.length === 0) return;
  const index = Math.floor(Math.random() * graph.segments.length);
  const segment = graph.segments[index];
  graph.removeSegment(segment);
}

function animate() {
  ctx.clearRect(0, 0, floor.width, floor.height);
  graph.draw(ctx);
  requestAnimationFrame(animate);
}