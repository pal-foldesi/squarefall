import { Shape } from './shape.js'
import Point from '../point/point.js'

describe('Shape', () => {
  test('can be instantiated', () => {
    expect(new Shape()).toBeDefined()
  })

  describe('hasOccupiedPoint()', () => {
    const pointOfTranslation = new Point(1, 2)
    const otherPoints = [new Point(1, 3)]

    const shape = new Shape()
    shape.init(undefined, pointOfTranslation, otherPoints)

    const cases = [
      [shape, 1, 4, false],
      [shape, 2, 3, false],
      [shape, 1, 2, true],
      [shape, 1, 3, true]
    ]
    test.each(cases)('%o.hasOccupiedPoint(%i, %i)', (shape, x, y, expected) => {
      expect(shape.hasOccupiedPoint(x, y)).toBe(expected)
    })
  })
})
