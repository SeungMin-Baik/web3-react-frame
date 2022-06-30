import { BigNumber } from './utils'
import { ChainId } from '../connections/connectors'

export enum LinkType {
  TWITTER = 'TWITTER',
  DISCORD = 'DISCORD',
  MEDIUM = 'MEDIUM',
  INSTAGRAM = 'INSTAGRAM',
  TELEGRAM = 'TELEGRAM',
}

export enum ERCType {
  ETH = 'ETH',
  ERC20 = 'ERC20',
  ERC721 = 'ERC721',
  ERC1155 = 'ERC1155',
}

export interface Token {
  address: string
  chainId?: ChainId
  symbol?: string
  decimal?: number
  ercType?: ERCType
}

export interface TokenBalance extends Token {
  balance: BigNumber
}
