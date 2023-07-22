import React, { useState, useEffect } from 'react';
import Table from '../components/table/table';
// import Sort from '../components/table/sort';
import ErrorAlert from '../components/feedback/errorAlert';
import Loading from '../components/feedback/loading';
import { useQuery } from '@apollo/client';
import { getAllUserSongsQuery } from '../controllers/queries';

const CommunitySongs = () => {
  const [songList, setSongList] = useState([]);
  const { data, error, loading } = useQuery(getAllUserSongsQuery);

  useEffect(() => {
    if (data) {
      setSongList(data.getAllUserSongs);
    }
  }, [data, error, loading]);

  return (
    <div className='community-songs-container'>
      <h1 className='title-page'>COMMUNITY SONGS</h1>
      <div className='feedback__container'>
        {loading && <Loading />}
        {error && <ErrorAlert />}
      </div>
      {/* <Sort /> */}
      {data && <Table songList={songList} />}
    </div>
  );
};

export default CommunitySongs;
