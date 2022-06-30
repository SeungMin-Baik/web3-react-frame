import { ERCType, Token } from './types'
import { AddressZero } from '@ethersproject/constants'
import { ChainId } from '../connections/connectors'

export const SupportedInterfaces: Record<string, string> = {
  [ERCType.ERC721]: '0x5b5e139f',
  [ERCType.ERC1155]: '0xd9b67a26',
}

export const WBNB: string = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'

export const ERC20TransferProxyAddresses: Record<number, string> = {
  [ChainId.BSC]: '0x2bEa821593117045755d9225A66d04f97101c901',
}

// export const CloudEndpoint: string = 'https://us-central1-web3.cloudfunctions.net'
export const CloudEndpoint: string = ''

export const supportedTokens: Token[] = [
  { address: AddressZero, chainId: ChainId.BSC, symbol: 'BNB' },
]
