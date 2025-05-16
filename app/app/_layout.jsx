// app/_layout.jsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import Dashboard from "./dashboard";
import Search from "./search";
import Patients from "./patients";
import Settings from "./settings";
import { COLORS } from "../theme";

const Tab = createBottomTabNavigator();

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Tab.Navigator
        initialRouteName="dashboard"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: "#888",
          tabBarStyle: { height: 60, paddingBottom: 6 },
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === "dashboard") iconName = "home-outline";
            else if (route.name === "search") iconName = "search-outline";
            else if (route.name === "patients") iconName = "people-outline";
            else if (route.name === "settings") iconName = "settings-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="dashboard"
          component={Dashboard}
          options={{ title: "Home" }}
        />
        <Tab.Screen
          name="search"
          component={Search}
          options={{ title: "Search" }}
        />
        <Tab.Screen
          name="patients"
          component={Patients}
          options={{ title: "Patients" }}
        />
        <Tab.Screen
          name="settings"
          component={Settings}
          options={{ title: "Settings" }}
        />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
}
