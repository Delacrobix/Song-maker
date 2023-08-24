import React, { useState, useEffect } from 'react';
import Table from '../components/table/table';
import { useQuery } from '@apollo/client';
// import Sort from '../components/table/sort';
import ErrorAlert from '../components/feedback/errorAlert';
import Loading from '../components/feedback/loading';
import { getAllSongsQuery } from '../../../utils/queries';
import { useTranslation } from 'react-i18next';
import { getUserNames } from '../../../utils/httpRequests';

const CommunitySongs = () => {
  const { t } = useTranslation();

  const [songList, setSongList] = useState([]);
  const [isData, setIsData] = useState(false);
  const [userNames, setUserNames] = useState([]);

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
  }, [data, error, loading]);

  useEffect(() => {
    (async () => {
      setUserNames(await loadUserNames());
    })();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 4000);

    return () => clearInterval(interval);
  }, [refetch]);

  async function loadUserNames() {
    const userNames = await getUserNames();

    return userNames;
  }

  return (
    <div className='community-songs-container'>
      <h2 className='title-page'>{t('SongMaker.community.title')}</h2>
      <div className='content-container'>
        <div className='feedback'>
          {loading && <Loading />}
          {error && <ErrorAlert />}
        </div>
        {/* <Sort /> */}
        {loading ? null : isData ? (
          <>
            <p className='table-legend'>
              * Users verified will have in front of its user name:{' '}
              <span>&#x2713;</span>
            </p>
            <Table userNames={userNames} songList={songList} />
          </>
        ) : (
          <p>{t('SongMaker.community.no-songs')}</p>
        )}
      </div>
    </div>
  );
};

export default CommunitySongs;
