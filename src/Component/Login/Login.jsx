import React from 'react';
import { useUser } from '../../context/UserContext';

const Login = () => {
  const { login } = useUser();

  const handleLogin = () => {
   localStorage.removeItem('token')
    login(null); 
  };
  
  

  return (
    <div>
      <h2>logout</h2>
      <button onClick={() => handleLogin()}>logout</button>
    </div>
  );
};

export default Login;
