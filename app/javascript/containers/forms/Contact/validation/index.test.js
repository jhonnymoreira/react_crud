import validation from '.'

describe('Contact Form validation', () => {
  it('validates the presence of first name and last name fields', () => {
    const requiredMessage = 'Required'

    expect(validation({})).toEqual({
      contact: {
        firstName: requiredMessage,
        lastName: requiredMessage,
      },
    })
  })
})
