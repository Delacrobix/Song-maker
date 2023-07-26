import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const CardInfo = () => {
  const location = useLocation();
  const { song } = location.state;
  const { songName, _id, owner, rhythm, chords, date } = song;

  const [printableDate, setPrintableDate] = useState('');
  const [chordsToPrint, setChordsToPrint] = useState('');

  useEffect(() => {
    const parsedDate = new Date(date);

    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const day = String(parsedDate.getDate()).padStart(2, '0');

    setPrintableDate(`${year}/${month}/${day}`);
  }, [date]);

  useEffect(() => {
    const chordsArray = chords.split('|');

    let result = chordsArray.filter((__, index) => index % 2 === 0);
    result.pop();
    result = result.join('-');

    setChordsToPrint(result);
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
              {rhythm}
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
          {/* <button
            className='c-card_expand-button js-card-expand'
            data-expanded='false'
          >
            Play song
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default CardInfo;
