import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuthUser } from '~/services/authServices';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setIsLoggedIn(true);
      // Gọi API để lấy thông tin người dùng nếu cần
      fetchUserProfile(accessToken);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  const fetchUserProfile = async (accessToken) => {
    const userData = await getAuthUser(accessToken);
    setAuthUser(userData);
  };

  return <AuthContext.Provider value={{ isLoggedIn, authUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
