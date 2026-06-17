import React from 'react'
import '../styles/hero.css'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
   const navigate = useNavigate()
  return (
   
    <div className='hero'>
    <h1 className='title_white'>Build Your </h1><span><h1 className='title_muted'>Portfolio in Minutes</h1></span>

    <div>
    <button className='button' onClick={() => navigate('/dashboard')}>Get Started</button>
    </div>
      </div>
    
  )
}

export default Hero