// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import get from 'lodash.get'
import arrayMutators from 'final-form-arrays'
import { Form, Field } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '../components/inputs/TextField'
import required from '../helpers/validations/required'
import serverErrorParser from '../helpers/parsers/serverError'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
  await sleep(300)

  const serverError = {
    errors: {
      contact: {
        firstName: 'Nope. Not today.'
      },
      'telephones[1].number': 'Invalid number',
    },
  }

  return {
    ...(serverErrorParser(serverError).errors)
  }
}

const validate = values => {
  const errors = {
    contact: {},
  }

  const contactFields = ['firstName', 'lastName']

  contactFields.forEach(field => {
    const value = get(values, `contact.${field}`)

    errors.contact[field] = required(value)
  })

  return errors
}

const App = () => (
  <Form
    mutators={{ ...arrayMutators }}
    onSubmit={onSubmit}
    validate={validate}
    render={({
      handleSubmit,
      pristine,
      reset,
      submitError,
      submitFailed,
      submitSucceeded,
      submitting,
      values,
    }) => (
      <form onSubmit={handleSubmit}>
        <section style={{ marginBottom: 48 }}>
          <header>
            <Typography variant="h5">Contact</Typography>
          </header>
          <main>
            <div>
              <Field
                name="contact.firstName"
                component={TextField}
                label="First Name"
                required
              />
            </div>
            <div>
              <Field
                name="contact.lastName"
                component={TextField}
                label="Last Name"
                required
              />
            </div>
          </main>
        </section>
        <section style={{ marginBottom: 48 }}>
          <header>
            <Typography variant="h5">Address</Typography>
          </header>
          <main>
            <div>
              <Field
                name="address.street"
                component={TextField}
                type="text"
                label="Street"
              />
            </div>
            <div>
              <Field
                name="address.neighborhood"
                component={TextField}
                type="text"
                label="Neighborhood"
              />
            </div>
            <div>
              <Field
                name="address.city"
                component={TextField}
                type="text"
                label="City"
              />
            </div>
            <div>
              <Field
                name="address.state"
                component={TextField}
                type="text"
                label="State"
              />
            </div>
            <div>
              <Field
                name="address.country"
                component={TextField}
                type="text"
                label="Country"
              />
            </div>
          </main>
        </section>
        <section style={{ marginBottom: 48 }}>
          <header style={{ marginBottom: 36 }}>
            <Typography variant="h5">Telephones</Typography>
          </header>
          <FieldArray name="telephones">
            {({ fields }) => (
              <main>
                {fields.map((telephone, index) => (
                  <section style={{ marginBottom: 24 }} key={telephone}>
                    <header>
                      <Typography variant="h6">
                        Telephone #{index + 1}
                      </Typography>
                    </header>
                    <main style={{ marginBottom: 18 }}>
                      <div>
                        <Field
                          name={`${telephone}.number`}
                          component={TextField}
                          type="number"
                          label="Number"
                        />
                      </div>
                      <div>
                        <Field
                          name={`${telephone}.label`}
                          component={TextField}
                          type="text"
                          label="Label"
                        />
                      </div>
                    </main>
                    <footer>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => fields.remove(index)}
                      >
                        Remove Phone #{index + 1}
                      </Button>
                    </footer>
                  </section>
                ))}
                <div style={{ marginTop: 36 }}>
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={() =>
                      fields.push({ label: undefined, number: undefined })
                    }
                  >
                    Add New Phone
                  </Button>
                </div>
              </main>
            )}
          </FieldArray>
        </section>
        <section style={{ marginBottom: 72 }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={reset}
            disabled={submitting || pristine}
          >
            Reset
          </Button>
          <Button
            color="primary"
            variant="outlined"
            type="submit"
            disabled={submitting || pristine}
          >
            Submit
          </Button>
        </section>
        <section>
          <header>
            <Typography variant="h6">Form Values</Typography>
          </header>
          <main>
            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </main>
        </section>
      </form>
    )}
  />
)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div')),
  )
})
