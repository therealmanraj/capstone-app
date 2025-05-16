// app/dashboard/index.jsx
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, StyleSheet, Text, View, Image } from "react-native";
import ScheduleList from "../../components/home/ScheduleList";
import useDashboard from "../../hooks/useDashboard";
import { COLORS } from "../../theme";

// your logo asset
const LOGO = require("../../assets/images/vchLogo.webp");

export default function Dashboard() {
  const { doctorId } = useLocalSearchParams();
  const { data, loading, error } = useDashboard(doctorId);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }
  if (error || !data) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Oops! Couldn’t load data.</Text>
      </View>
    );
  }

  const { doctor, schedule } = data;

  return (
    <View style={styles.container}>
      {/* Background shapes */}
      <View style={styles.circleGreen} />
      <View style={styles.circleBlue} />

      {/* Logo */}
      <Image source={LOGO} style={styles.logo} resizeMode="contain" />

      {/* Doctor name */}
      <Text style={styles.doctorName}>
        Dr. {doctor.firstName} {doctor.lastName}
      </Text>

      {/* Heading */}
      <Text style={styles.heading}>My Patients • {schedule.length} today</Text>

      {/* Schedule list */}
      <ScheduleList data={schedule} />
    </View>
  );
}

const styles = StyleSheet.create({
  doctorName: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
    textAlign: "center",
    marginBottom: 8,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 100, // added extra top padding now that SearchHeader is gone
    paddingHorizontal: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  circleGreen: {
    position: "absolute",
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: "#C1D82F",
    bottom: 150,
    left: -150,
  },
  circleBlue: {
    position: "absolute",
    width: 250,
    height: 250,
    borderRadius: 250,
    backgroundColor: "#0078AE",
    top: -100,
    right: -100,
  },
  logo: {
    position: "absolute",
    top: 30,
    alignSelf: "center",
    width: 180,
    height: 60,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 16,
    textAlign: "center",
  },
  error: {
    color: "red",
    textAlign: "center",
  },
});
