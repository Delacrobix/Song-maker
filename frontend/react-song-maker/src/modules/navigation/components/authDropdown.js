import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';

const AuthDropdown = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const sesionToken = Cookies.get('sesionToken');

  useEffect(() => {
    if (sesionToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [sesionToken]);

  function deleteSesion() {
    console.log('cookie removed');
    Cookies.remove('sesionToken');
  }

  return (
    <div className='dropdown'>
      <Link className='dropdown__toggle'>
        <FontAwesomeIcon icon={faCogs} />
      </Link>
      {isLoggedIn ? (
        <div className='dropdown__items'>
          <Link to='/profile'>Profile</Link>
          <Link to='/home' className='logout-link' onClick={deleteSesion}>
            Logout
          </Link>
        </div>
      ) : (
        <div className='dropdown__items'>
          <Link to='/login'>Login</Link>
          <Link to='/signup'>Signup</Link>
        </div>
      )}
    </div>
  );
};

export default AuthDropdown;
