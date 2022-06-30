import { AbstractConnector } from '@web3-react/abstract-connector'
import { injected } from './connectors'

export interface WalletInfo {
  connector?: AbstractConnector
  name: string
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  Metamask: {
    connector: injected,
    name: 'Metamask',
  },
}

export const NetworkContextName = 'NETWORK'
