export default class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  transform(ROTATE_BY, oldX, oldY) {
    this.translate(-oldX, -oldY);
    this.rotate(ROTATE_BY);
    this.translate(oldX, oldY);
  }

  translate(offsetX, offsetY) {
    this.x = this.x + offsetX;
    this.y = this.y + offsetY;
  }

  rotate(radians) {
    const oldX = this.x;
    const oldY = this.y;
    this.x = oldX * Math.cos(radians) - oldY * Math.sin(radians);
    this.y = oldX * Math.sin(radians) + oldY * Math.cos(radians);
  }

  equals(otherPoint) {
    return otherPoint !== undefined && this.x === otherPoint.x && this.y === otherPoint.y;
  }
}
