import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import BASE_URL from './config';

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setIsAuthenticated(false);
        return;
      }
      try {
        const response = await fetch(`${BASE_URL}/api/check_token_valid/`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Token is invalid or expired');
        }
        const data = await response.json();
        setIsAuthenticated(true); // Token is valid
      } catch (error) {
        console.error('Error validating token:', error);
        setIsAuthenticated(false); // Token is invalid
      } finally {
        setLoading(false); // Set loading to false when request completes
      }
    };

    validateToken();
  }, [token]);

  // Show loading spinner or message while validating the token
  if (loading) {
    return <div>Loading...</div>;
  }

  // If user is not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If authenticated, render the protected content
  return children;
};

export default PrivateRoute;
