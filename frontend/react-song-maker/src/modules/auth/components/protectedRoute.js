import React from 'react';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = (props) => {
  const { children, redirectTo } = props;

  const sesionToken = Cookies.get('sesionToken');

  if (!sesionToken) {
    return <Navigate to={redirectTo} />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
