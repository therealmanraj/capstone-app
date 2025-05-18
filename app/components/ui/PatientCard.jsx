// components/ui/PatientCard.jsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../../theme";

export default function PatientCard({ name, age, risk, lastVisit }) {
  // split into first & last
  const [firstName, lastName] = name.split(" ");

  return (
    <View style={styles.card}>
      {/* HEADER ROW */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          {/* initials not used here since we show first/last name */}
          <Text style={styles.avatarText}>
            {firstName[0]}
            {lastName?.[0] || ""}
          </Text>
        </View>
        <View style={styles.nameWrapper}>
          <Text style={styles.firstName}>{firstName}</Text>
          <Text style={styles.lastName}>{lastName}</Text>
        </View>
      </View>

      {/* OTHER INFO */}
      <Text style={styles.info}>{age} years</Text>
      <Text style={styles.info}>{risk}</Text>
      <Text style={styles.info}>Last Visit: {lastVisit}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1 / 2,
    backgroundColor: "#D1E8FF",
    borderRadius: 12,
    padding: 12,
    margin: 5,
    // subtle shadow on native, elevation on Android:
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
    // default is column, align items to start
    alignItems: "flex-start",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: COLORS.primary,
    fontWeight: "700",
  },
  nameWrapper: {
    marginLeft: 12,
    // flexDirection: 'column' is default
  },
  firstName: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
  },
  lastName: {
    fontSize: 16,
    fontWeight: "400",
    color: COLORS.text,
  },
  info: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 2,
  },
});
