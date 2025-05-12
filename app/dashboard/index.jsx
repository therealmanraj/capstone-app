// app/dashboard/index.jsx
import { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import SearchHeader from "../../components/home/SearchHeader";
import useDashboard from "../../hooks/useDashboard";
import { COLORS } from "../../theme";

export default function Dashboard() {
  const { data, loading, error } = useDashboard();
  const [search, setSearch] = useState("");

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );

  if (error)
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Oops! Couldn’t load data.</Text>
      </View>
    );

  // const { doctor, offices, schedule } = data;
  const { doctor } = data;

  return (
    <View style={styles.container}>
      <SearchHeader
        avatar={doctor.avatar}
        value={search}
        onChange={setSearch}
      />
      {/* <Text style={styles.heading}>My Patients • {schedule.length} today</Text>

      <OfficeCarousel data={offices} onSelect={(o) => console.log(o)} />

      <Text style={styles.subheading}>Schedule</Text>
      <ScheduleList data={schedule} /> */}
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
  subheading: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
    marginTop: 16,
    marginBottom: 8,
  },
  error: {
    color: "red",
  },
});
