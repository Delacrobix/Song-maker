import React from 'react';
import { playRhythm } from '../controllers/playbackControllers';
import { getTest } from '../controllers/graphQLControllers';

const RhythmButton = (props) => {
  const { rhythm, setRhythmObject } = props;

  //getTest();

  // !Esto sera reemplazado por una fetch que busque el ritmo en una base de datos por el nombre del ritmo
  const testObject = {
    rhythm: 'Bachata',
    tempo: 150,
    measureMap: [
      { chord: 'C', inversion: 0, duration: 1 },
      { chord: 'C', inversion: 0, duration: 1 },
      { chord: 'C', seventh: '7min', inversion: 0, duration: 2 },
      { chord: 'F', inversion: 0, duration: 1 },
      { chord: 'G', seventh: '7min', inversion: 0, duration: 1 },
      { chord: 'C', inversion: 0, duration: 2 },
    ],
  };

  function selectRhythm() {
    setRhythmObject(testObject);
  }

  return (
    <div>
      <div className='rhythm-button-container'>
        <div className='rhythm-btn-title'>
          <h6>{rhythm}:</h6>
        </div>
        <button
          className='rhythm-btn-left'
          onClick={() => playRhythm(testObject)}
        >
          Listen
        </button>
        <button onClick={selectRhythm} className='rhythm-btn-right'>
          Select
        </button>
      </div>
    </div>
  );
};

export default RhythmButton;
