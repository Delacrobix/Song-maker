import React, { useEffect, useRef, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAIChordsQuery, insertSongMutation } from '../../../utils/queries';
import Loading from '../components/feedback/loading';
import ErrorAlert from '../components/feedback/errorAlert';
import BreadCrumb from '../components/breadCrumb';
// import Score from '../components/scores/score';
// import Tab from '../components/scores/tab';
import useUser from '../../../hooks/useUser';
import usePlaySounds from '../../../hooks/usePlaySounds';
import useSubmitSong from '../../../hooks/useSubmitSong';
import FeedbackCompo from '../../../components/successComponent';
import { useTranslation } from 'react-i18next';

const Results = () => {
  const navigate = useNavigate();

  //Refs
  const inputNameRef = useRef(null);
  const inputSongRef = useRef(null);

  //Redux variables
  const reduxRhythm = useSelector((state) => state.rhythm.value);
  const reduxTonality = useSelector((state) => state.tonality.value);

  //States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [chordsReceived, setChordsReceived] = useState('');
  const [formData, setFormData] = useState({
    userName: '',
    songName: '',
  });
  const [feedback, setFeedback] = useState({
    message: '',
    isSuccessful: false,
    isError: false,
  });

  const { t } = useTranslation();

  //Requests
  const query = useQuery(getAIChordsQuery(reduxTonality));
  const [insertMutation, mutation] = useMutation(insertSongMutation);

  //Customs hooks
  const song = useSubmitSong({
    userName: formData.userName,
    songName: formData.songName,
    chordsReceived: chordsReceived,
  });
  const playRhythm = usePlaySounds();
  const user = useUser();

  useEffect(() => {
    if (!reduxTonality) {
      alert('Please, select a tonality first');

      navigate('/create-song/tone');
    } else if (!reduxRhythm) {
      alert('Please, select a rhythm first');

      navigate('/rhythm-selector');
    }
  }, [navigate, reduxRhythm, reduxTonality]);

  //Setting userName if the user is logged in
  useEffect(() => {
    if (user.userName) {
      inputNameRef.current.disabled = true;

      setFormData((prevFormData) => ({
        ...prevFormData,
        userName: user.userName,
      }));
    }
  }, [user]);

  //Setting chordsReceived if the query is successful
  useEffect(() => {
    if (query.data) {
      setChordsReceived(query.data.getAIChords);
    }
  }, [query.data, song]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  function handleElement(condition) {
    const inputName = inputNameRef.current;
    const inputSong = inputSongRef.current;

    inputName.disabled = condition;
    inputSong.disabled = condition;
  }

  function submitUserSong(event) {
    event.preventDefault();

    //Blocking html elements
    handleElement(true);
    setIsSubmitting(true);

    insertMutation({ variables: song })
      .then(() => {
        setIsSubmitting(false);

        setFeedback({
          message: 'Your song was successfully shared',
          isError: false,
          isSuccessful: true,
        });
      })
      .catch((error) => {
        handleElement(false);
        setIsSubmitting(false);

        setFeedback({
          message: 'Error trying to share the song, please, try again',
          isError: true,
          isSuccessful: false,
        });

        console.error(error);
      });

    if (mutation.error) {
      return <ErrorAlert />;
    }
  }

  return (
    <div className='results-page-container'>
      <h2 className='title-page'>{t('SongMaker.results.title')}</h2>
      <BreadCrumb />
      <div className='result-information-container'>
        <div className='song-information-container'>
          {query.loading && <Loading />}
          {query.error && <ErrorAlert />}
          <div className='chords-gen'>
            <h3>{t('SongMaker.results.h3')}</h3>
            <label>{chordsReceived}</label>
          </div>
          <button onClick={() => playRhythm(song.rhythmType)}>
            {t('SongMaker.results.play-btn')}
          </button>
        </div>
        {/* <div className='musical-representation-container'>
          <Score />
          <Tab />
        </div> */}
      </div>
      <div className='share-song-button-container'>
        <form onSubmit={submitUserSong}>
          <p className='p p-1'>{t('SongMaker.results.share.text')}</p>
          {feedback.control && (
            <FeedbackCompo message={feedback.message} color={'red'} />
          )}
          <p className='p'>{t('SongMaker.results.share.msg-btn')}</p>
          <div className='input-container'>
            <input
              type='text'
              ref={inputNameRef}
              onChange={handleChange}
              value={formData.userName}
              name='userName'
              placeholder='Composer'
              minLength='3'
              maxLength='25'
              required
            />
            <input
              type='text'
              ref={inputSongRef}
              onChange={handleChange}
              value={formData.songName}
              name='songName'
              placeholder='Song name'
              minLength='3'
              maxLength='30'
              required
            />
          </div>
          {isSubmitting ? (
            <Loading />
          ) : feedback.isSuccessful ? (
            <FeedbackCompo color={'green'} message={feedback.message} />
          ) : (
            <button type='submit' disabled={feedback.isSuccessful}>
              {t('SongMaker.results.share.btn')}
            </button>
          )}{' '}
          {feedback.isError && (
            <FeedbackCompo color={'red'} message={feedback.message} />
          )}
        </form>
      </div>
    </div>
  );
};

export default Results;
