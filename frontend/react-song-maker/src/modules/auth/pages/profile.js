import React, { useEffect, useState } from 'react';
import useUser from '../../../hooks/useUser';

const Profile = () => {
  const [user, setUser] = useState({});
  const userHook = useUser();

  useEffect(() => {
    setUser(userHook);
  }, [userHook]);

  return (
    <section className='profile'>
      <div className='profile__container'>
        <h1>Profile</h1>
        <div>{'User name: ' + user.userName}</div>
        <div>User email:</div>
        <div>Song list</div>
      </div>
    </section>
  );
};

export default Profile;
