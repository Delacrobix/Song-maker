import React, { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const sesionToken = Cookies.get('sesionToken');
  const [isLoggedIn, setIsLoggedIn] = useState(sesionToken ? true : false);

  function handleLogin() {
    setIsLoggedIn(true);
  }

  function handleLogout() {
    Cookies.remove('sesionToken');
    setIsLoggedIn(false);
  }

  useEffect(() => {
    console.log('context: ', isLoggedIn);
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
