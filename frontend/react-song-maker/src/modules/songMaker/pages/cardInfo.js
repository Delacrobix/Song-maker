import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import usePlaySounds from '../../../hooks/usePlaySounds';

const CardInfo = () => {
  const location = useLocation();

  const { song } = location.state;
  const { songName, _id, rhythmType, owner, chords, date } = song;

  //States
  const [printableDate, setPrintableDate] = useState('');
  const [chordsToPrint, setChordsToPrint] = useState('');

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

  return (
    <div>
      <h1 className='title-page'>SONG INFORMATION</h1>
      <div className='o-card o-card--mod-small'>
        <div className='c-card'>
          <legend className='u-visually-hidden'>
            Information Card with text and images.
          </legend>
          {/* <img
            className='c-card_image'
            src='http://placeimg.com/640/480/any/sepia'
            alt='Card'
          /> */}
          <div className='c-card_body'>
            <h2 className='c-card_title'>{songName}</h2>
            <h5 className='c-card_secondary-title'>{`By ${owner}`}</h5>
            <hr />
            <p className='c-card_text'>
              <strong>ID: </strong>
              {_id}
            </p>
            <p className='c-card_text'>
              <strong>RHYTHM: </strong>
              {rhythmType.rhythmName}
            </p>
            <p className='c-card_text'>
              <strong>CHORDS: </strong>
              {chordsToPrint}
            </p>
            <p className='c-card_text'>
              <strong>DATE: </strong>
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
            onClick={() => playRhythm(rhythmType)}
          >
            Play song
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardInfo;
