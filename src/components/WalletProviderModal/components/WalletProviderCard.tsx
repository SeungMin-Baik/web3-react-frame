import React from 'react'
import { assetIcons } from '../../../assets/icons'


interface WalletProviderCardProps {
    icon: any
    onConnect: () => void
    title: string
}

const WalletProviderCard: React.FC<WalletProviderCardProps> = ({ icon, onConnect, title }) => (
    <div className='wallet-provider-card clickable no-select' onClick={onConnect}>
        <div className='wallet-logo'>
            <img src={icon} alt={title}/>
        </div>
        <span>{title}</span>
        
        <img src={assetIcons.arrowRight} alt='arrow-right' className='symbol'/>
    </div>
)

export default WalletProviderCard
