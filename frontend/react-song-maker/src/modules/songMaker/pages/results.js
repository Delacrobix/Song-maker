import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useLocation } from 'react-router-dom';
import {
  getAIChordsQuery,
  insertUserSongMutation,
} from '../controllers/queries';
import Loading from '../components/feedback/loading';
import ErrorAlert from '../components/feedback/errorAlert';
import BreadCrumb from '../components/breadCrumb';
import Score from '../components/scores/score';
import Tab from '../components/scores/tab';
import { getCurrentDate } from '../controllers/controllers';

const Results = () => {
  const location = useLocation();
  const { tonality, rhythm } = location.state;

  const [chordsReceived, setChordsReceived] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    userName: '',
    songName: '',
  });

  const query = useQuery(getAIChordsQuery(tonality));
  const [insertMutation, mutation] = useMutation(insertUserSongMutation);

  useEffect(() => {
    if (query.error) {
      setIsLoading(false);
    }

    if (query.data) {
      setChordsReceived(query.data.getAIChords);
      setIsLoading(false);
    }
  }, [query.data, query.error, query.loading]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  function saveUserSong(event) {
    event.preventDefault();

    const chordArr = chordsReceived.split('|');
    console.log('chords received: ', chordsReceived);

    // console.log('oldScore: ', rhythm.score);
    let i = 0;
    const newScore = rhythm.score.map((element) => {
      console.log('Element: ', element);

      //Adding generated chords to the score
      if (element.chordName !== 'rst') {
        element.chordName = chordArr[i];
        i++;
      }

      //Deleting __typename property of score
      const { __typename, ...rest } = element;

      return rest;
    });
    // console.log('newScore: ', newScore);

    const song = {
      owner: formData.userName,
      songName: formData.songName,
      rhythmType: {
        rhythmName: rhythm.rhythmName,
        tempo: rhythm.tempo,
        score: newScore,
      },
      date: getCurrentDate(),
    };

    insertMutation({ variables: song })
      .then((response) => {
        console.log(response.data.insertSong);
        alert(response.data.insertSong);
      })
      .catch((error) => {
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
      <h1 className='title-page'>RESULTS</h1>
      <BreadCrumb />
      <div className='result-information-container'>
        <div className='song-information-container'>
          {isLoading && <Loading />}
          {query.error && <ErrorAlert />}
        </div>
        <label>{chordsReceived}</label>
        <button>Play your song</button>
        <div className='musical-representation-container'>
          <Score />
          <Tab />
        </div>
      </div>
      <div className='share-song-button-container'>
        <form onSubmit={saveUserSong}>
          <h5>Would you like to share this with the community?</h5>
          <p>*The following fields are necessary</p>
          <input
            type='text'
            onChange={handleChange}
            name='songName'
            value={formData.songName}
            placeholder='Song name'
            required
          />
          <input
            type='text'
            onChange={handleChange}
            value={formData.userName}
            name='userName'
            placeholder='User name'
            required
          />
          <button type='submit'>Share</button>
        </form>
      </div>
    </div>
  );
};

export default Results;