import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { employeesService } from '../service/employess.service'
import { translator } from '../helpers/translator'
import { getAge } from '../helpers/getAge'
import del from '../delete.svg'

const Field = ({ label, data }) => (
  <div className="field">
    <span>{translator[label]}: </span>
    <span>{typeof data != 'object' ? data : data.name}</span>
  </div>
)

export const EmployeeCard = () => {
  const location = useLocation()
  const [employee, setEmployee] = useState(undefined)

  const createFieldArray = obj => {
    let arr = []
    for (let prop in obj)
      if (
        prop != 'id' &&
        prop != 'companyId' &&
        prop != 'languageId' &&
        prop != 'typeId' &&
        prop != 'birthdate'
      )
        arr.push({ label: prop, data: obj[prop] })
    arr.push({ label: 'age', data: getAge(obj.birthdate) })
    setEmployee(arr)
  }

  useEffect(() => {
    let id = location.pathname.split('/')[3]
    let role = location.pathname.split('/')[2]
    employeesService
      .get(role, id)
      .then(res => {
        if (res.data != null) createFieldArray(res.data)
        else setEmployee(undefined)
      })
      .catch(err => {
        setEmployee(undefined)
      })
  }, [location.pathname])

  return employee ? (
    <div className="employee-card">
      {employee.map(
        el =>
          el.data && <Field key={el.label} label={el.label} data={el.data} />,
      )}
    </div>
  ) : (
    <div className="eliminated">
      <img src={del} alt="Eliminar" />
      <p>El empleado ha sido eliminado</p>
    </div>
  )
}
