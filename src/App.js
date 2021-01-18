import React, { useState, useEffect } from 'react'
import { HomeButton } from './components/HomeButton'
import { CompanyCard } from './components/CompanyCard'
import { Editors } from './components/Editors'
import { Layout, Navbar } from './components/Presentationals'
import { companiesService } from './service/companies.service'
import './styles/main.scss'

export const App = () => {
  const [company, setCompany] = useState(undefined)
  const [filter, setFilter] = useState(undefined)
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    companiesService.getById(1).then(res => {
      setCompany(res.data)
    })
  }, [])

  const applyFilter = el => {
    setFilter(el)
  }

  const updateList = el => {
    setUpdate(!update)
  }

  const updateName = el => {
    setCompany({ ...company, name: el })
  }

  const resetFilter = () => {
    setFilter(undefined)
  }

  return (
    <Layout>
      <Navbar>
        <HomeButton resetFilter={resetFilter} />
      </Navbar>
      {company && (
        <CompanyCard
          filter={filter}
          refetch={update}
          companyId={company.id}
          name={company.name}
          onResult={updateName}
        />
      )}
      <Editors onResult={applyFilter} onUpdate={updateList} />
    </Layout>
  )
}
