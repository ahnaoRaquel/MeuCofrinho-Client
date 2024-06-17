import axios from "axios";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import jwtDecode from "jwt-decode";
import * as SecureStore from 'expo-secure-store';

const AuthContext = createContext();

export const validateExpiredToken = (token) => {
  try {
    let decodedToken = jwtDecode(token);
    let currentDate = new Date();

    // JWT exp is in seconds
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      console.log("Token expired.");
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log("Erro ao validar token em AuthProvider: " + error);
    return false;
  }
};

const AuthProvider = ({ children }) => {
  const [token, setTokenState] = useState(null);
  const [user, setUser] = useState(null)

  const setToken = async (newToken) => {
    if (newToken) {
      setTokenState(newToken);
      await SecureStore.setItemAsync('token', newToken);
    } else {
      setTokenState(null);
      await SecureStore.deleteItemAsync('token');
    }
  };

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await SecureStore.getItemAsync('token');
      if (storedToken && validateExpiredToken(storedToken)) {
        setTokenState(storedToken);
        axios.defaults.headers.common["Authorization"] = "Bearer " + storedToken;
      } else {
        await SecureStore.deleteItemAsync('token');
      }
    };
    loadToken();
  }, []);

  const logout = async () => {
    await setToken(null);
    await SecureStore.deleteItemAsync('usuario');
    delete axios.defaults.headers.common["Authorization"];
  };

  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      logout,
      setUser,
      user
    }),
    [token]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
