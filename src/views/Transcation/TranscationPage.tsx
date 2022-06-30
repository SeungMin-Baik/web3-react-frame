import React from 'react'
// import FetchLoading from '../../components/FetchLoading'

import './Transcation.scss'

const TranscationPage: React.FC = () => {
    // const { loading, Transcation } = useTranscation({})
    
    // const loadingView = (
    //     <div className='loading-wrapper'>
    //         <FetchLoading/>
    //     </div>
    // )
    
    return (
        <div className='transcation'>
            <div className='transcation-wrapper'>
                Transcation
            </div>
            
            {/* {loading ? loadingView : <></>} */}
        </div>
    )
}

export default TranscationPage