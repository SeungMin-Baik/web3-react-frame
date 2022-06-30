import React, { useEffect, useState } from 'react'
import './TextLoading.scss'


interface TextLoadingProps {
    prefix: string
}

const TextLoading: React.FC<TextLoadingProps> = ({ prefix }) => {
    
    const [ellipsis, setEllipsis] = useState('')
    
    useEffect(() => {
        const interval = setInterval(() => {
            if (ellipsis.length >= 4) {
                setEllipsis('.')
            } else {
                setEllipsis(ellipsis + '.')
            }
        }, 1000)
        
        return () => clearInterval(interval)
    }, [ellipsis, setEllipsis])
    
    return (
        <div className='text-loading'>
            <span>{prefix}{ellipsis}</span>
        </div>
    )
}

export default TextLoading