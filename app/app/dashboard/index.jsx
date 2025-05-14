// app/dashboard/index.jsx
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import SearchHeader from "../../components/home/SearchHeader";
import ScheduleList from "../../components/home/ScheduleList";
import useDashboard from "../../hooks/useDashboard";
import { COLORS } from "../../theme";

export default function Dashboard() {
  const { doctorId } = useLocalSearchParams();
  const { data, loading, error } = useDashboard(doctorId);
  const [search, setSearch] = useState("");

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  if (error || !data)
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Oops! Couldn’t load data.</Text>
      </View>
    );

  const { doctor, schedule } = data;

  // filter by the single `patient` string
  const filtered = schedule.filter((evt) =>
    evt.patient.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <SearchHeader
        avatar={doctor.avatar}
        value={search}
        onChange={setSearch}
      />

      <Text style={styles.heading}>My Patients • {filtered.length} today</Text>

      <ScheduleList data={filtered} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 12,
  },
  error: {
    color: "red",
    textAlign: "center",
  },
});
