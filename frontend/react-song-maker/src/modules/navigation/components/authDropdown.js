import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../../context/AuthContext';

const AuthDropdown = () => {
  const { isLoggedIn, handleLogout } = useContext(AuthContext);

  useEffect(() => {
    console.log('use: ', isLoggedIn);
  }, [isLoggedIn]);

  return (
    <div className='dropdown'>
      <Link className='dropdown__toggle'>
        <FontAwesomeIcon icon={faCogs} />
      </Link>
      {isLoggedIn ? (
        <div className='dropdown__items'>
          <Link to='/profile'>Profile</Link>
          <Link to='/login' className='logout-link' onClick={handleLogout}>
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
