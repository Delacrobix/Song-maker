import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='footer'>
      <section className='footer-container'>
        <div className='footer-content-container'>
          <div className='logo-container'>
            <h3 className='website-logo'>Song Maker</h3>
          </div>
        </div>
        <div className='footer-menus'>
          <div className='footer-content-container'>
            <span className='menu-title'>Menu</span>
            <Link to='/home' className='menu-item-footer'>
              Home
            </Link>
            <Link to='/create-song/tone' className='menu-item-footer'>
              Create your own song
            </Link>
            <Link to='/community' className='menu-item-footer'>
              Community song
            </Link>
            <Link to='/about-me' className='menu-item-footer'>
              About me
            </Link>
          </div>
          <div className='footer-content-container'>
            <span className='menu-title'>Help us</span>
            <Link to='/#' className='menu-item-footer'>
              Donations
            </Link>
            <Link
              to='https://github.com/Delacrobix/Song-maker'
              target='_blank'
              className='menu-item-footer'
            >
              Repository
            </Link>
            <Link to='#' target='_blank' className='menu-item-footer'>
              Report a bug
            </Link>
          </div>
          <div className='footer-content-container'>
            <span className='menu-title'>Legal</span>
            <Link to='/#' className='menu-item-footer'>
              Terms and conditions
            </Link>
          </div>
        </div>
        <div className='footer-content-container'>
          <span className='menu-title'>Follow me</span>
          <div className='social-container'>
            <Link
              to='https://www.linkedin.com/in/jeffrey-rerin/'
              target='_blank'
              className='social-link'
            ></Link>
            <Link
              to='https://github.com/Delacrobix'
              target='_blank'
              className='social-link'
            ></Link>
            <Link
              to='https://www.jeffrm.com.co'
              target='_blank'
              className='social-link'
            ></Link>
          </div>
        </div>
      </section>
      <div className='copyright-container'>
        <span className='copyright'>&copy;2023, jeffrm.com.co</span>
      </div>
    </footer>
  );
};

export default Footer;
