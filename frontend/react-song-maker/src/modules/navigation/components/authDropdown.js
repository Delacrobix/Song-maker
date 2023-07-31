import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs } from '@fortawesome/free-solid-svg-icons';
// import { setIsLogged } from '../../../redux/isLoggedSlice';
import { AuthContext } from '../../../context/authContext';
import Cookies from 'js-cookie';

const AuthDropdown = () => {
  const cookie = Cookies.get('sesionToken');
  const [isLogged, setIsLogged] = useState(cookie ? true : false);
  const { handleLogout } = useContext(AuthContext);

  function logout() {
    //switch auth slice
    handleLogout();

    //switch auth slice
    setIsLogged(false);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const cookieAux = Cookies.get('sesionToken');

      setIsLogged(cookieAux ? true : false);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='dropdown'>
      <Link className='dropdown__toggle'>
        <FontAwesomeIcon icon={faCogs} />
      </Link>
      {isLogged ? (
        <div className='dropdown__items'>
          <Link to='/profile'>Profile</Link>
          <Link to='/login' className='logout-link' onClick={logout}>
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
