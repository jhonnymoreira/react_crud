import required from '.'

describe('Validations: Required', () => {
  it('returns "undefined" for non empty values', () => {
    expect(required('AgroSmart')).toBeUndefined()
  })

  it('returns a message for empty values', () => {
    const message = 'Required'

    expect(required()).toEqual(message)
    expect(required('         ')).toEqual(message)
  })
})
