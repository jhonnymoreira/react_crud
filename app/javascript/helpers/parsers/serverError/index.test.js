import serverErrorParser from '.'

describe('Parsers: serverError', () => {
  it('spreads indexed errors', () => {
    const serverError = {
      message: 'Unprocessable entity',
      errors: {
        'telephones[1].number': 'Invalid number',
      },
    }

    const expected = {
      message: 'Unprocessable entity',
      errors: {
        telephones: [undefined, { number: 'Invalid number' }],
      },
    }

    expect(serverErrorParser(serverError)).toEqual(expected)
  })
})
