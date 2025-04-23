import { test } from "./javascript/test";

const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

test();
animate();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(animate);
}