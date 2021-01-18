import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { companiesService } from '../service/companies.service'
import { CompanySchema } from '../helpers/validationSchemas'

export const CompanyForm = ({ name, id, onResult }) => {
  const submitHandle = (values, { setSubmitting }) => {
    companiesService
      .patch(id, values)
      .then(res => {
        console.log(values)
        onResult(values.name)
        setSubmitting(false)
      })
      .catch(err => {})
  }
  return (
    <Formik
      initialValues={{
        name: name,
      }}
      validationSchema={CompanySchema}
      onSubmit={submitHandle}>
      {({ isSubmitting, handleChange, values }) => (
        <Form>
          <div>
            <Field name="name" placeholder={name} />
            <ErrorMessage name="name" />
          </div>
          <button type="submit" disabled={isSubmitting}>
            Editar
          </button>
        </Form>
      )}
    </Formik>
  )
}
