import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';

const useUser = () => {
  const [user, setUser] = useState({});

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
