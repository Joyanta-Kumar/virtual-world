import { Point } from "./primitive/point";
import { ctx } from "../main";

export function test() {
  const p1 = new Point(100, 100);
  p1.draw(ctx);
}