import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setTokenState] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize: check for stored token on mount
  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          const decoded = jwtDecode(storedToken);
          setTokenState(storedToken);
          setUserId(decoded.userId);
        }
      } catch (e) {
        console.log('Error restoring token:', e);
      } finally {
        setIsLoading(false);
      }
    };

    bootstrapAsync();
  }, []);

  // setToken: save token to AsyncStorage and update state
  const setToken = async newToken => {
    try {
      await AsyncStorage.setItem('token', newToken);
      const decoded = jwtDecode(newToken);
      setTokenState(newToken);
      setUserId(decoded.userId);
    } catch (e) {
      console.log('Error setting token:', e);
      throw e;
    }
  };

  // logout: clear token from AsyncStorage and reset state
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      setTokenState(null);
      setUserId(null);
      setUserInfo(null);
    } catch (e) {
      console.log('Error logging out:', e);
    }
  };

  const value = {
    token,
    userId,
    setUserId,
    userInfo,
    setUserInfo,
    isLoading,
    setToken,
    logout,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
