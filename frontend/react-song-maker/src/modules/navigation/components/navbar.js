import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import AuthDropdown from './authDropdown';

const Navbar = () => {
  const navRef = useRef();

  const handleNavbar = () => {
    navRef.current.classList.toggle('responsive-nav');
  };

  return (
    <header className='navbar'>
      <h3>Logo</h3>
      <nav ref={navRef}>
        {/* <Link to='/home'>Home</Link> */}
        <Link to='/create-song/tone'>Create your song</Link>
        <Link to='/community'>Community Songs</Link>
        {/* <button className='nav-btn nav-close-btn' onClick={showNavbar}>
          <FaTimes />
        </button> */}
      </nav>
      {/* <select>
        <option value='es'>Español</option>
        <option value='en'>English</option>
      </select> */}
      <button className='nav-btn' onClick={handleNavbar}>
        <FaBars />
      </button>
      <AuthDropdown />
    </header>
  );
};

export default Navbar;
