import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../theme";

export default function AppointmentCard({ name, age, time, room, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {/* Left: avatar icon + name/age */}
      <View style={styles.left}>
        <Ionicons
          name="person-circle-outline"
          size={28}
          color={COLORS.primary}
        />
        <View style={styles.textBlock}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.age}>{age} years</Text>
        </View>
      </View>

      {/* Right: time and room */}
      <View style={styles.right}>
        <View style={styles.detail}>
          <Ionicons name="time-outline" size={16} color={COLORS.primary} />
          <Text style={styles.detailText}>{time}</Text>
        </View>
        <View style={styles.detail}>
          <Ionicons name="location-outline" size={16} color={COLORS.primary} />
          <Text style={styles.detailText}>{room}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#D1E8FF",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 6,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  textBlock: {
    marginLeft: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
  },
  age: {
    fontSize: 14,
    color: COLORS.primary,
    marginTop: 2,
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
  },
  detail: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 16,
  },
  detailText: {
    fontSize: 14,
    color: COLORS.primary,
    marginLeft: 4,
  },
});
