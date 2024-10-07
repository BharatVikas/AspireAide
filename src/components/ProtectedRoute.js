import React from 'react';
import { Navigate } from 'react-router-dom';

// A Higher-Order Component (HOC) to protect routes
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated'); // Or use any other logic to check if the user is logged in

  // If not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If authenticated, allow access to the children (protected page)
  return children;
};

export default ProtectedRoute;
