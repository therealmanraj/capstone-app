// app/app/(tabs)/patients/index.jsx
import React, { useCallback } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";

export default function PatientsScreen() {
  const runDummy = useCallback(() => {
    console.log("✅ Patients dummy ran");
    Alert.alert("Patients", "This is your Patients screen!");
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👥 Patients Screen</Text>
      <Text style={styles.description}>
        Here’s where you’ll list your patients.
      </Text>
      <Button title="Run Patients Dummy" onPress={runDummy} />
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
