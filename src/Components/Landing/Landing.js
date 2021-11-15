import React from 'react'
import './Landing.css'
import fastTyping from './../../assets/fastTyping.gif'
import Typewriter from 'typewriter-effect'
const Landing = () => {
  return (
    <div className='landing-container'>
      <div data-aos='fade-right' className='landing-left'>
        <h1 className='landing-header'>Can you type.....</h1>
        <div className='typewritter-container'>
          <Typewriter
            options={{
              strings: ['Fast?', 'Correct?', 'Quick?', "Let's start....⚡️🏃🏻"],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className='landing-right'>
        <img
          data-aos='fade-left'
          className='flash-image'
          src={fastTyping}
          alt='hero'
        />
      </div>
    </div>
  )
}

export default Landing
