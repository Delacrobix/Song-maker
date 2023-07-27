import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { getAllSongsByUserNameQuery } from '../../../utils/queries';
import useUser from '../../../hooks/useUser';
import Table from '../../songMaker/components/table/table';
import ErrorAlert from '../../songMaker/components/feedback/errorAlert';
import Loading from '../../songMaker/components/feedback/loading';

const Profile = () => {
  const [watchSongs, setWatchSongs] = useState(false);
  const [printable, setPrintable] = useState({});
  const [user, setUser] = useState({});
  const userHook = useUser();

  const { data, error, loading } = useQuery(
    getAllSongsByUserNameQuery(userHook.userName)
  );
  // const { data, error, loading } = useQuery(getAllUserSongsQuery);

  useEffect(() => {
    setUser(userHook);
  }, [userHook]);

  useEffect(() => {
    if (data) {
      setPrintable(<Table songList={data.getAllSongsByUserName} />);
    }

    if (error) {
      setPrintable(<ErrorAlert />);
    }

    if (loading) {
      setPrintable(<Loading />);
    }
  }, [data, error, loading]);

  function handleClick() {
    setWatchSongs(true);
  }

  return (
    <section className='profile'>
      <div className='profile__container'>
        <h1>Profile</h1>
        <div>{'User name: ' + user.userName}</div>
        <div>User email:</div>
        <div className='profile__container--user-songs'>
          <button onClick={handleClick}>Watch your songs</button>
          {watchSongs ? printable : null}
        </div>
      </div>
    </section>
  );
};

export default Profile;
