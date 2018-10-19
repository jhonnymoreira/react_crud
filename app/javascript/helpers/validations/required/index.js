const required = value => {
  const requiredMessage = 'Required'

  return value && value.trim() ? undefined : requiredMessage
}

export default required
