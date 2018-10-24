import isNil from 'lodash.isnil'

const required = value => {
  const message = 'Required'

  return !isNil(value) && !!value.trim() ? undefined : message
}

export default required
