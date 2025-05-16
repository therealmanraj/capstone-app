// app/_layout.jsx
import React from "react";
import { Slot } from "expo-router";
import { AuthProvider } from "../context/AuthContext"; // make sure this path is correct

export default function RootLayout() {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
