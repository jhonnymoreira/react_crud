import get from 'lodash.get'
import set from 'lodash.set'

const validation = values => {
  // eslint-disable-next-line prefer-const
  let errors = {}

  const toValidate = {
    fields: ['contact'],
    contact: {
      properties: ['firstName', 'lastName'],
      firstName: 'Required',
      lastName: 'Required',
    },
  }

  toValidate.fields.forEach(fieldName => {
    const field = get(toValidate, fieldName)

    field.properties.forEach(propertyName => {
      const path = `${fieldName}.${propertyName}`
      const propertyValue = get(values, path)

      if (!propertyValue) {
        set(errors, path, 'Required')
      }
    })
  })

  return errors
}

export default validation
