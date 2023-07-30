import React, { useState, useEffect } from 'react';
import Table from '../components/table/table';
import { useQuery } from '@apollo/client';
// import Sort from '../components/table/sort';
import ErrorAlert from '../components/feedback/errorAlert';
import Loading from '../components/feedback/loading';
import { getAllSongsQuery } from '../../../utils/queries';

const CommunitySongs = () => {
  const [songList, setSongList] = useState([]);
  const { data, error, loading, refetch } = useQuery(getAllSongsQuery);

  useEffect(() => {
    if (data) {
      setSongList(data.getAllSongs);
    }

    if (error) {
      console.error(error);
    }
  }, [data, error, loading]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 4000);

    return () => clearInterval(interval);
  }, [refetch]);

  return (
    <div className='community-songs-container'>
      <h1 className='title-page'>COMMUNITY SONGS</h1>
      <div className='content-container'>
        <div className='feedback'>
          {loading && <Loading />}
          {error && <ErrorAlert />}
        </div>
        {/* <Sort /> */}
        {data && <Table songList={songList} />}
      </div>
    </div>
  );
};

export default CommunitySongs;
