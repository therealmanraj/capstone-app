// app/_layout.jsx
import { Stack } from "expo-router";
import React from "react";
import { COLORS } from "../theme";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: COLORS.textOnPrimary,
        headerTitleStyle: { fontSize: 20, fontWeight: "bold" },
      }}
    >
      <Stack.Screen name="index" options={{ title: "My Dashboard" }} />
      <Stack.Screen
        name="patients/[id]"
        options={{ title: "Patient Details" }}
      />
    </Stack>
  );
}
