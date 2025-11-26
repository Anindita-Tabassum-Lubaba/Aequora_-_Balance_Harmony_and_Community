import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AuthWrapper = ({ allowedRoles }) => {
  // In a real app, you would check the token validity here
  const isAuthenticated = localStorage.getItem('authToken');
  const userRole = localStorage.getItem('userRole');

  if (!isAuthenticated) {
    // If not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // If roles are specified, check if the user has the required role
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // If logged in but wrong role, redirect to home (or an unauthorized page)
    return <Navigate to="/" replace />;
  }

  // If authenticated and authorized, render the child components (the dashboard)
  return <Outlet />;
};

export default AuthWrapper;