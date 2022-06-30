import React from 'react'
import useActiveWeb3React from '../../hooks/connections/useActiveWeb3React'
import { ChevronDown } from 'react-feather'
import Button from '../Button'
import useModal from '../../hooks/useModal'
import WalletProviderModal from '../WalletProviderModal'

import './AccountButton.scss'

const AccountButton: React.FC = () => {
    
    const { account, deactivate } = useActiveWeb3React()
    
    const [onPresentWalletModal] = useModal(<WalletProviderModal/>)
    
    const signout = () => {
        deactivate()
    }
    
    const getProfileInfo = () => {
        return (
            <div className="account-button">
                <span className="account">{account.substr(account.length - 4, 4)}</span>
                <ChevronDown color={'#4180DB'} size={16} className="symbol"/>
            </div>
        )
    }
    
    const connected = () => {
        return (
            <div className="account-button-wrapper">
                {getProfileInfo()}
                
                <div className="account-page-list">

                    <div className="list-item logout" onClick={signout}>
                        <span className="">Logout</span>
                    </div>
                </div>
            </div>
        )
    }
    
    return (
        <div className="account-button-container">
            {account ? connected() : (
                <div className="connect-button">
                    <Button text="Connect Wallet" type="white" onClick={onPresentWalletModal}/>
                </div>
            )}
        </div>
    )
}

export default AccountButton