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

const ShareCompo = () => {
  const url = window.location.href;

  function handleClick(socialUrl) {
    const shareUrl = `${socialUrl}${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank');
  }

  function linkedinShareUrl() {
    const linkedinShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
      url
    )}&title=${encodeURIComponent(
      `chord generator`
    )}&source=${encodeURIComponent(url)}`;
    window.open(linkedinShareUrl, '_blank');
  }

  return (
    <div className='share-container'>
      <div className='title-container'>
        <Link className='share-text'>Share this website</Link>
      </div>
      <Link
        onClick={() =>
          handleClick('https://www.facebook.com/sharer/sharer.php?u=')
        }
        className={'share-link'}
      >
        <FontAwesomeIcon icon={faFacebook} />
      </Link>
      <Link
        onClick={() => handleClick('https://telegram.me/share/url?url=')}
        className={'share-link'}
      >
        <FontAwesomeIcon icon={faTelegram} />
      </Link>
      <Link
        onClick={() =>
          handleClick('https://www.pinterest.com/pin/create/button/?url=')
        }
        className={'share-link'}
      >
        <FontAwesomeIcon icon={faSquarePinterest} />
      </Link>
      <Link
        onClick={() => handleClick('https://twitter.com/intent/tweet?url=')}
        className={'share-link'}
      >
        <FontAwesomeIcon icon={faTwitter} />
      </Link>
      <Link onClick={linkedinShareUrl} className={'share-link'}>
        <FontAwesomeIcon icon={faLinkedin} />
      </Link>
      <Link
        onClick={() => handleClick('https://api.whatsapp.com/send?text=')}
        className={'share-link'}
      >
        <FontAwesomeIcon icon={faWhatsapp} />
      </Link>
    </div>
  );
};

export default ShareCompo;
