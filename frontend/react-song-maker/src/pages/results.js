import React from 'react';
import { useLocation } from 'react-router-dom';
import BreadCrumb from '../components/breadCrumb';
import Tablature from '../components/tabs/tablature';

const Results = () => {
  const location = useLocation();
  const { tonality, rhythm } = location.state;

  // console.log('TON: ', tonality, 'RHY: ', rhythm);

  return (
    <div>
      <h1 className='title-page'>RESULTS</h1>
      <BreadCrumb />
      <Tablature />
    </div>
  );
};

export default Results;
