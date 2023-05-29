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

const Results = () => {
  const location = useLocation();
  const { tonality, rhythm } = location.state;

  const [chordsReceived, setChordsReceived] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    userName: '',
    songName: '',
  });

  const { data, error, loading } = useQuery(getAIChordsQuery(tonality));
  const [insertSongMutation, mutation] = useMutation(
    insertUserSongMutation(formData)
  );

  useEffect(() => {
    if (error) {
      setIsLoading(false);
    }

    if (data) {
      setChordsReceived(data.getAIChords);
      setIsLoading(false);
    }
  }, [data, error, loading]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  function saveUserSong(event) {
    event.preventDefault();

    insertSongMutation({ variables: { formData } })
      .then((response) => {
        alert(response.data.insert);
      })
      .catch((error) => {
        console.error(error);
        // return <ErrorAlert />;
      });

    if (mutation.error) {
    }

    if (mutation.loading) {
    }

    console.log(formData);
  }

  // console.log(chordsReceived);

  // console.log('TON: ', tonality, 'RHY: ', rhythm);

  return (
    <div className='results-page-container'>
      <h1 className='title-page'>RESULTS</h1>
      <BreadCrumb />
      <div className='result-information-container'>
        <div className='song-information-container'>
          {isLoading && <Loading />}
          {error && <ErrorAlert />}
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
