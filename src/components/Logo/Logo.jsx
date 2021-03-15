import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brainLogo from './brain-logo2.png'


const Logo = () => {
  return (
    <div className='logo-container'>
      <Tilt className="Tilt br2 shadow-2 tc" 
            options={{ max: 50 }} 
            style={{ height: 120, width: 120 }} >
        <div className="Tilt-inner pa1">
          <img style={{paddingTop: '25px'}} src={brainLogo} alt="Logo"/>
        </div>
      </Tilt>
    </div>
  )
}

export default Logo;