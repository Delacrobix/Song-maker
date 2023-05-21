import React from 'react';
import { useLocation } from 'react-router-dom';

const Results = () => {
  const location = useLocation();
  const { tonality, rhythm } = location.state;

  console.log('TON: ', tonality, 'RHY: ', rhythm);

  return (
    <div>
      <h1 className='title-page'>RESULTS</h1>
    </div>
  );
};

export default Results;
