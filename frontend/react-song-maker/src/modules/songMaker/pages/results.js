import React, { useEffect, useRef, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import {
  getAIChordsQuery,
  insertUserSongMutation,
} from '../controllers/queries';
import Loading from '../components/feedback/loading';
import ErrorAlert from '../components/feedback/errorAlert';
import BreadCrumb from '../components/breadCrumb';
// import Score from '../components/scores/score';
// import Tab from '../components/scores/tab';
// import useUser from '../../../hooks/useUser';
import {
  getCurrentDate,
  buildNewChordArr,
  buildNewScore,
} from '../controllers/controllers';
import { playRhythm } from '../controllers/playback';
import { useSelector } from 'react-redux';

const Results = () => {
  const navigate = useNavigate();
  const inputNameRef = useRef(null);
  const inputSongRef = useRef(null);
  const submitRef = useRef(null);
  const reduxRhythm = useSelector((state) => state.rhythm.value);
  const reduxTonality = useSelector((state) => state.tonality.value);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [chordsReceived, setChordsReceived] = useState('');
  const [rhythmType, setRhythmType] = useState({});
  const [formData, setFormData] = useState({
    userName: '',
    songName: '',
  });

  const query = useQuery(getAIChordsQuery(reduxTonality));
  const [insertMutation, mutation] = useMutation(insertUserSongMutation);
  // const user = useUser();

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
  // useEffect(() => {
  //   if (user.userName) {
  //     inputNameRef.current.disabled = true;

  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       userName: user.userName,
  //     }));
  //   }
  // }, [user]);

  useEffect(() => {
    if (query.data) {
      setChordsReceived(query.data.getAIChords);
    }
  }, [query.data]);

  useEffect(() => {
    if (chordsReceived) {
      buildSong();
    }
  }, [chordsReceived]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  function buildSong() {
    const aiChordsArr = chordsReceived.split('|');
    const rhythmScoreCopy = [...reduxRhythm.score];
    let databaseScore = [];

    rhythmScoreCopy.forEach((element) => {
      databaseScore.push(element.chordName);
    });

    const newChordArr = buildNewChordArr(databaseScore, aiChordsArr);
    const newScore = buildNewScore(rhythmScoreCopy, newChordArr);

    const songObj = {
      owner: formData.userName,
      songName: formData.songName,
      rhythmType: {
        rhythmName: reduxRhythm.rhythmName,
        tempo: reduxRhythm.tempo,
        score: newScore,
      },
      date: getCurrentDate(),
    };

    setRhythmType(songObj.rhythmType);

    return songObj;
  }

  function handleElement(condition) {
    const inputName = inputNameRef.current;
    const inputSong = inputSongRef.current;
    const submit = submitRef.current;

    inputName.disabled = condition;
    inputSong.disabled = condition;
    submit.disabled = condition;
  }

  function submitUserSong(event) {
    event.preventDefault();
    const songObj = buildSong();

    //Blocking html elements
    handleElement(true);
    setIsSubmitting(true);

    insertMutation({ variables: songObj })
      .then(() => {
        setIsSubmitting(false);

        alert('Song shared successfully');
      })
      .catch((error) => {
        handleElement(false);
        setIsSubmitting(false);
        alert('Error trying to share the song, please, try again');
        console.error(error);
      });

    if (mutation.error) {
      return <ErrorAlert />;
    }

    if (mutation.loading) {
      return <Loading />;
    }
  }

  return (
    <div className='results-page-container'>
      <h2 className='title-page'>RESULTS</h2>
      <BreadCrumb />
      <div className='result-information-container'>
        <div className='song-information-container'>
          {query.loading && <Loading />}
          {query.error && <ErrorAlert />}
          <div className='chords-gen'>
            <h3>Chords:</h3>
            <label>{chordsReceived}</label>
          </div>
          <button onClick={() => playRhythm(rhythmType)}>Play your song</button>
        </div>
        {/* <div className='musical-representation-container'>
          <Score />
          <Tab />
        </div> */}
      </div>
      <div className='share-song-button-container'>
        <form onSubmit={submitUserSong}>
          <p className='p p-1'>
            Would you like to share this with the community?
          </p>
          <p className='p'>*The following fields are necessary</p>
          <div className='input-container'>
            <input
              ref={inputNameRef}
              type='text'
              onChange={handleChange}
              value={formData.userName}
              name='userName'
              placeholder='Composer'
              required
            />
            <input
              type='text'
              ref={inputSongRef}
              onChange={handleChange}
              name='songName'
              value={formData.songName}
              placeholder='Song name'
              required
            />
          </div>
          {isSubmitting ? (
            <Loading />
          ) : (
            <button type='submit' ref={submitRef}>
              Share
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Results;
