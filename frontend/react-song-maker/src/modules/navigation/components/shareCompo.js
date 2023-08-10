import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faTwitter,
  faLinkedin,
  faWhatsapp,
  faTelegram,
  faSquarePinterest,
} from '@fortawesome/free-brands-svg-icons';
import { useTranslation } from 'react-i18next';

const ShareCompo = () => {
  const { t } = useTranslation();

  const url = window.location.href;

  const FACEBOOK_URL = process.env.REACT_APP_FACEBOOK;
  const TWITTER_URL = process.env.REACT_APP_TWITTER;
  const LINKEDIN_URL = process.env.REACT_APP_LINKEDIN;
  const WHATSAPP_URL = process.env.REACT_APP_WHATSAPP;
  const PRINTEREST_URL = process.env.REACT_APP_PRINTEREST;
  const TELEGRAM_URL = process.env.REACT_APP_TELEGRAM;

  function handleClick(socialUrl) {
    const shareUrl = `${socialUrl}${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank');
  }

  function linkedinShareUrl() {
    const linkedinShareUrl = `${LINKEDIN_URL}${encodeURIComponent(
      url
    )}&title=${encodeURIComponent(
      `chord generator`
    )}&source=${encodeURIComponent(url)}`;
    window.open(linkedinShareUrl, '_blank');
  }

  return (
    <div className='share-container'>
      <div className='title-container'>
        <Link className='share-text'>
          {t('Navigation.footer.socials.share')}
        </Link>
      </div>
      <Link onClick={() => handleClick(FACEBOOK_URL)} className={'share-link'}>
        <FontAwesomeIcon icon={faFacebook} />
      </Link>
      <Link onClick={() => handleClick(TELEGRAM_URL)} className={'share-link'}>
        <FontAwesomeIcon icon={faTelegram} />
      </Link>
      <Link
        onClick={() => handleClick(PRINTEREST_URL)}
        className={'share-link'}
      >
        <FontAwesomeIcon icon={faSquarePinterest} />
      </Link>
      <Link onClick={() => handleClick(TWITTER_URL)} className={'share-link'}>
        <FontAwesomeIcon icon={faTwitter} />
      </Link>
      <Link onClick={linkedinShareUrl} className={'share-link'}>
        <FontAwesomeIcon icon={faLinkedin} />
      </Link>
      <Link onClick={() => handleClick(WHATSAPP_URL)} className={'share-link'}>
        <FontAwesomeIcon icon={faWhatsapp} />
      </Link>
    </div>
  );
};

export default ShareCompo;
