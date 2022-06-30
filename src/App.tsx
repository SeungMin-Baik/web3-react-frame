import React, { useCallback, useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'
import { SingletonHooksContainer } from 'react-singleton-hook'
import { Provider } from 'react-redux'

import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'
import { NetworkContextName } from './connections'
import getLibrary from './connections/getLibrary'

import CoreProvider from './contexts/CoreProvider'
import ModalsProvider from './contexts/Modals'

import Web3ReactManager from './components/Web3ReactManager'

import TransactionUpdater from './state/transactions/updater'
import Web3SideProvider from './contexts/Web3SideProvider'
import store from './state'

import Main from './views/Main/Main'

import WalletSideBar from './components/WalletSideBar'
import TopBar from './components/TopBar'
import MobileMenu from './components/MobileNav'
import Footer from './views/Footer'

import Transcation from './views/Transcation/Transcation'

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)

if ('ethereum' in window) {
  ;(window.ethereum as any).autoRefreshOnNetworkChange = false
}

const App: React.FC = () => {
  const [mobileMenu, setMobileMenu] = useState(false)
  const [walletMenu, setWalletMenu] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleToggleMobileMenu = useCallback(
    (visible) => {
      scollFixed(visible)
      setMobileMenu(visible)
    },
    [setMobileMenu],
  )

  const handleToggleWallet = useCallback(
    (visible) => {
      scollFixed(visible)
      setWalletMenu(visible)
    },
    [setWalletMenu],
  )

  const scollFixed = (fix: boolean) => {
    if (fix) {
      document.body.classList.add('fixed')
    } else {
      document.body.classList.remove('fixed')
    }
  }

  return (
    <Providers>
      <Router>
        <ModalsProvider>
          <TopBar
            show={mobileMenu}
            walletMenu={walletMenu}
            onPresentMobileMenu={() => handleToggleMobileMenu(!mobileMenu)}
            onPresentWallet={() => handleToggleWallet(!walletMenu)}
          />
          <MobileMenu
            visible={mobileMenu}
            walletOpen={walletMenu}
            onPresentWallet={() => handleToggleWallet(!walletMenu)}
            onDismiss={() => {
              handleToggleWallet(false)
              handleToggleMobileMenu(false)
            }}
          />
          <WalletSideBar
            visible={walletMenu}
            onDismiss={() => handleToggleWallet(false)}
          />

          <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/web3" component={Main} />
            <Route path="/transcation" component={Transcation} />

            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>

          <Footer />
        </ModalsProvider>
      </Router>

      <SingletonHooksContainer />

      <div className="app-background" />
    </Providers>
  )
}

const Web3Providers: React.FC = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        <Web3SideProvider>
          <Web3ReactManager>{children}</Web3ReactManager>
        </Web3SideProvider>
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  )
}

const Providers: React.FC = ({ children }) => {
  return (
    <Provider store={store}>
      <Web3Providers>
        <CoreProvider>
          <TransactionUpdater />
          {children}
        </CoreProvider>
      </Web3Providers>
    </Provider>
  )
}

export default App
