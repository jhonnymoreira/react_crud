import ContactForm from '.'

const noop = () => {}

const triggerSubmit = wrapper => {
  wrapper.find('form').simulate('submit')
}

const getFieldElementsByName = (wrapper, fieldName) =>
  wrapper.findWhere(
    field => field.name() === 'Field' && field.prop('name') === fieldName
  )

const findMatchingErrorElements = (wrapper, errors = {}) =>
  wrapper.find({ error: true, ...errors })

describe('ContactForm', () => {
  describe('when validating', () => {
    it('renders the validation message and triggers error on each specified field', () => {
      const validation = () => ({
        contact: {
          firstName: 'Invalid first name!',
          lastName: 'Invalid last name!',
        },
      })

      const wrapper = mount(
        <ContactForm
          onSubmit={async () => {
            noop()
          }}
          validate={validation}
        />
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
        findMatchingErrorElements(firstNameElement, {
          helperText: 'Invalid first name!',
        })
      ).toHaveLength(1)

      expect(
        findMatchingErrorElements(lastNameElement, {
          helperText: 'Invalid last name!',
        })
      ).toHaveLength(1)
    })
  })
})
