import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs } from '@fortawesome/free-solid-svg-icons';

const AuthDropdown = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {});

  function logout() {}

  return (
    <nav className='nav-auth-dropdown' id='colorNav'>
      <ul>
        <li className='options'>
          <Link>
            <FontAwesomeIcon icon={faCogs} />
          </Link>
          <ul>
            {isLoggedIn ? (
              <>
                <li id='profile' className='profile'>
                  <Link to='/profile'>Profile</Link>
                </li>
                <li id='logout' className='logout'>
                  <Link onClick={logout}>Logout</Link>
                </li>
              </>
            ) : (
              <>
                <li id='login'>
                  <Link to='/login'>Login</Link>
                </li>
                <li id='signup'>
                  <Link to='/signup'>Signup</Link>
                </li>
              </>
            )}
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default AuthDropdown;
