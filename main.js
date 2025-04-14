const floor = document.getElementById("floor");
const ctx = floor.getContext("2d");

floor.width = floor.clientWidth;
floor.height = floor.clientHeight;

window.addEventListener('resize', resizeCanvas);
resizeCanvas();


function resizeCanvas() {
  floor.width = floor.clientWidth;
  floor.height = floor.clientHeight;
}