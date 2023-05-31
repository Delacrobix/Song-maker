import React from 'react';
import { Link } from 'react-router-dom';
import CircleOfFifths from '../components/circleOfFifths';
import BreadCrumb from '../components/breadCrumb';

const ToneSelector = () => {
  return (
    <div className='tone-selector-page-container'>
      <h1 className='title-page'>TONE SELECTOR</h1>
      <BreadCrumb />
      <div className='circle-container'>
        <CircleOfFifths />
      </div>
    </div>
  );
};

export default ToneSelector;
