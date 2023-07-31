import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { getSongsByUserNameQuery } from '../../../utils/queries';
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
    getSongsByUserNameQuery(userHook.userName)
  );

  useEffect(() => {
    setUser(userHook);
  }, [userHook]);

  useEffect(() => {
    if (data) {
      if (data.getSongsByUserName.length === 0) {
        setPrintable(<p>You have no songs yet</p>);
      } else {
        setPrintable(<Table songList={data.getSongsByUserName} />);
      }
    }

    if (error) {
      console.error('Apollo error: ', error);

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
        <h2 className='title-page'>Profile</h2>
        <div className='boxes'>
          <div className='left-box'>
            <label>Email:</label>
            <label>User name:</label>
            <label>Change password:</label>
          </div>
          <div className='right-box'>
            <label>{user.email}</label>
            <label>{user.userName}</label>
            <button className='change-password'>Change </button>
          </div>
        </div>
        <div className='profile__container__user-songs'>
          <button onClick={handleClick} className='profile-button'>
            Watch your songs
          </button>
          {watchSongs ? printable : null}
        </div>
      </div>
    </section>
  );
};

export default Profile;
