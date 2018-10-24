import React from 'react'
import MUITextField from '@material-ui/core/TextField'

const TextField = ({
  input: { name, onChange, value, ...inputProps },
  meta: { dirtySinceLastSubmit, error, submitError, touched },
  required,
  ...textFieldProps
}) => (
  <MUITextField
    name={name}
    helperText={
      touched
        ? (!dirtySinceLastSubmit && submitError) || error
        : required && '* Required'
    }
    error={((!dirtySinceLastSubmit && submitError) || error) && touched}
    inputProps={inputProps}
    onChange={onChange}
    value={value}
    required={required}
    {...textFieldProps}
  />
)

export default TextField
