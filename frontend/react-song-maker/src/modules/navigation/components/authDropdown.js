import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../../context/authContext';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';

const AuthDropdown = () => {
  const cookie = Cookies.get('sesionToken');
  const [isLogged, setIsLogged] = useState(cookie ? true : false);
  const { handleLogout } = useContext(AuthContext);
  const { t } = useTranslation();

  useEffect(() => {
    const interval = setInterval(() => {
      const cookieAux = Cookies.get('sesionToken');

      setIsLogged(cookieAux ? true : false);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  function logout() {
    //switch auth slice
    handleLogout();

    //switch auth slice
    setIsLogged(false);
  }

  return (
    <div className='dropdown'>
      <Link className='dropdown__toggle'>
        <FontAwesomeIcon icon={faCogs} />
      </Link>
      {isLogged ? (
        <div className='dropdown__items'>
          <Link to='/profile'>{t('Navigation.authDropdown.profile')}</Link>
          <Link to='/login' className='logout-link' onClick={logout}>
            {t('Navigation.authDropdown.logout')}
          </Link>
        </div>
      ) : (
        <div className='dropdown__items'>
          <Link to='/login'>{t('Navigation.authDropdown.login')}</Link>
          <Link to='/signup'>{t('Navigation.authDropdown.signup')}</Link>
        </div>
      )}
    </div>
  );
};

export default AuthDropdown;
