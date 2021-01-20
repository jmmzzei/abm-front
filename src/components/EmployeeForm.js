import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import {
  EmployeeSchema,
  SearchSchema,
  EditSchema,
} from '../helpers/validationSchemas'
import { employeesService } from '../service/employess.service'
import { companiesService } from '../service/companies.service'
import { useLocation } from 'react-router-dom'
import { translator } from '../helpers/translator'
import { getDate } from '../helpers/getDate'

export const EmployeeForm = ({ onResult, onUpdate }) => {
  const [company, setCompany] = useState([])
  const [editValues, setEditValues] = useState({})
  const [formType, setFormType] = useState({})
  const [id, setId] = useState(1)
  const location = useLocation()
  const [role, setRole] = useState({})

  const isNotEmpty = values => {
    let bool = false
    for (var prop in values) if (values[prop] != '') bool = true
    return bool
  }

  const submitHandle = (values, { setSubmitting, resetForm }) => {
    const submit = {
      search: values => {
        onResult(values)
        setSubmitting(false)
        resetForm()
      },
      create: values => {
        employeesService.post(values).then(res => {
          onUpdate(true)
        })
        setSubmitting(false)
      },
      edit: (values, id) => {
        employeesService.patch(id, values).then(res => {
          onUpdate(true)
        })
        setSubmitting(false)
      },
    }

    if (isNotEmpty(values)) submit[formType](values, id)
    else {
      onResult(undefined)
      setSubmitting(false)
    }
  }

  useEffect(() => {
    let mounted = true
    companiesService.getById(1).then(res => {
      if (mounted) setCompany(res.data)
    })

    let type = location.pathname.split('/')[1]
    let employeeId = location.pathname.split('/')[3]
    let urlRole = location.pathname.split('/')[2]

    setRole(urlRole)
    setId(employeeId)
    setFormType(type)

    if (type == 'edit') {
      employeesService.get(urlRole, employeeId).then(res => {
        if (mounted) setEditValues(res.data)
      })
    }

    return function cleanup() {
      mounted = false
    }
  }, [location.pathname])

  return (
    <Formik
      initialValues={
        formType == 'edit'
          ? {
              first_name: editValues.first_name,
              last_name: editValues.last_name,
              birthdate: editValues.birthdate,
              languageId: editValues.languageId,
              typeId: editValues.typeId,
              role: role,
              companyId: 1,
            }
          : {
              first_name: '',
              last_name: '',
              birthdate: '',
              languageId: '',
              typeId: '',
              role: '',
              companyId: 1,
            }
      }
      enableReinitialize={true}
      validationSchema={
        formType == 'search'
          ? SearchSchema
          : formType == 'edit'
          ? EditSchema
          : EmployeeSchema
      }
      onSubmit={submitHandle}>
      {({
        isSubmitting,
        handleChange,
        handleSubmit,
        setSubmitting,
        values,
      }) => (
        <Form className="employee-form">
          <label htmlFor="first_name">Nombre:</label>
          <div>
            <Field name="first_name" id="first_name" placeholder="Juan" />
            <ErrorMessage name="first_name" className="error" component="div" />
          </div>
          <label htmlFor="last_name">Apellido:</label>
          <div>
            <Field name="last_name" id="last_name" placeholder="Fernandez" />
            <ErrorMessage name="last_name" className="error" component="div" />
          </div>
          <label htmlFor="birthdate">Fecha de nacimiento:</label>
          <div>
            <Field
              id="birthdate"
              name="birthdate"
              type="date"
              value={getDate(values.birthdate, formType)}
            />
            <ErrorMessage name="birthdate" className="error" component="div" />
          </div>
          <>
            <label htmlFor="role">Profesión:</label>
            <select
              name="role"
              id="role"
              value={values.role}
              onChange={handleChange}
              disabled={formType == 'edit' ? true : false}
              style={{ display: 'block' }}>
              <option value="" label="" />
              <option value="programmer" label="programador" />
              <option value="designer" label="diseñador" />
            </select>
            <ErrorMessage name="role" className="error" component="div" />

            {values.role == 'programmer' && (
              <>
                <label htmlFor="languageId">Lenguaje:</label>
                <select
                  name="languageId"
                  id="languageId"
                  value={values.languageId}
                  onChange={handleChange}
                  style={{ display: 'block' }}>
                  <option value="" label="" />
                  <option value="1" label="php" />
                  <option value="2" label="net" />
                  <option value="3" label="python" />
                </select>
                <ErrorMessage
                  name="languageId"
                  className="error"
                  component="div"
                />
              </>
            )}
            {values.role == 'designer' && (
              <>
                <label htmlFor="typeId">Rol:</label>
                <select
                  name="typeId"
                  id="typeId"
                  value={values.typeId}
                  onChange={handleChange}
                  style={{ display: 'block' }}>
                  <option value="" label="" />
                  <option value="1" label="web" />
                  <option value="2" label="gráfico" />
                </select>
                <ErrorMessage name="typeId" className="error" component="div" />
              </>
            )}
          </>
          <button
            type="submit"
            onClick={handleSubmit}
            className={`${formType}-hover-color`}>
            {translator[formType]}
          </button>
        </Form>
      )}
    </Formik>
  )
}
