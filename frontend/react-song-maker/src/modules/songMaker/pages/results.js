import React, { useEffect, useRef, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useLocation } from 'react-router-dom';
import {
  getAIChordsQuery,
  insertUserSongMutation,
} from '../controllers/queries';
import Loading from '../components/feedback/loading';
import ErrorAlert from '../components/feedback/errorAlert';
import BreadCrumb from '../components/breadCrumb';
// import Score from '../components/scores/score';
// import Tab from '../components/scores/tab';
import useUser from '../../../hooks/useUser';
import {
  getCurrentDate,
  buildNewChordArr,
  buildNewScore,
} from '../controllers/controllers';
import { playRhythm } from '../controllers/playback';

const Results = () => {
  const inputNameRef = useRef(null);
  const location = useLocation();
  const user = useUser();

  const { tonality, rhythm } = location.state;

  const [chordsReceived, setChordsReceived] = useState('');
  const [song, setSong] = useState({});
  // const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    userName: '',
    songName: '',
  });

  const query = useQuery(getAIChordsQuery(tonality));
  const [insertMutation, mutation] = useMutation(insertUserSongMutation);

  useEffect(() => {
    if (user.userName) {
      inputNameRef.current.disabled = true;

      setFormData((prevFormData) => ({
        ...prevFormData,
        userName: user.userName,
      }));
    }
  }, [user]);

  useEffect(() => {
    // if (query.error) {
    //   setIsLoading(false);
    // }

    if (query.data) {
      setChordsReceived(query.data.getAIChords);

      // setIsLoading(false);
    }
  }, [query.data, query.error]);

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
    const rhythmScoreCopy = [...rhythm.score];

    const databaseScore = rhythmScoreCopy.map((element) => {
      return element.chordName;
    });

    const newChordArr = buildNewChordArr(databaseScore, aiChordsArr);
    const newScore = buildNewScore(rhythmScoreCopy, newChordArr);

    const songObj = {
      owner: formData.userName,
      songName: formData.songName,
      rhythmType: {
        rhythmName: rhythm.rhythmName,
        tempo: rhythm.tempo,
        score: newScore,
      },
      date: getCurrentDate(),
    };

    setSong(songObj);
  }

  function submitUserSong(event) {
    if (!song) {
      buildSong();
    }

    event.preventDefault();

    insertMutation({ variables: song }).catch((error) => {
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
          <button onClick={() => playRhythm(song.rhythmType)}>
            Play your song
          </button>
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
              placeholder='User name'
              required
            />
            <input
              type='text'
              onChange={handleChange}
              name='songName'
              value={formData.songName}
              placeholder='Song name'
              required
            />
          </div>
          <button type='submit'>Share</button>
        </form>
      </div>
    </div>
  );
};

export default Results;
