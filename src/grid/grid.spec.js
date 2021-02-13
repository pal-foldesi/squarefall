import Grid from './grid.js'
import Point from '../point/point.js'
import { Shape } from '../shape/shape.js'

describe('Grid', () => {
  test('can be instantiated', () => {
    expect(new Grid()).toBeDefined()
  })

  describe('hasOccupiedPoint()', () => {
    const pointOfTranslation = new Point(1, 2)
    const otherPoints = [new Point(1, 3)]

    const shape = new Shape()
    shape.init(undefined, pointOfTranslation, otherPoints)

    const grid = new Grid()
    grid.shapes.push(shape)

    const cases = [
      [grid, 1, 4, false],
      [grid, 2, 3, false],
      [grid, 1, 2, true],
      [grid, 1, 3, true]
    ]
    test.each(cases)('%o.hasOccupiedPoint(%i, %i)', (grid, x, y, expected) => {
      expect(grid.hasOccupiedPoint(x, y)).toBe(expected)
    })
  })
})
