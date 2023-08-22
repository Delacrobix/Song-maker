import React, { useState } from 'react';
import PayPalButton from '../../navigation/components/payPalButton';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  //States
  const [showDonations, setShowDonations] = useState(false);
  const [donationAmount, setDonationAmount] = useState('2.00');

  function changeDonationAmount(e) {
    setDonationAmount(e.target.value);
  }

  function handleShowDonation() {
    setShowDonations(!showDonations);
  }

  function handleRedirect() {
    navigate('/tone-selector');
  }

  return (
    <section className='home-page'>
      <h2 className='title-page'>{t('SongMaker.homePage.title')}</h2>
      <div className='header'>
        <h3>{t('SongMaker.homePage.header-title')}</h3>
        <p>¡Create your harmonic progressions with AI!</p>
      </div>
      <div className='content'>
        <h3>{t('SongMaker.homePage.content.title')}</h3>
        <p>You can use this app like a tool in your music life.</p>
        <p>Press the bottom for start to create your harmonic progressions.</p>
        <button onClick={handleRedirect} className='button'>
          {t('SongMaker.homePage.content.btn')}
        </button>
      </div>
      <div className='content'>
        <h3>{t('SongMaker.homePage.content.title-2')}</h3>
        <p>This money will be used to pay the billing payment.</p>
        <div className='donation-input'>
          <p>How much in USD?</p>
          <input
            type='number'
            step='0.5'
            value={donationAmount}
            onChange={changeDonationAmount}
          />
        </div>
        <button className='button' onClick={handleShowDonation}>
          Select mount
        </button>
        {showDonations && <PayPalButton donationAmount={donationAmount} />}
      </div>
      <div className='content'>
        <h3>{t('SongMaker.homePage.content.title-3')}</h3>
        <p>See our Changelogs here: </p>
        <Link
          to='https://github.com/Delacrobix/Song-maker/blob/0db670d4e6324cbf622d4d11f8989f9b287f629f/changelog/changelog.md'
          target='_blank'
          className='changelogs-link'
        >
          CHANGELOG
        </Link>
      </div>
    </section>
  );
};

export default HomePage;
