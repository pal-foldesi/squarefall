import Score from './score.js'

describe('Score', () => {
  test('can be instantiated', () => {
    jest.spyOn(document, 'getElementById').mockReturnValue({})
    expect(new Score()).toBeDefined()
  })
})
