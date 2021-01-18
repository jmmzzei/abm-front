import React from 'react'
import { Link } from 'react-router-dom'
import home from '../home.svg'

export const HomeButton = ({ resetFilter }) => (
  <Link to="/">
    <button
      onClick={() => {
        resetFilter()
      }}>
      <img src={home} alt="Inicio" />
    </button>
  </Link>
)
