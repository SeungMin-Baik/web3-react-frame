import React from 'react'
import { ArrowLeft, Menu } from 'react-feather'
import Nav from '../Nav'
import Logo from '../Logo'
import useWindowResize from '../../hooks/window/useWindowResize'
import { useHistory, useLocation } from 'react-router-dom'
import AccountButton from '../AccountButton/AccountButton'
import './TopBar.scss'

interface TopBarProps {
  show: boolean
  walletMenu: boolean
  onPresentMobileMenu: () => void
  onPresentWallet: () => void
}

const TopBar: React.FC<TopBarProps> = ({ onPresentMobileMenu }) => {
  const location = useLocation()
  const history = useHistory()

  const { width } = useWindowResize()

  const renderLogo = () => {
    if (width > 768) return <Logo />

    let title
    if (location.pathname.includes('/web3')) {
      title = 'web3'
    } else if (location.pathname.includes('/transcation')) {
      title = 'Transcation'
    } else if (location.pathname.includes('/docs')) {
      title = 'Docs'
    } else {
      return <Logo />
    }

    return (
      <div className="path-wrapper" onClick={() => history.goBack()}>
        <ArrowLeft className="symbol" size={24} />
        <span>{title}</span>
      </div>
    )
  }

  return (
    <div className="top-bar-wrapper">
      <div className="top-bar">
        <div className="logo-wrapper" onClick={() => history.replace('/')}>
          {renderLogo()}
        </div>

        <div className="top-nav">
          <Nav />
          <AccountButton />
        </div>

        <div className="menu-wrapper">
          <Menu size={24} onClick={onPresentMobileMenu} />
        </div>
      </div>
    </div>
  )
}

export default TopBar
