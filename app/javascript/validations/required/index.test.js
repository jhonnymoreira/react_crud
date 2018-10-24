import required from '.'

describe('Required validation', () => {
  describe('given non-empty string', () => {
    it('returns "undefined"', () => {
      expect(required('React Crud')).toBeUndefined()
    })
  })

  describe('given empty string or no argument', () => {
    it('returns a required message', () => {
      const message = 'Required'

      expect(required()).toEqual(message)
      expect(required('        ')).toEqual(message)
    })
  })
})
