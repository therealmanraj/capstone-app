// app/patients/[id].jsx
import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import usePatient from "../../hooks/usePatient";

export default function PatientDetail() {
  const { id } = useLocalSearchParams();
  const { patient, loading, error } = usePatient(id);

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#5b3e96" />
      </View>
    );

  if (error || !patient)
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Couldn’t load patient information.</Text>
      </View>
    );

  const { name, age, history } = patient;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.subtitle}>Age: {age}</Text>

      <Text style={styles.sectionTitle}>Visit History</Text>
      <FlatList
        data={history}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <Text style={styles.historyDate}>{item.date}</Text>
            <Text style={styles.historyEvent}>{item.event}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  historyItem: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
  },
  historyDate: {
    fontSize: 14,
    color: "#888",
  },
  historyEvent: {
    fontSize: 16,
    fontWeight: "500",
  },
  separator: {
    height: 12,
  },
  error: {
    color: "red",
  },
});
