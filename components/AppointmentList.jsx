// components/AppointmentList.jsx
import React from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import AppointmentCard from "./AppointmentCard";

export default function AppointmentList({ data }) {
  if (!data.length) {
    return <Text style={styles.empty}>No appointments today.</Text>;
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <AppointmentCard appointment={item} />}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: 16,
  },
  empty: {
    textAlign: "center",
    marginTop: 32,
    color: "#777",
    fontSize: 16,
  },
});
