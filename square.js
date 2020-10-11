import {
  CONTEXT,
  SQUARE_SIDE_LENGTH,
} from './constants.js';

import Point from './point.js';

export default class Square {
  constructor(point, fillStyle) {
    this.point = point;
    this.recalculateAllPoints();
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
    return this.southernmostPoints;
  }

  getNorthernmostPoints() {
    return this.northernmostPoints;
  }

  getWesternmostPoints() {
    return this.westernmostPoints;
  }

  getEasternmostPoints() {
    return this.easternmostPoints;
  }

  equals(otherSquare) {
    return this.sideLength === otherSquare.sideLength && this.point.equals(otherSquare.point);
  }

  moveDown() {
    this.clear();
    this.point.y += SQUARE_SIDE_LENGTH;
    this.moveAllPointsDown();
    this.draw();
  }

  moveAllPointsDown() {
    this.northernmostPoints.forEach(point => point.y += SQUARE_SIDE_LENGTH);
    this.easternmostPoints.forEach(point => point.y += SQUARE_SIDE_LENGTH);
    this.southernmostPoints.forEach(point => point.y += SQUARE_SIDE_LENGTH);
    this.westernmostPoints.forEach(point => point.y += SQUARE_SIDE_LENGTH);
  }

  clearAndMoveDown() {
    this.clear();
    this.point.y += SQUARE_SIDE_LENGTH;
    this.moveAllPointsDown();
  }

  moveLeft() {
    this.clear();
    this.point.x += -SQUARE_SIDE_LENGTH;
    this.moveAllPointsLeft();
    this.draw();
  }

  moveAllPointsLeft() {
    this.northernmostPoints.forEach(point => point.x += -SQUARE_SIDE_LENGTH);
    this.easternmostPoints.forEach(point => point.x += -SQUARE_SIDE_LENGTH);
    this.southernmostPoints.forEach(point => point.x += -SQUARE_SIDE_LENGTH);
    this.westernmostPoints.forEach(point => point.x += -SQUARE_SIDE_LENGTH);
  }

  moveRight() {
    this.clear();
    this.point.x += SQUARE_SIDE_LENGTH;
    this.moveAllPointsRight();
    this.draw();
  }

  moveAllPointsRight() {
    this.northernmostPoints.forEach(point => point.x += SQUARE_SIDE_LENGTH);
    this.easternmostPoints.forEach(point => point.x += SQUARE_SIDE_LENGTH);
    this.southernmostPoints.forEach(point => point.x += SQUARE_SIDE_LENGTH);
    this.westernmostPoints.forEach(point => point.x += SQUARE_SIDE_LENGTH);
  }

  recalculateAllPoints() {
    this.northernmostPoints = [new Point(this.point.x, this.point.y),
    new Point(this.point.x + SQUARE_SIDE_LENGTH, this.point.y)];
    this.easternmostPoints = [new Point(this.point.x + SQUARE_SIDE_LENGTH, this.point.y),
    new Point(this.point.x + SQUARE_SIDE_LENGTH, this.point.y + SQUARE_SIDE_LENGTH)];
    this.southernmostPoints = [new Point(this.point.x, this.point.y + SQUARE_SIDE_LENGTH),
    new Point(this.point.x + SQUARE_SIDE_LENGTH, this.point.y + SQUARE_SIDE_LENGTH)];
    this.westernmostPoints = [new Point(this.point.x, this.point.y),
    new Point(this.point.x, this.point.y + SQUARE_SIDE_LENGTH)];
  }
}
