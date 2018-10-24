import get from 'lodash.get'
import set from 'lodash.set'
import required from '../../../../validations/required'

const validation = values => {
  // eslint-disable-next-line prefer-const
  let errors = {}

  const toValidate = {
    fields: ['contact'],
    contact: ['firstName', 'lastName'],
  }

  toValidate.fields.forEach(fieldName => {
    const properties = get(toValidate, fieldName)

    properties.forEach(propertyName => {
      const path = [fieldName, propertyName]
      const propertyValue = get(values, path)

      set(errors, path, required(propertyValue))
    })
  })

  return errors
}

export default validation
