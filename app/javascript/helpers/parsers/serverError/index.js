import forIn from 'lodash.forin'
import set from 'lodash.set'

const serverErrorParser = serverError => {
  const { errors, ...rest } = serverError
  let parsedErrors = {}

  forIn(errors, (value, key) => {
    set(parsedErrors, key, value)
  })

  return {
    errors: { ...parsedErrors },
    ...rest,
  }
}

export default serverErrorParser
