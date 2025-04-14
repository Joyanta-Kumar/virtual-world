class Segment {
	constructor(start, end) {
		this.start = start;
		this.end = end;
	}
	draw(ctx, { width = 2, color = "white" } = {}) {
		ctx.strokeStyle = color;
		ctx.lineWidth = width;
		ctx.beginPath();
		ctx.moveTo(this.start.x, this.start.y);
		ctx.lineTo(this.end.x, this.end.y);
		ctx.stroke();
	}

	contains(point) {
		return this.start.equals(point) || this.end.equals(point);
	}

	equals(other) {
		return this.contains(other.start) && this.contains(other.end);
	}
}