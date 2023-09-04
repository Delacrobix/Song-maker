import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import i18n from '../../../config/i18n';
import AuthDropdown from './authDropdown';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const navRef = useRef();
  const { t } = useTranslation();

  function handleNavbar() {
    navRef.current.classList.toggle('responsive-nav');
  }

  function handleChange(event) {
    if (event.target.value === 'es') {
      i18n.changeLanguage('es');
    } else {
      i18n.changeLanguage('en');
    }
  }

  return (
    <header className='navbar'>
      <h1>{t('Navigation.navbar.title')}</h1>
      <nav ref={navRef}>
        <Link to='/'>{t('Navigation.navbar.navLink-3')}</Link>
        <Link to='/tone-selector'>{t('Navigation.navbar.navLink-1')}</Link>
        <Link to='/community'>{t('Navigation.navbar.navLink-2')}</Link>
        {/* <button className='nav-btn nav-close-btn' onClick={showNavbar}>
          <FaTimes />
        </button> */}
      </nav>
      <select onChange={handleChange} className='language-select'>
        <option value='es'>{t('Navigation.navbar.languages.es')}</option>
        <option value='en'>{t('Navigation.navbar.languages.en')}</option>
      </select>
      <button className='nav-btn' onClick={handleNavbar}>
        <FaBars />
      </button>
      <AuthDropdown />
    </header>
  );
};

export default Navbar;
