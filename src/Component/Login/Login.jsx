import React from 'react';
import { useUser } from '../context/UserContext';

const Login = () => {
  const { login } = useUser();

  const handleLogin = (role) => {
    login(role); 
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={() => handleLogin('admin')}>Login as Admin</button>
      <button onClick={() => handleLogin('user')}>Login as User</button>
    </div>
  );
};

export default Login;
