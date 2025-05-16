// components/ui/NavBar.jsx
import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { usePathname, Link } from "expo-router";
import { COLORS } from "../../theme";

const TABS = [
  { route: "/dashboard", icon: "home-outline", label: "Home" },
  { route: "/search", icon: "search-outline", label: "Search" },
  { route: "/patients", icon: "people-outline", label: "Patients" },
  { route: "/settings", icon: "settings-outline", label: "Settings" },
];

export default function NavBar() {
  const path = usePathname();

  return (
    <View style={styles.nav}>
      {TABS.map((tab) => {
        const isActive = path.startsWith(tab.route);
        return (
          <Link key={tab.route} href={tab.route} asChild>
            <TouchableOpacity style={styles.tab}>
              <Ionicons
                name={tab.icon}
                size={24}
                color={isActive ? COLORS.primary : "#888"}
              />
              <Text
                style={[
                  styles.label,
                  { color: isActive ? COLORS.primary : "#888" },
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          </Link>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 64,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
  tab: {
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    marginTop: 2,
  },
});
