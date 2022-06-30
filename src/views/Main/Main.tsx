import React, { useEffect } from 'react'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

import './Main.scss'

const Main: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="main">
      <div className="main-wrapper">main</div>
    </div>
  )
}

export default Main
