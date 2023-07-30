import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs } from '@fortawesome/free-solid-svg-icons';
// import { setIsLogged } from '../../../redux/isLoggedSlice';
import { AuthContext } from '../../../context/authContext';
import Cookies from 'js-cookie';

const AuthDropdown = () => {
  const cookie = Cookies.get('sesionToken');
  // const reduxIsLoggedIn = useSelector((state) => state.isLogged.value);
  const [isLogged, setIsLogged] = useState(cookie ? true : false);
  const { handleLogout } = useContext(AuthContext);

  function logout() {
    //switch auth slice
    handleLogout();

    //switch auth slice
    setIsLogged(false);
  }

  useEffect(() => {
    console.log('isLogged: ', isLogged);
    if (cookie) {
      console.log('cookie: ');
      setIsLogged(true);
    }

    // setIsLogged(false);
  }, [cookie, isLogged]);

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
