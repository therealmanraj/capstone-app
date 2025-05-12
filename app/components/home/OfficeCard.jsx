// components/OfficeCard.jsx
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../theme";

export default function OfficeCard({ office, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(office)}>
      <View style={styles.header}>
        <Text style={styles.title}>{office.name}</Text>
        <Text style={styles.count}>{office.patients} patients</Text>
      </View>
      <Text style={styles.time}>{office.timespan}</Text>
      <View style={styles.avatars}>
        {office.avatars.map((uri) => (
          <Image key={uri} source={{ uri }} style={styles.avatar} />
        ))}
      </View>
      <View style={styles.check}>
        <Ionicons name="checkmark-circle" size={24} color={COLORS.success} />
      </View>
    </TouchableOpacity>
  );
}

const AV_SIZE = 28;
const styles = StyleSheet.create({
  card: {
    width: 200,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    position: "relative",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    color: COLORS.textOnPrimary,
    fontWeight: "bold",
  },
  count: {
    color: "rgba(255,255,255,0.8)",
  },
  time: {
    color: "rgba(255,255,255,0.8)",
    marginVertical: 8,
  },
  avatars: {
    flexDirection: "row",
  },
  avatar: {
    width: AV_SIZE,
    height: AV_SIZE,
    borderRadius: AV_SIZE / 2,
    borderWidth: 1,
    borderColor: "#fff",
    marginRight: -6,
  },
  check: {
    position: "absolute",
    top: 12,
    right: 12,
  },
});
