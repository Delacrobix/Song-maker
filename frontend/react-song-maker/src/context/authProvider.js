import React, { useState, useEffect } from 'react';
import { AuthContext } from './authContext';
import Cookies from 'js-cookie';

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

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
