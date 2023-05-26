import React from 'react';
import { useLocation } from 'react-router-dom';
import BreadCrumb from '../components/breadCrumb';
import Score from '../components/scores/score';

const Results = () => {
  const location = useLocation();
  const { tonality, rhythm } = location.state;

  // console.log('TON: ', tonality, 'RHY: ', rhythm);

  return (
    <div>
      <h1 className='title-page'>RESULTS</h1>
      <BreadCrumb />
      <Score />
    </div>
  );
};

export default Results;
