import React from 'react'
import { TokenBalance } from '../../../core/types'
import { assetTokens } from '../../../assets/tokens'
import { toDisplayBalanceComma } from '../../../core/utils'

interface TokenBalanceProps {
  token: TokenBalance
}

const TokenInfo: React.FC<TokenBalanceProps> = ({ token }) => {
  return (
    <div className="token-info">
      <div className="token-image">
        <img src={assetTokens[token.symbol]} alt="token" />
      </div>

      <div className="token-balance">
        <div className="wrapper">
          <span className="label">{token.symbol}</span>
          <span className="value">{toDisplayBalanceComma(token.balance)}</span>
        </div>
      </div>
    </div>
  )
}

export default TokenInfo
