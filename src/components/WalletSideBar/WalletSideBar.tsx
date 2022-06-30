import React, { useCallback, useState } from 'react'
import { ChevronRight } from 'react-feather'
import useActiveWeb3React from '../../hooks/connections/useActiveWeb3React'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { UnsupportedChainIdError } from '@web3-react/core'
import { BSC_GUIDE, setupBSCNetwork } from '../../core/utils'
import { SUPPORTED_WALLETS, WalletInfo } from '../../connections'
import WalletProviderCard from '../WalletProviderModal/components/WalletProviderCard'
import { assetWallets } from '../../assets/wallets'
import './WalletSideBar.scss'
import TextLink from '../TextLink'
import { useHistory } from 'react-router-dom'


interface WalletSideBarProps {
    visible: boolean
    onDismiss: () => void
}

const WalletSideBar: React.FC<WalletSideBarProps> = ({ visible, onDismiss }) => {
    
    const [, setShowPopup] = useState(false)
    
    const { account, activate, deactivate } = useActiveWeb3React()
    const history = useHistory()
    
    const signout = useCallback(() => {
        setShowPopup(false)
        deactivate()
    }, [setShowPopup, deactivate])
    
    const tryActivation = async (connector: AbstractConnector | undefined) => {
        // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
        connector.deactivate()
        
        if (connector instanceof WalletConnectConnector && connector.walletConnectProvider?.wc?.uri) {
            connector.walletConnectProvider = null
        }
        
        connector && activate(connector, undefined, true)
            .then(() => {
                setShowPopup(false)
                onDismiss()
            })
            .catch(async (error) => {
                if (error instanceof UnsupportedChainIdError) {
                    if (await setupBSCNetwork()) {
                        await activate(connector)
                        setShowPopup(false)
                        onDismiss()
                    } else {
                        alert('Unsupported Network')
                    }
                }
            })
    }
    
    const onClickItem = (to: string) => {
        history.push(to)
        setShowPopup(false)
        onDismiss()
    }
    
    const walletList = () => {
        if (account) return null
        
        return (
            <div className='wallets'>
                <span className='title'>Connect Wallet</span>
                <span className='desc'>Please connect your wallet with <TextLink href={BSC_GUIDE}>Binance Smart Chain</TextLink></span>
                
                {Object.keys(SUPPORTED_WALLETS).map(key => {
                    const wallet: WalletInfo = SUPPORTED_WALLETS[key]
                    return <WalletProviderCard key={key} icon={assetWallets[key]} title={wallet.name}
                                               onConnect={() => tryActivation(wallet.connector)}/>
                })}
            </div>
        )
    }
    
    const balance = () => {
        if (!account) return null
        
        return (
            <>
                <div className='wrapper' onClick={() => onClickItem('/account')}>
                    <span>My Collection</span>
                    <ChevronRight className='symbol' size={24}/>
                </div>
                <div className='wrapper' onClick={() => onClickItem('/account/setting')}>
                    <span>Settings</span>
                    <ChevronRight className='symbol' size={24}/>
                </div>
    
                <div className='wrapper logout' onClick={signout}>
                    <span>Logout</span>
                </div>
            </>
        )
    }
    
    const body = () => {
        return account ? balance() : walletList()
    }
    
    return (
        <>
            <div className={`wallet-side-bar-bg ${visible ? 'active' : 'inactive'}`} onClick={onDismiss}/>
            <div className={`wallet-side-bar ${visible ? 'active' : 'inactive'}`}>
                {visible && (
                    <div className='body'>
                        {body()}
                    </div>
                )}
            </div>
        </>
    
    )
}

export default WalletSideBar