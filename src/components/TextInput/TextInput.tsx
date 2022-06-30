import React from 'react'
import './TextInput.scss'
import { assetIcons } from '../../assets/icons'


interface TextInputProps {
    id?: string
    value: string
    placeholder?: string
    onChange: any
    icon?: boolean
    onFocus?: any
    onBlur?: any
    error?: boolean
    onEnter?: any
    disabled?: boolean
    type?: 'text' | 'number' | 'search'
    subtract?: boolean
    init?: () => void
}

const TextInput: React.FC<TextInputProps> = ({ children, id, value, placeholder = '', icon, onChange, onFocus, onBlur, error, onEnter, disabled = false, type = 'text', subtract, init }) => {
    
    const classNames = () => {
        return [
            'text-input-wrapper',
            error ? 'error' : '',
            disabled ? 'disabled' : ''
        ].filter(each => each.length > 0).join(' ')
    }
    
    return (
        <div className={classNames()}>
            {icon && <img src={assetIcons.search} className='icon' alt='search'/>}
            {children}
            <input
                id={id || 'text-input'}
                className='text-input'
                type={type}
                value={value}
                placeholder={placeholder}
                onBlur={onBlur}
                onFocus={onFocus}
                onChange={onChange}
                disabled={disabled}
                onKeyPress={onEnter}/>
            {subtract && <img src={assetIcons.subtract} className='substract' alt='substract' onClick={init}/>}
            
        </div>
    )
}

export default TextInput
