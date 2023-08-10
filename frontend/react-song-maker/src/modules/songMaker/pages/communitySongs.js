import React, { useState, useEffect } from 'react';
import Table from '../components/table/table';
import { useQuery } from '@apollo/client';
// import Sort from '../components/table/sort';
import ErrorAlert from '../components/feedback/errorAlert';
import Loading from '../components/feedback/loading';
import { getAllSongsQuery } from '../../../utils/queries';
import { useTranslation } from 'react-i18next';

const CommunitySongs = () => {
  const [songList, setSongList] = useState([]);
  const [isData, setIsData] = useState(false);

  const { t } = useTranslation();
  const { data, error, loading, refetch } = useQuery(getAllSongsQuery);

  useEffect(() => {
    if (data) {
      if (!(data.getAllSongs.length === 0)) {
        setIsData(true);
        setSongList(data.getAllSongs);
      }
    }

    if (error) {
      console.error(error);
    }
  }, [data, error, loading, t]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 4000);

    return () => clearInterval(interval);
  }, [refetch]);

  return (
    <div className='community-songs-container'>
      <h2 className='title-page'>{t('SongMaker.community.title')}</h2>
      <div className='content-container'>
        <div className='feedback'>
          {loading && <Loading />}
          {error && <ErrorAlert />}
        </div>
        {/* <Sort /> */}
        {isData ? (
          <Table songList={songList} />
        ) : (
          <p>There are no songs yet.</p>
        )}
      </div>
    </div>
  );
};

export default CommunitySongs;
