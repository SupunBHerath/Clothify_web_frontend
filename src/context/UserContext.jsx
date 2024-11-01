import React, { createContext, useContext, useState } from 'react';
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [role, setRole] = useState(null);

  const login = (userRole) => {
    setRole(userRole);
  };

  const logout = () => {
    setRole(null);
  };

  return (
    <UserContext.Provider value={{ role, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
