import React, { useEffect, useState } from 'react'
import del from '../delete.svg'
import edit from '../edit.svg'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { employeesService } from '../service/employess.service'
import { getAge } from '../helpers/getAge'
import { translator } from '../helpers/translator'

export const EmployeeItem = ({
  first_name,
  last_name,
  id,
  birthdate,
  typeId,
  languageId,
  refresh,
  header,
}) => {
  const location = useLocation()
  const history = useHistory()
  const [role, setRole] = useState(undefined)

  const deleteEmployee = () => {
    let urlid = location.pathname.split('/')[3]
    let direc = location.pathname.split('/')[1]
    let pro = languageId ? translator['languageId'] : translator['typeId']

    employeesService.delete(pro, id).then(res => {
      refresh(true)
      if (direc == 'detail' && urlid == id)
        history.push(`/detail/${pro}/${id}/deleted`)
      if (direc == 'edit' && urlid == id)
        history.push(`/detail/${pro}/${id}/deleted`)
    })
  }

  useEffect(() => {
    setRole(languageId ? translator['languageId'] : translator['typeId'])
  }, [location.pathname, languageId])

  return !header ? (
    <li className="employee-item">
      <div className="name-item">
        <Link to={`/detail/${role}/${id}`}>{first_name + ' ' + last_name}</Link>
      </div>
      <div className="age-item">{getAge(birthdate)}</div>
      <div className="pro-item">{role && translator[role]}</div>

      <div>
        <Link to={`/edit/${role}/${id}`}>
          <button className="btn-item">
            <img src={edit} alt="Editar" className="icon" />
          </button>
        </Link>
        <button className="btn-item">
          <img
            src={del}
            alt="Eliminar"
            className="icon"
            onClick={deleteEmployee}
          />
        </button>
      </div>
    </li>
  ) : (
    <li className="employee-item-header">
      <div className="name-item">Nombre</div>
      <div className="age-item">Edad</div>
      <div className="pro-item">Profesión</div>
      <div className="space"></div>
      <div className="space"></div>
    </li>
  )
}
