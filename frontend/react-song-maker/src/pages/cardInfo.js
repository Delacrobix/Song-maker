import React from 'react';
import { useLocation } from 'react-router-dom';

const CardInfo = () => {
  const location = useLocation();
  const { object } = location.state;
  const { songName, id, owner, rhythm, chords, date } = object;

  // console.log(object);
  return (
    <div>
      <h1 className='title-page'>SONG INFORMATION</h1>
      <div className='o-card o-card--mod-small'>
        <div className='c-card'>
          <legend className='u-visually-hidden'>
            Information Card with text and images.
          </legend>
          <img
            className='c-card_image'
            src='http://placeimg.com/640/480/any/sepia'
            alt='Card'
          />
          <div className='c-card_body'>
            <h2 className='c-card_title'>{songName}</h2>
            <h5 className='c-card_secondary-title'>{`By ${owner}`}</h5>
            <hr />
            <p className='c-card_text'>
              <strong>ID: </strong>
              {id}
            </p>
            <p className='c-card_text'>
              <strong>RHYTHM: </strong>
              {rhythm}
            </p>
            <p className='c-card_text'>
              <strong>CHORDS: </strong>
              {chords}
            </p>
            <p className='c-card_text'>
              <strong>DATE: </strong>
              {date}
            </p>
          </div>
          <button
            className='c-card_expand-button js-card-expand'
            data-expanded='false'
          >
            Play song
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardInfo;
