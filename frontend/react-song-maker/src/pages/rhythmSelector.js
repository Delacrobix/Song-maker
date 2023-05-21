import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RhythmButton from '../components/rhythmButton';

const RhythmSelector = () => {
  const navigate = useNavigate();
  const [rhythmResult, setRhythmResult] = useState('');

  const location = useLocation();
  const tonality = location.state.tonality;

  const getRhythmObject = (rhythmObject) => {
    setRhythmResult(rhythmObject.rhythm);

    const container = document.querySelector(
      '.selected-rhythm-container-invisible'
    );

    container.classList.add('selected-rhythm-container-visible');
  };

  function resultNavigation() {
    navigate('/results', { state: { tonality: tonality, rhythm: 'Bachata' } });
  }

  return (
    <div className='rhythm-selector-container'>
      <h1 className='title-page'>RHYTHM SELECTOR</h1>
      <div className='rhythm-selector-title'>
        <h1>Select rhythm</h1>
      </div>
      <h5>Your actually tonality: {tonality}</h5>
      <div className='rhythm-btn-component-container'>
        <RhythmButton setRhythmObject={getRhythmObject} rhythm='Bachata' />
        <RhythmButton setRhythmObject={getRhythmObject} rhythm='Balada' />
        <RhythmButton setRhythmObject={getRhythmObject} rhythm='Pop' />
      </div>
      <div className='selected-rhythm-container-invisible'>
        <h3>
          <ul>
            <li>Tonalidad: {tonality}</li>
            <li>Rhythm: {rhythmResult}</li>
          </ul>
        </h3>
        <span>Please press the button if you want to continue</span>
        <button onClick={resultNavigation}>Continue</button>
      </div>
    </div>
  );
};

export default RhythmSelector;
