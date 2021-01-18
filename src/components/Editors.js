import React, { useEffect, useState } from 'react'
import { EmployeeForm } from './EmployeeForm'
import { EmployeeCard } from './EmployeeCard'
import { Switch, Route, useLocation } from 'react-router-dom'
import { translator } from '../helpers/translator'

export const Editors = ({ onResult, onUpdate }) => {
  const location = useLocation()
  let [mode, setMode] = useState('')

  const filter = el => {
    onResult(el)
  }

  const update = el => {
    onUpdate(true)
  }

  useEffect(() => {
    let route = location.pathname.split('/')[1]
    if (route && route != '') setMode(route)
    else setMode('')
  }, [location.pathname])

  return (
    <div className="editors">
      <header className={mode && `${mode}-bg-color`}>{translator[mode]}</header>
      <Switch>
        <Route path="/detail/:role/:id">
          <EmployeeCard />
        </Route>
        <Route path="/search">
          <EmployeeForm onResult={filter} />
        </Route>
        <Route path={['/create/', '/edit/:role/:id']}>
          <EmployeeForm onUpdate={update} />
        </Route>
      </Switch>
    </div>
  )
}
