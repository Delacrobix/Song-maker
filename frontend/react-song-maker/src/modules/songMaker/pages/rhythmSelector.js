import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import Loading from '../components/feedback/loading';
import ErrorAlert from '../components/feedback/errorAlert';
import RhythmButton from '../components/rhythmButton';
import BreadCrumb from '../components/breadCrumb';
import { setRhythm } from '../../../redux/rhythmSlice';
import { getAllRhythmsQuery } from '../../../utils/queries';
import { useTranslation } from 'react-i18next';

const RhythmSelector = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const containerRef = useRef(null);

  const { t } = useTranslation();

  //States
  const [rhythmResult, setRhythmResult] = useState([]);
  const [buttonList, setButtonList] = useState([]);
  const [tonality, setTonality] = useState('');

  //Redux
  const reduxTonality = useSelector((state) => state.tonality.value);

  //Get requests
  const { loading, error, data } = useQuery(getAllRhythmsQuery);

  useEffect(() => {
    if (reduxTonality) {
      setTonality(reduxTonality);
    } else {
      alert('Please, select your tonality first');

      navigate('/create-song/tone');
    }
  }, [reduxTonality, navigate]);

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
    dispatch(setRhythm(rhythmResult));

    navigate('/results');
  }

  return (
    <section className='rhythm-selector-container'>
      <h2 className='title-page'>{t('SongMaker.rhythmSelector.title')}</h2>
      <BreadCrumb />
      <h5>
        {t('SongMaker.rhythmSelector.tonality')} {tonality}
      </h5>
      <div className='rhythm-btn-component-container'>
        {error && <ErrorAlert />}
        {loading && <Loading />}
        {data &&
          buttonList.map((button) => {
            return button;
          })}
      </div>
      <div className='selected-rhythm-container-invisible' ref={containerRef}>
        <div className='selected-rhythm-container'>
          <ul>
            <li>
              {t('SongMaker.rhythmSelector.resume.tonality')}
              <span>{' ' + tonality}</span>
            </li>
            <li>
              {t('SongMaker.rhythmSelector.resume.rhythm')}
              <span>{' ' + rhythmResult.rhythmName}</span>
            </li>
          </ul>
          <div className='continue-button-container'>
            <span>{t('SongMaker.rhythmSelector.resume.msg-btn')}</span>
            <button className='button' onClick={resultNavigation}>
              <span>{t('SongMaker.rhythmSelector.resume.btn')}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RhythmSelector;
