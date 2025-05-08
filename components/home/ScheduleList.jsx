// components/home/ScheduleList.jsx
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ScheduleItem from "./ScheduleItem";

export default function ScheduleList({ data }) {
  const router = useRouter();

  if (!data.length)
    return <Text style={styles.empty}>No appointments today.</Text>;

  return (
    <View>
      {data.map((evt) => (
        <ScheduleItem
          key={evt.id}
          time={evt.time}
          patient={evt.patient}
          onPress={() => router.push(`/patients/${evt.id}`)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  empty: {
    textAlign: "center",
    color: "#777",
    marginTop: 24,
  },
});
