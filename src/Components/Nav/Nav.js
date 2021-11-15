import React from 'react'
import logo from './../../assets/logo.png'
import './Nav.css'

const Nav = () => {
  return (
    <div className='nav-container'>
      <div className='nav-left'>
        <img className='flash-logo' src={logo} alt='logo' />
        <p className='flash-logo-text'>Sonic Speed</p>
      </div>
      <div className='nav-right'>
        <a
          target='_blank'
          className='nav-github-link'
          href='https://github.com/Ridhi-priya'
          rel='noreferrer'
        >
          <i className='fab fa-github fa-3x'></i>
        </a>
      </div>
    </div>
  )
}

export default Nav
