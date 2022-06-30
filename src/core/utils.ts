import BigNumber from 'bignumber.js'
import { AddressZero, MaxUint256 } from '@ethersproject/constants'
import { TransactionDetails } from '../state/transactions/reducer'
import { bscRPCs, ChainId, ChainInfo } from '../connections/connectors'
import moment from 'moment/moment'
import { toChecksumAddress } from 'web3-utils'

BigNumber.config({
  EXPONENTIAL_AT: [-100, 100],
  DECIMAL_PLACES: 18,
})

const DUST = new BigNumber(1000)
const ZERO = new BigNumber(0)
const MWEI = new BigNumber(10).pow(6)
const ETHER = new BigNumber(10).pow(18)
const UINT_MAX = new BigNumber(MaxUint256.toString())
const EMPTY_ADDRESS = AddressZero

export { BigNumber, DUST, ZERO, MWEI, ETHER, UINT_MAX, EMPTY_ADDRESS }

export const BSC_GUIDE =
  'https://docs.binance.org/smart-chain/wallet/metamask.html#connect-your-metakmast-with-binance-smart-chain'

export const getEtherscanAddressLink = (address: string) =>
  `https://etherscan.io/address/${address}`
export const getEtherscanTxLink = (hash: string) =>
  `https://etherscan.io/tx/${hash}`

export const snooze = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Display
 * */
export const addComma = (numString: string) => {
  if (!numString) return '0'

  let numParts = numString.split('.')
  numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return numParts.join('.')
}

export const shortenAddress = (address: string) => {
  if (!address) return ''
  return `${address.substring(0, 6)}...${address.substring(
    address.length - 4,
    address.length,
  )}`
}

export const shortenTransaction = (hash: string) => {
  if (!hash) return ''
  return hash.slice(0, 8) + '...' + hash.slice(58, 65)
}

export const shortenStringValue = (value: string): string => {
  const numValue = parseFloat(value)
  if (numValue >= 1_000_000) {
    return (parseInt((numValue / 10_000).toString()) / 100).toString() + 'M'
  } else if (numValue >= 1_000) {
    return (parseInt((numValue / 10).toString()) / 100).toString() + 'K'
  } else return value
}

export const toDisplaySignedBalanceComma = (
  balance: BigNumber | number,
  decimals = 18,
  digits: boolean = true,
): string => {
  const balanceComma = toDisplayBalanceComma(balance, decimals, digits)
  return balanceComma.includes('-')
    ? `- $${balanceComma.slice(1)}`
    : `+ $${balanceComma}`
}

export const toDisplayBalanceComma = (
  balance: BigNumber | number | undefined,
  decimals = 18,
  digits: boolean = true,
): string => {
  if (!balance) return '0.00'

  const balanceBigNumber: BigNumber =
    typeof balance === 'number' ? new BigNumber(balance).times(ETHER) : balance
  const displayBalance = balanceBigNumber.dividedBy(
    new BigNumber(10).pow(decimals),
  )
  if (displayBalance.lt(1)) {
    return digits ? displayBalance.toPrecision(4) : displayBalance.toString()
  } else {
    return addComma(
      digits ? displayBalance.toFixed(2) : displayBalance.toFixed(0),
    )
  }
}

export const toDisplayBalance = (
  balance: BigNumber,
  decimals = 18,
  precision: number = 4,
): string => {
  const displayBalance = balance.dividedBy(new BigNumber(10).pow(decimals))
  if (displayBalance.lt(1)) {
    return displayBalance.toPrecision(precision)
  } else {
    return displayBalance.toFixed(2)
  }
}

export const toFullDisplayBalance = (
  balance: BigNumber,
  decimals = 18,
): string => {
  return balance.dividedBy(new BigNumber(10).pow(decimals)).toFixed()
}

export const toDisplayNumber = (
  balance: BigNumber | undefined,
  decimals = 18,
): number => {
  if (!balance) return 0

  const displayBalance = balance.dividedBy(new BigNumber(10).pow(decimals))
  return displayBalance.toNumber()
}

export const toDisplayPercent = (percent: number): string => {
  return percent ? percent.toFixed(2) : '--.-'
}

export const toDisplayDecimalPoint = (
  balance: BigNumber,
  decimals = 18,
): string => {
  try {
    const displayBalance = balance
      .dividedBy(new BigNumber(10).pow(decimals))
      .toNumber()
    let fixedBalance
    if (displayBalance >= 0.01) {
      fixedBalance = displayBalance.toFixed(2)
    } else if (displayBalance >= 0.001) {
      fixedBalance = displayBalance.toFixed(3)
    } else if (displayBalance >= 0.0001) {
      fixedBalance = displayBalance.toFixed(4)
    } else if (displayBalance >= 0.00001) {
      fixedBalance = displayBalance.toFixed(5)
    } else if (displayBalance >= 0.000001) {
      fixedBalance = displayBalance.toFixed(6)
    } else if (displayBalance >= 0.0000001) {
      fixedBalance = displayBalance.toFixed(7)
    } else {
      fixedBalance = '0'
    }

    return addComma(fixedBalance)
  } catch {
    return '0'
  }
}

export const isMore = (target: string, base: string): boolean => {
  return new BigNumber(target).gt(new BigNumber(base))
}

export const timeValueToTxt = (value: number) => {
  return value < 10 ? `0${value}` : value.toString()
}

export const getHour = () => {
  let hour = moment().toDate().getHours() % 12
  if (hour === 0) {
    hour = 12
  }

  return timeValueToTxt(hour)
}

export const getMin = () => {
  return timeValueToTxt(moment().toDate().getMinutes())
}

export const checkAm = () => {
  return moment().toDate().getHours() < 12
}

export const queryToJson = (query) => {
  return query
    ? (/^[?#]/.test(query) ? query.slice(1) : query)
        .split('&')
        .reduce((params, param) => {
          let [key, value] = param.split('=')
          params[key] = value
            ? decodeURIComponent(value.replace(/\+/g, ' '))
            : ''
          return params
        }, {})
    : {}
}

export const jsonToQuery = (obj: Object) => {
  let str = []
  for (let p in obj) {
    if (obj.hasOwnProperty(p) && obj[p] !== undefined && obj[p] !== '') {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
    }
  }

  return str.join('&')
}

/**
 * Account
 */
export const checkAddress = (a: string, b: string): boolean => {
  if (!a || !b) return false
  return toChecksumAddress(a) === toChecksumAddress(b)
}

export const makeChecksumAddress = (
  address: string,
  chainId: ChainId = ChainId.BSC,
): string => {
  if (!address) return ''
  return toChecksumAddress(address)
}

/**
 * Vaildator
 */
export const checkEmail = (email: string): boolean => {
  if (!email) return true
  const mailPattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return mailPattern.test(email)
}

export const validURL = (str: string): boolean => {
  if (!str) return true

  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  ) // fragment locator
  return !!pattern.test(str)
}

/**
 * network
 * */
export const setupBSCNetwork = async (): Promise<boolean> => {
  try {
    const provider: any = window.ethereum
    if (!provider) return false

    const bscChain = ChainInfo[56]
    await provider.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: bscChain.chainId,
          chainName: bscChain.chainName,
          nativeCurrency: bscChain.nativeCurrency,
          rpcUrls: bscRPCs,
          blockExplorerUrls: [bscChain.blockExplorerUrl],
        },
      ],
    })
    return true
  } catch (ex) {
    console.warn('ex', ex, setupBSCNetwork.name)
    return false
  }
}

/**
 * transactions
 * */
export const isRecentTransaction = (tx: TransactionDetails): boolean => {
  return new Date().getTime() - tx.addedTime < 86_400_000
}

export const sortByNewTransactions = (
  a: TransactionDetails,
  b: TransactionDetails,
) => {
  return b.addedTime - a.addedTime
}
