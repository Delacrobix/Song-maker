import { Navigate } from 'react-router-dom';
import React, { useContext } from 'react';
// import Cookies from 'js-cookie';
import { AuthContext } from '../../../context/AuthContext';

const ProtectedRoute = (props) => {
  const { isLoggedIn } = useContext(AuthContext);
  const { children, redirectTo } = props;

  // const sesionToken = Cookies.get('sesionToken');

  if (!isLoggedIn) {
    return <Navigate to={redirectTo} />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
