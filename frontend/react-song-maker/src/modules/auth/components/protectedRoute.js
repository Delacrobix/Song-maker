import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import { Route, useNavigate, Navigate } from 'react-router-dom';

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
