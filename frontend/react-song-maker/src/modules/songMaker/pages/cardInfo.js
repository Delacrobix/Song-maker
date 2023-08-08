import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import usePlaySounds from '../../../hooks/usePlaySounds';
import { useTranslation } from 'react-i18next';

const CardInfo = () => {
  const location = useLocation();

  const { t } = useTranslation();
  const { song } = location.state;
  const { songName, _id, rhythmType, owner, chords, date } = song;

  //States
  const [printableDate, setPrintableDate] = useState('');
  const [chordsToPrint, setChordsToPrint] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  //Custom Hooks
  const playRhythm = usePlaySounds();

  useEffect(() => {
    const parsedDate = new Date(date);

    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const day = String(parsedDate.getDate()).padStart(2, '0');

    setPrintableDate(`${year}/${month}/${day}`);
  }, [date]);

  useEffect(() => {
    const chordsArray = chords.split('|');

    setChordsToPrint(chordsArray.join('-'));
  }, [chords]);

  async function handlerPlay() {
    setIsPlaying(!isPlaying);

    // while (isPlaying) {
    // console.log('is playing: ', isPlaying);
    // await playRhythm(rhythmType);
    await playRhythm(rhythmType);
    // }
  }

  return (
    <div>
      <h1 className='title-page'>{t('SongMaker.community.card.title')}</h1>
      <div className='o-card o-card--mod-small'>
        <div className='c-card'>
          <div className='c-card_body'>
            <h2 className='c-card_title'>{songName}</h2>
            <h5 className='c-card_secondary-title'>{`By ${owner}`}</h5>
            <hr />
            <p className='c-card_text'>
              <strong>{t('SongMaker.community.card.elem1')}</strong>
              {_id}
            </p>
            <p className='c-card_text'>
              <strong>{t('SongMaker.community.card.elem2')}</strong>
              {rhythmType.rhythmName}
            </p>
            <p className='c-card_text'>
              <strong>{t('SongMaker.community.card.elem3')} </strong>
              {chordsToPrint}
            </p>
            <p className='c-card_text'>
              <strong>{t('SongMaker.community.card.elem4')}</strong>
              {printableDate}
            </p>
            {/* <p className='c-card_text'>
              <strong>Watch tabs: </strong>
              <Link to='#'>Watch</Link>
            </p> */}
          </div>
          <button
            className='c-card_expand-button js-card-expand'
            data-expanded='false'
            onClick={handlerPlay}
          >
            {isPlaying ? 'stop' : t('SongMaker.community.card.btn')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardInfo;
