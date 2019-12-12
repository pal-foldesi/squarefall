import {
  CONTEXT,
  SQUARE_SIDE_LENGTH,
} from './constants.js';

import Point from './point.js';

export default class Square {
  constructor(point, fillStyle) {
    this.point = point;
    this.fillStyle = fillStyle;
    this.sideLength = SQUARE_SIDE_LENGTH;
  }

  draw() {
    CONTEXT.fillStyle = this.fillStyle;
    // console.log(CONTEXT.fillStyle);
    CONTEXT.fillRect(this.point.x, this.point.y, this.sideLength, this.sideLength);
  }

  drawPoint() {
    CONTEXT.strokeStyle = 'orange';

    CONTEXT.beginPath();
    CONTEXT.arc(this.point.x, this.point.y, 40, 0, 2 * Math.PI);
    CONTEXT.stroke();
  }

  clear() {
    CONTEXT.clearRect(this.point.x, this.point.y, this.sideLength, this.sideLength);
  }

  getSouthernmostPoints() {
    return [new Point(this.point.x, this.point.y + SQUARE_SIDE_LENGTH),
      new Point(this.point.x + SQUARE_SIDE_LENGTH, this.point.y + SQUARE_SIDE_LENGTH)];
  }

  getNorthernmostPoints() {
    return [new Point(this.point.x, this.point.y),
      new Point(this.point.x + SQUARE_SIDE_LENGTH, this.point.y)];
  }

  getWesternmostPoints() {
    return [new Point(this.point.x, this.point.y),
      new Point(this.point.x, this.point.y + SQUARE_SIDE_LENGTH)];
  }

  getEasternmostPoints() {
    return [new Point(this.point.x + SQUARE_SIDE_LENGTH, this.point.y),
      new Point(this.point.x + SQUARE_SIDE_LENGTH, this.point.y + SQUARE_SIDE_LENGTH)];
  }

  equals(otherSquare) {
    return this.sideLength === otherSquare.sideLength && this.point.equals(otherSquare.point);
  }

  moveDown() {
    this.clear();
    this.point.y += SQUARE_SIDE_LENGTH;
    this.draw();
  }
}
