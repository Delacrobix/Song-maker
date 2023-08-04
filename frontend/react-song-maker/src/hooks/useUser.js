import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';

const useUser = () => {
  const [user, setUser] = useState({});

  // useEffect(() => {
  //   const interval = setInterval(() => {

  //     const cookie = Cookies.get('sesionToken');

  //     console.log('cookie: ', cookie);

  //     if (cookie === 'undefined' || !cookie) {
  //       return;
  //     }

  //     try {
  //       const decodedToken = jwtDecode(cookie);

  //       setUser(JSON.parse(decodedToken.nameid));
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   }, 3000);

  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    const sesionToken = Cookies.get('sesionToken');

    if (!sesionToken) {
      return;
    }

    try {
      const decodedToken = jwtDecode(sesionToken);

      setUser(JSON.parse(decodedToken.nameid));
    } catch (e) {
      console.error(e);
    }
  }, []);

  return user;
};

export default useUser;
