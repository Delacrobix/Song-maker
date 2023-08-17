import React, { useState } from 'react';
import PayPalButton from '../../navigation/components/payPalButton';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [showDonations, setShowDonations] = useState(false);

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
        <p>
          ¡Crea progresiones armónicas con la ayuda de inteligencia artificial!
        </p>
      </div>
      <div className='content'>
        <h3>{t('SongMaker.homePage.content.title')}</h3>
        <p>
          Nuestra aplicación utiliza un avanzado algoritmo de inteligencia
          artificial para generar progresiones armónicas únicas y emocionantes.
        </p>
        <p>
          Simplemente presiona el botón a continuación para generar una nueva
          progresión armónica.
        </p>
        <button onClick={handleRedirect} className='cta-button'>
          {t('SongMaker.homePage.content.btn')}
        </button>
      </div>
      <div className='content'>
        <h2>{t('SongMaker.homePage.content.title-2')}</h2>
        <p>This money will be used for pay the billing payment.</p>
        <button onClick={handleShowDonation}>PayPal</button>
        {showDonations && <PayPalButton />}
      </div>
      <div className='content'>
        <h2>{t('SongMaker.homePage.content.title-3')}</h2>
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
