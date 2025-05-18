// app/app/(tabs)/dashboard/index.jsx
import React from "react";
import { useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import Background from "../../../components/ui/Background";
import AppointmentCard from "../../../components/home/AppointmentCard";
import useDashboard from "../../../hooks/useDashboard";
import { COLORS } from "../../../theme";

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get("window");
// match the same spacing under the logo as in Search:
const LOGO_HEIGHT = SCREEN_W * 0.6 * (48 / 160);
const CONTENT_TOP = SCREEN_H * 0.1 + LOGO_HEIGHT + SCREEN_H * 0.02;
const H_PADDING = SCREEN_W * 0.04;

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

  const { doctor } = data;

  const appointments = [
    { id: "1", name: "Juan Pérez", age: 45, time: "10:00 AM", room: "Room 3" },
    { id: "2", name: "Ana Silva", age: 25, time: "14:00 PM", room: "Room 5" },
    {
      id: "3",
      name: "Jessica Fhon",
      age: 38,
      time: "16:00 PM",
      room: "Room 1",
    },
    {
      id: "4",
      name: "Mario Mattos",
      age: 65,
      time: "18:00 PM",
      room: "Room 6",
    },
    {
      id: "5",
      name: "Roberto Vera",
      age: 32,
      time: "19:00 PM",
      room: "Room 8",
    },
    {
      id: "6",
      name: "María González",
      age: 29,
      time: "20:00 PM",
      room: "Room 2",
    },
    {
      id: "7",
      name: "Carlos López",
      age: 50,
      time: "21:00 PM",
      room: "Room 4",
    },
    {
      id: "8",
      name: "Lucía Martínez",
      age: 40,
      time: "22:00 PM",
      room: "Room 7",
    },
    {
      id: "9",
      name: "Sofía Torres",
      age: 28,
      time: "23:00 PM",
      room: "Room 9",
    },
    {
      id: "10",
      name: "Diego Ramírez",
      age: 55,
      time: "24:00 PM",
      room: "Room 10",
    },
  ];

  return (
    <Background>
      <View style={styles.container}>
        <Text style={styles.doctorName}>
          Dr. {doctor.firstName} {doctor.lastName}
        </Text>

        <View style={styles.kpiContainer}>
          <View style={styles.kpiCard}>
            <Text style={styles.kpiValue}>--</Text>
            <Text style={styles.kpiLabel}>Patients Today</Text>
          </View>
          <View style={styles.kpiCard}>
            <Text style={styles.kpiValue}>--</Text>
            <Text style={styles.kpiLabel}>Completed</Text>
          </View>
        </View>

        <Text style={styles.subheading}>Today’s appointments</Text>

        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <AppointmentCard
              name={item.name}
              age={item.age}
              time={item.time}
              room={item.room}
              onPress={() => console.log("Tapped", item.id)}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    paddingTop: CONTENT_TOP,
    paddingHorizontal: H_PADDING,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 12,
  },
  kpiContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  kpiCard: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 4,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  kpiValue: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
  },
  kpiLabel: {
    fontSize: 14,
    color: COLORS.text,
    marginTop: 4,
  },
  subheading: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 32,
  },
  error: {
    color: "red",
    textAlign: "center",
  },
});
