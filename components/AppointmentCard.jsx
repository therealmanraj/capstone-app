// components/AppointmentCard.jsx
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function AppointmentCard({ appointment }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{appointment.patientName}</Text>
      <Text style={styles.time}>{appointment.time}</Text>
      <Text style={styles.type}>{appointment.type}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    // shadow for iOS
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    // elevation for Android
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  time: {
    fontSize: 14,
    color: "#555",
    marginBottom: 2,
  },
  type: {
    fontSize: 14,
    color: "#555",
  },
});
