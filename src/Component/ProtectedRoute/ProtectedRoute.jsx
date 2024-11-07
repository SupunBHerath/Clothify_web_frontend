import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const ProtectedRoute = ({ children, roles }) => {
  const { role, loading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!role) {
        navigate("/", { replace: true });
      } else if (roles && !roles.includes(role)) {
        const rolePaths = {
          admin: "/admin/dashboard",
          customer: "/user/dashboard",
          guest: "/",
        };
        navigate(rolePaths[role] || "/", { replace: true });
      }
    }
  }, [role, loading, navigate, roles]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return role && roles.includes(role) ? children : null;
};

export default ProtectedRoute;
