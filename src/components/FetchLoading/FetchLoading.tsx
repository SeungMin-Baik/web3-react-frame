import React from 'react'
import './FetchLoading.scss'
import { assets } from '../../assets'


const FetchLoading: React.FC = () => {
    return (
        <div className='fetch-loading'>
            {/*//     <div className='loading'/>*/}
            <img src={assets.loading} alt='loading'/>
        </div>
    )
}

export default FetchLoading