import React, { useEffect, useState } from 'react';
import { Route, useNavigate, Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
// import * as jwt from 'jsonwebtoken';

const ProtectedRoute = (props) => {
  const { children, path } = props;
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const jwtKey = process.env.REACT_APP_JWT_SECRET_KEY;

    // const decodeToken = jwtDecode(jwtKey);
    // const token = localStorage.getItem('token');

    // if (token) {
    //   const decodedToken = validateToken(token, jwtKey);

    //   if (decodedToken) {
    //     setIsAuthenticated(true);
    //   }
    // }
  });

  // function validateToken(token, key) {
  //   const decodedToken = jwt.verify(token, key);

  //   return decodedToken;
  // }

  return isAuthenticated ? children : <Navigate to={path} />;
};

export default ProtectedRoute;
