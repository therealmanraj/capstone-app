// app/_layout.jsx
import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  return (
    <Stack
      // these options apply to every screen in this navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#ff8c00" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontSize: 20, fontWeight: "bold" },
        // you can tweak more defaults here…
      }}
    >
      {/* 
        By default Expo Router will auto‑register:
        • app/index.jsx  → name="index"
        • app/about/index.jsx → name="about"
        
        If you want to override titles, icons, etc, you can
        explicitly list them here:
      */}
      <Stack.Screen name="index" options={{ title: "My Dashboard" }} />
      <Stack.Screen name="about" options={{ title: "About This App" }} />
    </Stack>
  );
}
