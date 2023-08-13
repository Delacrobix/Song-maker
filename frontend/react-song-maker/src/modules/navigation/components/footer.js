import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ShareCompo from './shareCompo';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className='footer'>
      <section className='footer-container'>
        <div className='footer-content-container'>
          <div className='logo-container'>
            <h2 className='website-logo'>{t('Navigation.footer.logo')}</h2>
          </div>
        </div>
        <div className='footer-menus'>
          <div className='footer-content-container'>
            <span className='menu-title'>
              {t('Navigation.footer.menu.title')}
            </span>
            {/* <Link to='/home' className='menu-item-footer'>
              {t('Navigation.footer.menu.element-1')}
            </Link> */}
            <Link to='/tone-selector' className='menu-item-footer'>
              {t('Navigation.footer.menu.element-2')}
            </Link>
            <Link to='/community' className='menu-item-footer'>
              {t('Navigation.footer.menu.element-3')}
            </Link>
          </div>
          <div className='footer-content-container'>
            <span className='menu-title'>
              {t('Navigation.footer.help-us.title')}
            </span>
            {/* <Link to='/#' className='menu-item-footer'>
              {t('Navigation.footer.help-us.donations')}
            </Link> */}
            <Link
              to='https://github.com/Delacrobix/Song-maker'
              target='_blank'
              className='menu-item-footer'
            >
              {t('Navigation.footer.help-us.repo')}
            </Link>
            <Link to='/bug-report' target='_blank' className='menu-item-footer'>
              {t('Navigation.footer.help-us.bugs')}
            </Link>
            <Link
              to='/suggestions'
              target='_blank'
              className='menu-item-footer'
            >
              {t('Navigation.footer.help-us.suggestions')}
            </Link>
          </div>
          {/* <div className='footer-content-container'>
            <span className='menu-title'>Legal</span>
            <Link to='/#' className='menu-item-footer'>
              Terms and conditions
            </Link>
          </div> */}
        </div>
        <div className='footer-content-container'>
          <span className='menu-title'>
            {t('Navigation.footer.socials.follow')}
          </span>
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
          <ShareCompo />
        </div>
      </section>
      <div className='copyright-container'>
        <span className='copyright'>&copy;{t('Navigation.footer.copy')}</span>
      </div>
    </footer>
  );
};

export default Footer;
