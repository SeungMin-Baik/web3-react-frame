import React from 'react'
import './Button.scss'

interface ButtonProps {
  text: string
  type?: 'default' | 'white' | 'disabled'
  round?:
    | 'round' /* default 8px */
    | 'rectangle' /*0px*/
    | 'smooth' /*4px*/
    | 'curved' /*16px;*/
  dimmed?: boolean
  onClick: () => void
  isBubble?: boolean
}

const Button: React.FC<ButtonProps> = ({
  text,
  type = 'default',
  dimmed,
  round = 'smooth',
  onClick,
  isBubble,
}) => {
  const clickButton = () => {
    if (type === 'disabled' || dimmed) return
    onClick()
  }

  const classNames = () => {
    return `web3-button ${type} ${dimmed ? 'dimmed' : ''} ${round}`
  }

  return (
    <div
      className={classNames()}
      onClick={
        isBubble
          ? (e) => {
              e.stopPropagation()
              clickButton()
            }
          : () => clickButton()
      }
    >
      <span>{text}</span>
    </div>
  )
}

export default Button
