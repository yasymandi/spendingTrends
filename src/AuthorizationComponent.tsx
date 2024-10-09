import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    // If user is not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  return children; // Render protected content if authenticated
};

export default PrivateRoute;
