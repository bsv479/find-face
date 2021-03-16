import React from 'react';
import './Navigation.css';


const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav className='navbar'>
        <p className='log-out f3 link dim black underline pa3 pointer' 
          onClick={() => onRouteChange('signin')} >
          Sign Out
        </p>
      </nav>
    )
  } else {
    return (
      <nav className='navbar'>
        <p className='log-out f3 link dim black underline pa3 pointer'
          onClick={() => onRouteChange('signin')} >
          Sign In
        </p>
        <p className='log-out f3 link dim black underline pa3 pointer'
          onClick={() => onRouteChange('register')} >
          Register
        </p>
      </nav>
    )
  }
}

export default Navigation;