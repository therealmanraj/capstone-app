// app/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  doctor: null,
  login: async (doc) => {},
  logout: async () => {},
});

export function AuthProvider({ children }) {
  const [doctor, setDoctor] = useState(null);

  // on mount, rehydrate doctor from storage
  useEffect(() => {
    AsyncStorage.getItem("doctor").then((json) => {
      if (json) setDoctor(JSON.parse(json));
    });
  }, []);

  const login = async (doc) => {
    setDoctor(doc);
    await AsyncStorage.setItem("doctor", JSON.stringify(doc));
  };
  const logout = async () => {
    setDoctor(null);
    await AsyncStorage.removeItem("doctor");
  };

  return (
    <AuthContext.Provider value={{ doctor, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
