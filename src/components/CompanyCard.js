import React, { useEffect, useState } from 'react'
import filtro from '../../src/filter.svg'
import edit from '../../src/edit.svg'
import { employeesService } from '../service/employess.service'
import { EmployeeItem } from './EmployeeItem'
import { Link } from 'react-router-dom'
import { translator } from '../helpers/translator'
import { CompanyForm } from '../components/CompanyForm'
import { CompanyCardLayout } from '../components/Presentationals'

export const CompanyCard = ({ companyId, name, filter, refetch, onResult }) => {
  const [employees, setEmployees] = useState([])
  const [average, setAverage] = useState([])
  const [update, setUpdate] = useState(false)

  const [labels, setLabels] = useState([])
  const [formVisibility, setFormVisibility] = useState(false)
  const toggleForm = () => {
    setFormVisibility(!formVisibility)
  }
  const updateName = el => {
    onResult(el)
  }
  const refresh = el => {
    setUpdate(true)
  }

  const createLabels = filter => {
    let arr = []
    for (let prop in filter)
      if (filter[prop] != '' && prop != 'companyId') arr.push(translator[prop])
    setLabels(arr)
  }

  useEffect(() => {
    let fil = filter && filter.role ? filter.role : 'all'

    employeesService.getAll(fil, filter).then(res => {
      console.log(res)
      setEmployees(res.data.employees)
      setAverage(res.data.average)
      createLabels(filter)
      setUpdate(false)
    })
  }, [filter, update, refetch])

  return (
    <CompanyCardLayout>
      <header>
        <p>{name}</p>
        <Link to="/search">
          <button className="btn-item">
            <img src={filtro} alt="Filtrar" className="icon" />
          </button>
        </Link>
        <button onClick={toggleForm} className="btn-item edit">
          <img src={edit} alt="Editar" className="icon" />
        </button>
      </header>

      <div className="company-form">
        {formVisibility && (
          <CompanyForm id={companyId} name={name} onResult={updateName} />
        )}
      </div>

      <p>Promedio de edad: {average}</p>

      {filter && (
        <div className="filter-container">
          <p>Filtros:</p>
          <div className="label-container">
            {labels.map(el => (
              <h6 key={el} className="label">
                {el.toUpperCase()}
              </h6>
            ))}
          </div>
        </div>
      )}

      <ul>
        <EmployeeItem header />
        {employees &&
          employees.map(el => (
            <EmployeeItem
              key={el.first_name + el.last_name + el.id + el.typeId}
              id={el.id}
              first_name={el.first_name}
              last_name={el.last_name}
              birthdate={el.birthdate}
              languageId={el.languageId}
              typeId={el.typeId}
              refresh={refresh}
            />
          ))}
      </ul>

      <footer>
        <Link to={`/create`}>
          <button>+</button>
        </Link>
      </footer>
    </CompanyCardLayout>
  )
}
