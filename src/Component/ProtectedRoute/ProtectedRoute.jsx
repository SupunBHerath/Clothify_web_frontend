import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const ProtectedRoute = ({ children, roles }) => {
  const { user } = useUser();

  if (!user || (roles && !roles.includes(user.role))) {
    return <Navigate to="/" />;
  }

  return children; 
};

export default ProtectedRoute;
