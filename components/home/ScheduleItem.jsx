// components/home/ScheduleItem.jsx
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ScheduleItem({ time, patient, onPress }) {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <Text style={styles.time}>{time}</Text>
      <View style={styles.card}>
        <Text style={styles.time}>{time}</Text>
        <Text style={styles.patient}>{patient}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  time: {
    width: 90,
    color: "#555",
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  patient: {
    fontSize: 16,
  },
});
