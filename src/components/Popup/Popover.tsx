import React from 'react'
import './Popover.scss'

interface PopoverProps {
  title: string
}

const Popover: React.FC<PopoverProps> = ({ title, children }) => {
  return (
    <div className="web3-popup">
      <div className="popover-header">{title}</div>

      <div className="popover-body">{children}</div>
    </div>
  )
}

export default Popover
