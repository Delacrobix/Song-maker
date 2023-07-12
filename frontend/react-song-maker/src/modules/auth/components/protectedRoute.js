import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
// import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
import { Route, useNavigate, Navigate } from 'react-router-dom';

const ProtectedRoute = (props) => {
  const { children, path } = props;
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const jwtKey = process.env.REACT_APP_JWT_SECRET_KEY;

    // const jwtToken = Cookies.get('sesionToken');
    const jwtToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJ7XCJpZFwiOjEsXCJ1c2VyTmFtZVwiOlwiamVmZlwifSIsInJvbGUiOiJjb21wb3NlciIsIm5iZiI6MTY4OTEyOTE4NywiZXhwIjoxNjkwNDI1MTg3LCJpYXQiOjE2ODkxMjkxODd9.IcP_E2MiL_iQm5z1vOlRgKSiiBcY694ly23IpL8A3eo';

    const decodeToken = jwtDecode(jwtToken);
    console.log('decodeToken: ', JSON.parse(decodeToken.nameid));

    // if (token) {
    // validateJWT(token, jwtKey);
    // }
  });

  // function validateJWT(token, key) {
  //   try {
  //     console.log('token: ', token);
  //     console.log('key: ', key);
  //     const payload = jwt.verify(token, key);

  //     console.log('payload: ', payload);

  //     // Decodificar el payload
  //     const decodedToken = jwtDecode(token);

  //     // Realizar comprobaciones adicionales según tus necesidades
  //     // Por ejemplo, verificar la fecha de expiración del token
  //     const currentTime = Date.now() / 1000; // convertir a segundos
  //     if (decodedToken.exp < currentTime) {
  //       // El token ha expirado
  //       setIsAuthenticated(false);
  //     } else {
  //       setIsAuthenticated(true);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     return false;
  //   }
  // }

  return isAuthenticated ? children : <Navigate to={path} />;
};

export default ProtectedRoute;
