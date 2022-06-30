import React from 'react'
import './TextArea.scss'


interface TextInputProps {
    value: string
    placeholder?: string
    onChange: any
}

const TextArea: React.FC<TextInputProps> = ({ value, placeholder = '', onChange }) => {
    
    return (
        <div className='text-area-wrapper'>
            <textarea
                className='text-input'
                value={value}
                placeholder={placeholder}
                onChange={onChange}/>
        </div>
    )
}

export default TextArea