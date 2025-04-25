import React from 'react';
import { Navigate } from 'react-router-dom';
import Authenticate from './authenticate';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/" />;
  } 

  return <Authenticate>{children}</Authenticate>;
}

export default PrivateRoute;
