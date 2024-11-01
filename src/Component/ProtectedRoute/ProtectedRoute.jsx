import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const ProtectedRoute = ({ children, roles }) => {
  const { role } = useUser(); 
  
  if (!role || (roles && !roles.includes(role))) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
