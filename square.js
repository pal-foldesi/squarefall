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
    CONTEXT.beginPath();
    CONTEXT.fillStyle = this.fillStyle;
    CONTEXT.fillRect(this.point.x, this.point.y, this.sideLength, this.sideLength);
  }

  drawPoint() {
    CONTEXT.beginPath();
    CONTEXT.strokeStyle = 'red';
    CONTEXT.arc(this.point.x, this.point.y, 10, 0, 2 * Math.PI);
    CONTEXT.stroke();
  }

  drawCoordinates() {
    CONTEXT.fillStyle = 'black'
    CONTEXT.fillText(this.point.x + ' | ' + this.point.y, this.point.x, this.point.y);
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

  clearAndMoveDown() {
    this.clear();
    this.point.y += SQUARE_SIDE_LENGTH;
  }

  moveLeft() {
    this.clear();
    this.point.x += -SQUARE_SIDE_LENGTH;
    this.draw();
  }

  moveRight() {
    this.clear();
    this.point.x += SQUARE_SIDE_LENGTH;
    this.draw();
  }
}
