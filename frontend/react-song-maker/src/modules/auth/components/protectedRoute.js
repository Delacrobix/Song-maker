import { Navigate } from 'react-router-dom';
import React, { useContext } from 'react';
// import Cookies from 'js-cookie';
import { AuthContext } from '../../../context/authContext';

const ProtectedRoute = (props) => {
  const { isLoggedIn } = useContext(AuthContext);
  const { children, redirectTo } = props;

  if (!isLoggedIn) {
    return <Navigate to={redirectTo} />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
