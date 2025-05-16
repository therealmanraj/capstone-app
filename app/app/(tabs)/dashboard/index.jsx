// app/app/(tabs)/dashboard/index.jsx
import React from "react";
import { useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Dimensions,
  FlatList,
} from "react-native";
import AppointmentCard from "../../../components/home/AppointmentCard";
import useDashboard from "../../../hooks/useDashboard";
import { COLORS } from "../../../theme";

// logo + sizing constants (same as before)
const LOGO = require("../../../assets/images/vchLogo.webp");
const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get("window");
const LOGO_WIDTH = SCREEN_W * 0.6;
const LOGO_HEIGHT = LOGO_WIDTH * (48 / 160);
const LOGO_TOP = SCREEN_H * 0.1;
const LOGO_LEFT = SCREEN_W * 0.05;
const CONTENT_PADDING_TOP = LOGO_TOP + LOGO_HEIGHT + SCREEN_H * 0.02;
const HORIZONTAL_PADDING = SCREEN_W * 0.04;
const TOPLEFT_SIZE = SCREEN_W * 0.3;
const BLUE_CIRCLE_SZ = SCREEN_W * 0.55;
const GREEN_CIRCLE_SZ = SCREEN_W * 0.6;

export default function Dashboard() {
  const { doctorId } = useLocalSearchParams();
  const { data, loading, error } = useDashboard(doctorId);

  // sample data, hard-coded for now
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topLeftCircle} />
      <View style={styles.circleBlue} />
      <View style={styles.circleGreen} />

      <View style={styles.logoWrapper}>
        <Image source={LOGO} style={styles.logo} resizeMode="contain" />
      </View>

      <View style={styles.content}>
        <Text style={styles.doctorName}>
          Dr. {doctor.firstName} {doctor.lastName}
        </Text>
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
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 32 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    overflow: "hidden",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  topLeftCircle: {
    position: "absolute",
    width: TOPLEFT_SIZE,
    height: TOPLEFT_SIZE,
    borderRadius: TOPLEFT_SIZE / 2,
    backgroundColor: "#C1D82F",
    top: -TOPLEFT_SIZE * 0.4,
    left: -TOPLEFT_SIZE * 0.4,
    zIndex: 0,
  },
  circleBlue: {
    position: "absolute",
    width: BLUE_CIRCLE_SZ,
    height: BLUE_CIRCLE_SZ,
    borderRadius: BLUE_CIRCLE_SZ / 2,
    backgroundColor: "#0078AE",
    top: -BLUE_CIRCLE_SZ * 0.6,
    right: -BLUE_CIRCLE_SZ * 0.3,
    zIndex: 0,
  },
  circleGreen: {
    position: "absolute",
    width: GREEN_CIRCLE_SZ,
    height: GREEN_CIRCLE_SZ,
    borderRadius: GREEN_CIRCLE_SZ / 2,
    backgroundColor: "#C1D82F",
    top: SCREEN_H * 0.5 - GREEN_CIRCLE_SZ * 0.25,
    left: -GREEN_CIRCLE_SZ * 0.4,
    zIndex: 0,
  },

  logoWrapper: {
    position: "absolute",
    top: LOGO_TOP,
    left: LOGO_LEFT,
    width: LOGO_WIDTH,
    height: LOGO_HEIGHT,
    zIndex: 1,
  },
  logo: {
    width: "100%",
    height: "100%",
  },

  content: {
    flex: 1,
    paddingTop: CONTENT_PADDING_TOP,
    paddingHorizontal: HORIZONTAL_PADDING,
    zIndex: 2,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 4,
  },
  subheading: {
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
