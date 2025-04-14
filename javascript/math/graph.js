class Graph {
	constructor(points, segments) {
		this.points = points;
		this.segments = segments;
	}

	draw(ctx) {
		this.points.forEach(point => point.draw(ctx));
		this.segments.forEach(segment => segment.draw(ctx));
	}

	containsPoint(point) {
		return this.points.some(p => p.equals(point));
	}

	containsSegment(segment) {
		return this.segments.some(s => s.equals(segment));
	}

	tryAddPoint(point) {
		if (!this.containsPoint(point)) {
			this.addPoint(point);
		}
	}

	addPoint(point) {
		this.points.push(point);
	}

	tryAddSegment(segment) {
		if (!this.containsSegment(segment)) {
			this.addSegment(segment);
		}
	}

	addSegment(segment) {
		this.segments.push(segment);
	}

	removeSegment(segment) {
		const index = this.segments.indexOf(segment);
		if (index === -1) { return; }
		this.segments.splice(index, 1);
	}

	removePoint(point) {
		const index = this.points.indexOf(point);
		if (index === -1) { return; }
		this.points.splice(index, 1);
		this.segments = this.segments.filter(segment => !segment.contains(point));
	}
}