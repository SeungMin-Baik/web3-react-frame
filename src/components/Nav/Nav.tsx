import React from 'react'
import { NavLink } from 'react-router-dom'

import './Nav.scss'

const Nav: React.FC = () => {
  return (
    <div className="nav-wrapper">
      <NavLink className="nav-item" activeClassName="active" to="/">
        nav
      </NavLink>
      <div
        className="nav-item"
        onClick={() => window.open('https://gitbook.com', '_blank')}
      >
        {' '}
        Docs{' '}
      </div>
    </div>
  )
}

export default Nav
