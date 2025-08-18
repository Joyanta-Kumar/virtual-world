import { Node } from "../primitives/node.js";

function getDistance(start, end) {
  return Math.hypot(start.x - end.x, start.y - end.y);
}

export function getNearestNode(pos, nodes, threshold=Number.MAX_SAFE_INTEGER) {
  let minDistance = Number.MAX_SAFE_INTEGER;
  let nearestNode = null;
  for (const node of nodes) {
    const distance = getDistance(pos, node);
    if (distance < minDistance && distance < threshold) {
      minDistance = distance;
      nearestNode = node;
    }
  }
  return nearestNode;
}

export function subtract(start, end) {
  return new Node(end.x - start.x, end.y - start.y);
}

export function add(start, end) {
  return new Node(end.x + start.x, end.y + start.y);
}

export function multiply(vector, scalar) {
  return new Node(vector.x * scalar, vector.y * scalar);
}
