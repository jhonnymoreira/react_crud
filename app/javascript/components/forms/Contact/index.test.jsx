import ContactForm from '.'

const noop = () => {}

const triggerSubmit = wrapper => {
  wrapper.find('form').simulate('submit')
}

const getFieldElementsByName = (wrapper, name) =>
  wrapper.find(`Field[name="${name}"]`)

const getMatchingErrorElements = (wrapper, errors = {}) =>
  wrapper.find({ error: true, ...errors })

describe('ContactForm component', () => {
  describe('when validation fails', () => {
    it('renders the validation message and triggers error on each invalid field', () => {
      const validationErrors = {
        contact: {
          firstName: 'Invalid first name!',
          lastName: 'Invalid last name!',
        },
      }

      const wrapper = mount(
        <ContactForm onSubmit={noop} validate={() => validationErrors} />
      )

      triggerSubmit(wrapper)

      const firstNameElement = getFieldElementsByName(
        wrapper,
        'contact.firstName'
      )
      const lastNameElement = getFieldElementsByName(
        wrapper,
        'contact.lastName'
      )

      expect(
        getMatchingErrorElements(firstNameElement, {
          helperText: validationErrors.contact.firstName,
        })
      ).toHaveLength(1)

      expect(
        getMatchingErrorElements(lastNameElement, {
          helperText: validationErrors.contact.lastName,
        })
      ).toHaveLength(1)
    })
  })

  describe('when submit fails', () => {
    it('renders the error message and triggers error on invalid field', () => {
      const submitErrors = {
        contact: {
          firstName: 'Name not available.',
        },
      }

      const wrapper = mount(
        <ContactForm onSubmit={() => submitErrors} validate={noop} />
      )

      triggerSubmit(wrapper)

      const firstNameElement = getFieldElementsByName(
        wrapper,
        'contact.firstName'
      )

      expect(
        getMatchingErrorElements(firstNameElement, {
          helperText: submitErrors.contact.firstName,
        })
      ).toHaveLength(1)
    })
  })
})
