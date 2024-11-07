import React, { createContext, useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const userRole = decodedToken.data?.role;
        setRole(userRole);
        console.log("User role from token:", userRole);
      } catch (error) {
        console.error("Invalid token", error);
        setRole(null);
      }
    } else {
      setRole(null);
    }
    setLoading(false); 
  }, []);

  const login = (userRole) => {
    setRole(userRole);
  };

  const logout = () => {
    setRole(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ role, loading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
