import { InjectedConnector } from '@web3-react/injected-connector'
import { NetworkConnector } from './NetworkConnector'
import { BscConnector } from '@binance-chain/bsc-connector'

export const bscRPCs = [
  'https://bsc-dataseed.binance.org',
  'https://bsc-dataseed1.defibit.io',
  'https://bsc-dataseed1.ninicoin.io',
]

window.dev = false

export const lclRPC = 'http://localhost:8545'
export const bscRPC = bscRPCs[Math.floor(Math.random() * bscRPCs.length)]
// export const ethRPC = 'https://main-light.eth.linkpool.io/'

export const NETWORK_CHAIN_ID = 56

export interface ChainInfo {
  chainId: string
  chainName: string
  rpcUrl: string
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  blockExplorerUrl: string
}

export const ChainInfo: Record<number, ChainInfo> = {
  1: {
    chainId: '0x1',
    chainName: 'ETH Mainnet',
    rpcUrl: null,
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorerUrl: 'https://etherscan.io',
  },
  56: {
    chainId: '0x38',
    chainName: 'Binance Smart Chain',
    rpcUrl: bscRPC,
    nativeCurrency: {
      name: 'Binance Coin',
      symbol: 'BSC',
      decimals: 18,
    },
    blockExplorerUrl: 'https://bscscan.com',
  },
  31337: {
    chainId: '0x7a69',
    chainName: 'Local BSC',
    rpcUrl: lclRPC,
    nativeCurrency: {
      name: 'Binance Coin',
      symbol: 'LCL',
      decimals: 18,
    },
    blockExplorerUrl: 'https://bscscan.com',
  },
}

export enum ChainId {
  ETH = 1,
  BSC = 56,
  LCL = 31337,
}

export const networkShortName = (chainId: number) => {
  const info = ChainInfo[chainId]
  return info ? info.nativeCurrency.symbol : 'Unknown'
}

export const network = new NetworkConnector({
  urls: {
    56: bscRPC,
    31337: lclRPC,
  },
  defaultChainId: NETWORK_CHAIN_ID,
})

export const injected = new InjectedConnector({
  supportedChainIds: [1, 56, 31337],
})

export const bscConnector = new BscConnector({ supportedChainIds: [56] })
