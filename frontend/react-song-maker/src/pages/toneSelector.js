import React from 'react';
import { Link } from 'react-router-dom';
import CircleOfFifths from '../components/circleOfFifths';

const ToneSelector = () => {
  return (
    <div className='tone-selector-page-container'>
      <h1 className='title-page'>TONE SELECTOR</h1>
      <div className='circle-container'>
        <CircleOfFifths />
      </div>
      <div className='next-btn-container'>
        <Link to={'/rhythm-selector'} className='next-button'>
          Next
        </Link>
      </div>
    </div>
  );
};

export default ToneSelector;
