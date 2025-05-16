// app/_layout.jsx
import { Stack } from "expo-router";
import { COLORS } from "../theme";

export default function RootLayout() {
  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: COLORS.textOnPrimary,
        headerTitleStyle: { fontSize: 20, fontWeight: "bold" },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />

      <Stack.Screen
        name="dashboard/index"
        options={{ title: "My Dashboard", headerShown: false }}
      />
    </Stack>
  );
}
