import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useLocation } from 'react-router-dom';
import usePlaySounds from '../../../hooks/usePlaySounds';
import { useTranslation } from 'react-i18next';
import usePrintableDate from '../../../hooks/usePrintableDate';
import { getSongByIdQuery } from '../../../utils/queries';

const CardInfo = () => {
  const { t } = useTranslation();

  const location = useLocation();

  const locationPath = location.pathname;
  const parts = locationPath.split('/');
  const pathId = parts[parts.length - 1];

  const { data, error, loading } = useQuery(getSongByIdQuery(pathId));

  //States
  const [chordsToPrint, setChordsToPrint] = useState('');
  const [song, setSong] = useState({
    _id: '',
    chords: '',
    date: '',
    rhythmType: {
      rhythmName: '',
    },
    owner: '',
    songName: '',
  });

  //Custom Hooks
  const playRhythm = usePlaySounds();

  useEffect(() => {
    if (data) {
      setSong(data.findSong);
    }
  }, [data, error, loading]);

  useEffect(() => {
    if (song) {
      const chordsArray = song.chords.split('|');

      setChordsToPrint(chordsArray.join('-'));
    }
  }, [song]);

  async function handlerPlay() {
    await playRhythm(song.rhythmType);
  }

  return (
    <div>
      <h1 className='title-page'>{t('SongMaker.community.card.title')}</h1>
      <div className='o-card o-card--mod-small'>
        <div className='c-card'>
          <div className='c-card_body'>
            <h2 className='c-card_title'>{song.songName}</h2>
            <h5 className='c-card_secondary-title'>{`By ${song.owner}`}</h5>
            <hr />
            <p className='c-card_text'>
              <strong>{t('SongMaker.community.card.elem1')}</strong>
              {song._id}
            </p>
            <p className='c-card_text'>
              <strong>{t('SongMaker.community.card.elem2')}</strong>
              {song.rhythmType.rhythmName}
            </p>
            <p className='c-card_text'>
              <strong>{t('SongMaker.community.card.elem3')} </strong>
              {chordsToPrint}
            </p>
            <p className='c-card_text'>
              <strong>{t('SongMaker.community.card.elem4')}</strong>
              {usePrintableDate(new Date(song.date))}
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
            {t('SongMaker.community.card.btn')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardInfo;
