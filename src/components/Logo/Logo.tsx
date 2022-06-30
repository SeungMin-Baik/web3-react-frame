import React from 'react'
import './Logo.scss'
import { useHistory } from 'react-router-dom'

const Logo: React.FC = () => {
  const history = useHistory()

  return (
    <div className="app-logo" onClick={() => history.replace('/')}>
      <span className="logo"> web3 </span>
    </div>
  )
}

export default Logo
