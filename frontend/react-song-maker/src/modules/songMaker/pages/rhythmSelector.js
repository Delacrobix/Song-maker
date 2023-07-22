import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAllRhythmsQuery } from '../controllers/queries';
import { useQuery } from '@apollo/client';
import Loading from '../components/feedback/loading';
import ErrorAlert from '../components/feedback/errorAlert';
import RhythmButton from '../components/rhythmButton';
import BreadCrumb from '../components/breadCrumb';

const RhythmSelector = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [rhythmResult, setRhythmResult] = useState([]);
  const [buttonList, setButtonList] = useState([]);
  const location = useLocation();
  const tonality = location.state.tonality;

  //Get requests
  const { loading, error, data } = useQuery(getAllRhythmsQuery);

  useEffect(() => {
    const buttonsAux = [];

    if (data) {
      data.getAllRhythms.forEach((rhythm) => {
        buttonsAux.push(
          <RhythmButton
            key={rhythm.rhythmName}
            rhythm={rhythm}
            setRhythmObject={getRhythmObject}
            rhythmName={rhythm.rhythmName}
          />
        );
      });

      setButtonList(buttonsAux);
    }
  }, [data, loading, error]);

  function getRhythmObject(rhythmObject) {
    const container = containerRef.current;
    setRhythmResult(rhythmObject);

    container.classList.add('selected-rhythm-container-visible');
  }

  function resultNavigation() {
    navigate('/results', {
      state: { tonality: tonality, rhythm: rhythmResult },
    });
  }

  return (
    <section className='rhythm-selector-container'>
      <h2 className='title-page'>SELECT RHYTHM</h2>
      <BreadCrumb />
      <h5>Your actually tonality: {tonality}</h5>
      <div className='rhythm-btn-component-container'>
        {error && <ErrorAlert />}
        {loading && <Loading />}
        {data &&
          buttonList.map((button) => {
            return button;
          })}
      </div>
      <div className=' selected-rhythm-container-invisible ' ref={containerRef}>
        <div className='selected-rhythm-container'>
          <ul>
            <li>
              Tonalidad:
              <span>{' ' + tonality}</span>
            </li>
            <li>
              Rhythm:
              <span>{' ' + rhythmResult.rhythmName}</span>
            </li>
          </ul>
          <div className='continue-button-container'>
            <span>Press the button if you want to continue</span>
            <button className='button' onClick={resultNavigation}>
              Continue
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RhythmSelector;
