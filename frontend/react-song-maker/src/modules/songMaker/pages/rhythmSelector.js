import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAllRhythmsQuery } from '../controllers/queries';
import { useQuery } from '@apollo/client';
import Loading from '../components/feedback/loading';
import ErrorAlert from '../components/feedback/errorAlert';
import RhythmButton from '../components/rhythmButton';
import BreadCrumb from '../components/breadCrumb';

const RhythmSelector = () => {
  const navigate = useNavigate();
  const [rhythmResult, setRhythmResult] = useState([]);
  const [buttonList, setButtonList] = useState([]);

  const location = useLocation();
  let tonality;

  if (location.state.tonality) {
    tonality = location.state.tonality;
  }

  const getRhythmObject = (rhythmObject) => {
    setRhythmResult(rhythmObject);

    const container = document.querySelector(
      '.selected-rhythm-container-invisible'
    );

    container.classList.add('selected-rhythm-container-visible');
  };

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

    if (loading) {
      buttonsAux.push(<Loading />);
    }

    if (error) {
      buttonsAux.push(<ErrorAlert />);
    }
  }, [data, loading, error]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorAlert />;
  }

  function resultNavigation() {
    navigate('/results', {
      state: { tonality: tonality, rhythm: rhythmResult },
    });
  }

  return (
    <div className='rhythm-selector-container'>
      <h1 className='title-page'>RHYTHM SELECTOR</h1>
      <BreadCrumb />
      <div className='rhythm-selector-title'>
        <h1>Select rhythm</h1>
      </div>
      <h5>Your actually tonality: {tonality}</h5>
      <div className='rhythm-btn-component-container'>
        {buttonList.map((button) => {
          return button;
        })}
      </div>
      <div className='selected-rhythm-container-invisible'>
        <h3>
          <ul>
            <li>Tonalidad: {tonality}</li>
            <li>Rhythm: {rhythmResult.rhythmName}</li>
          </ul>
        </h3>
        <span>Please press the button if you want to continue</span>
        <button onClick={resultNavigation}>Continue</button>
      </div>
    </div>
  );
};

export default RhythmSelector;
