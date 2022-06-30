import React from 'react'
import { assets } from '../../assets'
import './EmptyList.scss'


interface EmptyListProps {
    msg: string
}

const EmptyList: React.FC<EmptyListProps> = ({ msg }) => {
    return (
        <div className='empty-list'>
            <img src={assets.empty} alt='empty-icon'/>
            <span className='message'>{msg}</span>
        </div>
    )
}

export default EmptyList