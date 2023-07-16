import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../../context/AuthContext';
import Cookies from 'js-cookie';

const AuthDropdown = () => {
  const { isLoggedIn, handleLogout } = useContext(AuthContext);
  // const [sesionToken, setSesionToken] = useState(null);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [shouldUpdate, setShouldUpdate] = useState(false);

  useEffect(() => {
    console.log('isLoggedIn: ', isLoggedIn);
  }, [isLoggedIn]);

  // useEffect(() => {
  //   const token = Cookies.get('sesionToken');

  //   setSesionToken(token);
  // }, [isLoggedIn]);

  // useEffect(() => {
  //   console.log('sesionToken: ', sesionToken);

  // if (sesionToken) {
  //   setIsLoggedIn(true);
  // } else {
  //   setIsLoggedIn(false);
  // }
  // }, [sesionToken, shouldUpdate]);

  // console.log('setIsloggedIn: ', isLoggedIn);

  function deleteSesion() {
    Cookies.remove('sesionToken');

    handleLogout();

    // setShouldUpdate(!shouldUpdate);
    // setIsLoggedIn(false);
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
