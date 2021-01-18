import React from 'react'

export const Layout = ({ children }) => (
  <main className="layout">{children}</main>
)

export const CompanyCardLayout = ({ children }) => (
  <div className="company-card">{children}</div>
)

export const Navbar = ({ children }) => <nav className="navbar">{children}</nav>
