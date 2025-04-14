const floor = document.getElementById("floor");
const ctx = floor.getContext("2d");

function resizeCanvas() {
  floor.width = window.innerWidth;
  floor.height = window.innerHeight;
  ctx.clearRect(0, 0, floor.width, floor.height); // Clear the canvas
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const p1 = new Point(100, 100);
const p2 = new Point(200, 300);

p1.draw(ctx);
p2.draw(ctx);

window.addEventListener("mousemove", function(event) {
  console.log(event.clientX, event.clientY);
});

function addRandomPoint() {
  const x = Math.random() * floor.width;
  const y = Math.random() * floor.height;
  const point = new Point(x, y);
  point.draw(ctx);
}