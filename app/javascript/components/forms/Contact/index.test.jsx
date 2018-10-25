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
  describe('when validating', () => {
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
})
