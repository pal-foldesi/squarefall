import Square from './square.js'
import Point from '../point/point.js'

describe('Square', () => {
  test('can be instantiated', () => {
    expect(new Square()).toBeDefined()
  })

  describe('hasOccupiedPoint()', () => {
    const square = new Square(new Point(1, 2))
    const cases = [
      [square, 2, 3, false],
      [square, 1, 2, true]
    ]
    test.each(cases)('%o.hasOccupiedPoint(%i, %i)', (square, x, y, expected) => {
      expect(square.hasOccupiedPoint(x, y)).toBe(expected)
    })
  })
})
