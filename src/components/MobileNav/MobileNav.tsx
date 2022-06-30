import React, { useEffect, useState } from 'react'
import { ArrowLeft, X } from 'react-feather'
import './MobileNav.scss'
import { NavLink, useLocation } from 'react-router-dom'
import useActiveWeb3React from '../../hooks/connections/useActiveWeb3React'
import Button from '../Button'

interface MobileNav {
  visible: boolean
  walletOpen?: boolean
  onDismiss: () => void
  onPresentWallet: () => void
}

const MobileNav: React.FC<MobileNav> = ({
  visible,
  walletOpen,
  onDismiss,
  onPresentWallet,
}) => {
  const [path, setPath] = useState('')
  const { account } = useActiveWeb3React()
  const location = useLocation()

  useEffect(() => {
    if (path !== location.pathname) {
      setPath(location.pathname)
      if (visible) {
        onDismiss()
      }
    }
  }, [location.pathname, visible, onDismiss, setPath, path])

  const header = () => {
    return (
      <div className="nav-item divide">
        <div className="wrapper">
          {walletOpen && (
            <ArrowLeft className="symbol" size={24} onClick={onPresentWallet} />
          )}
          <span className="title">Menu</span>
        </div>

        <X className="symbol" size={24} onClick={onDismiss} />
      </div>
    )
  }

  if (visible) {
    return (
      <div className="mobile-nav">
        {header()}
        {!account && (
          <div className="nav-item">
            <Button
              text={'Connect Wallet'}
              type="white"
              onClick={onPresentWallet}
            />
          </div>
        )}
        {account && (
          <div className="nav-item divide clickable" onClick={onPresentWallet}>
            ㅁㅁㅁ
          </div>
        )}

        <NavLink
          className="nav-item clickable"
          activeClassName="active"
          to="/"
          onClick={onDismiss}
        >
          nav
        </NavLink>
        <NavLink
          className="nav-item clickable"
          activeClassName="active"
          to="/docs"
          onClick={onDismiss}
        >
          Docs
        </NavLink>
      </div>
    )
  }

  return null
}

export default MobileNav
