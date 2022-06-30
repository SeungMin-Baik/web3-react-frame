import { Contract } from '@ethersproject/contracts'
import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers'
import { ChainId } from '../connections/connectors'
import ERC20Abi from './abis/ERC20.json'

export class Contracts {
  readonly library: Web3Provider
  readonly eth: JsonRpcProvider | undefined
  readonly bsc: JsonRpcProvider | undefined

  constructor(
    library: Web3Provider,
    eth: JsonRpcProvider | undefined,
    bsc: JsonRpcProvider | undefined,
  ) {
    this.library = library
    this.eth = null
    this.bsc = bsc
  }

  getBEP20Contract(address: string): Contract {
    return new Contract(address, ERC20Abi, this.library.getSigner())
  }

  getBEP20ReadOnlyContract(address: string, chainId: number): Contract {
    return new Contract(
      address,
      ERC20Abi,
      chainId === ChainId.ETH ? this.eth : this.bsc,
    )
  }
}
