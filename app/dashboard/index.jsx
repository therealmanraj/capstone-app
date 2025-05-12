// app/dashboard/index.jsx
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ScheduleItem from "../../components/home/ScheduleItem";
import SearchHeader from "../../components/home/SearchHeader";
import useDashboard from "../../hooks/useDashboard";
import { COLORS } from "../../theme";

export default function Dashboard() {
  // grab doctorId from the login redirect: /dashboard?doctorId=...
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
  const filtered = schedule.filter((evt) =>
    `${evt.patientFirstName} ${evt.patientLastName}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );
  console.log("filtered", filtered);

  return (
    <View style={styles.container}>
      <SearchHeader
        avatar={doctor.avatar}
        value={search}
        onChange={setSearch}
      />

      <Text style={styles.heading}>My Patients • {filtered.length} today</Text>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <ScheduleItem
            time={new Date(item.scheduledAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            patient={`${item.patientFirstName} ${item.patientLastName}`}
            onPress={() => console.log("go to:", item._id)}
          />
        )}
        ListEmptyComponent={() => (
          <Text style={styles.empty}>No appointments today.</Text>
        )}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
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
  error: { color: "red" },
  empty: {
    textAlign: "center",
    color: "#777",
    marginTop: 24,
  },
});
