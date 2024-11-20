import React, { createContext, useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [cusId, setcusId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLoging] = useState(false)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
        const userRole = decodedToken.data?.role;
        const id = decodedToken.data?.id;
        setRole(userRole);
        setcusId(id);
        setIsLoging(true);
        console.log("User role from token:", userRole);
      } catch (error) {
        console.error("Invalid token", error);
        setRole(null);
      }
    } else {
      setRole(null);
    }
    setLoading(false); 
  }, [localStorage.getItem("token")]);

  const login = (userRole) => {
    setRole(userRole);
  };

  const logout = () => {
    setRole(null);
    setIsLoging(false)
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ role,isLogin, loading, login, logout,cusId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
