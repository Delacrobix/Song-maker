import React from 'react';
import usePlaySounds from '../../../hooks/usePlaySounds';

const RhythmButton = (props) => {
  const playRhythm = usePlaySounds();
  const { rhythmName, setRhythmObject, rhythm } = props;

  function selectRhythm() {
    setRhythmObject(rhythm);
  }

  return (
    <div>
      <div className='rhythm-button-container'>
        <div className='rhythm-btn-title'>
          <h6>{rhythmName}:</h6>
        </div>
        <button className='rhythm-btn-left' onClick={() => playRhythm(rhythm)}>
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
