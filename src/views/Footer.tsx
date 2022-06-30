import React from 'react'

const web3_DESC = `This is Footer and this Project is Web3 of blockchain.`

const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="logo-wrapper">
        <span className="name"> web3 </span>
        <span className="desc">{web3_DESC}</span>
      </div>
    </div>
  )
}

export default Footer
