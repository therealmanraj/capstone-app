// app/index.jsx
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import AppointmentList from "../components/AppointmentList";
import useAppointments from "../hooks/useAppointments";

export default function DashboardPage() {
  const { appointments, loading, error } = useAppointments();

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Welcome, Dr. Smith</Text>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : error ? (
        <Text style={styles.error}>Failed to load appointments.</Text>
      ) : (
        <AppointmentList data={appointments} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    padding: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});
