import Point from './point.js'

describe('Point', () => {
  test('can be instantiated', () => {
    expect(new Point()).toBeDefined()
  })

  describe('equals()', () => {
    const point = new Point(1, 2)
    const cases = [
      [point, undefined, false],
      [point, {}, false],
      [point, new Point(undefined, 2), false],
      [point, new Point(1, undefined), false],
      [point, new Point(undefined, undefined), false],
      [point, new Point(null, 2), false],
      [point, new Point(1, null), false],
      [point, new Point(null, null), false],
      [point, new Point('', 2), false],
      [point, new Point(1, ''), false],
      [point, new Point('', ''), false],
      [point, new Point({}, 2), false],
      [point, new Point(1, {}), false],
      [point, new Point({}, {}), false],
      [point, new Point(3, 2), false],
      [point, new Point(1, 4), false],
      [point, new Point(6, 7), false],
      [point, new Point(1, 2), true]
    ]
    test.each(cases)('%o.equals(%o)', (a, b, expected) => {
      expect(a.equals(b)).toBe(expected)
    })
  })
})
