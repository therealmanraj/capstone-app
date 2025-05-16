// app/app/(tabs)/search/index.jsx
import React, { useCallback } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";

export default function SearchScreen() {
  // a dummy function for testing
  const runDummy = useCallback(() => {
    console.log("✅ Dummy function ran");
    Alert.alert("Dummy", "Your dummy function executed!");
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔍 Search Screen</Text>
      <Text style={styles.description}>
        This is your placeholder for the Search view.
      </Text>
      <Button title="Run Dummy Function" onPress={runDummy} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#fff",
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
