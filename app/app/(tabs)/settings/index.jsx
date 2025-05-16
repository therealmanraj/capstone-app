// app/app/(tabs)/settings/index.jsx

import React, { useCallback } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";

export default function SettingsScreen() {
  const handlePress = useCallback(() => {
    console.log("⚙️ Settings dummy fired");
    Alert.alert("Settings", "This is your Settings screen!");
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚙️ Settings Screen</Text>
      <Text style={styles.description}>
        Here you’ll configure your preferences.
      </Text>
      <Button title="Run Settings Dummy" onPress={handlePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
  },
});
