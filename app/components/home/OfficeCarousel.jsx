// components/OfficeCarousel.jsx
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import OfficeCard from "./OfficeCard";

export default function OfficeCarousel({ data, onSelect }) {
  if (!data.length)
    return <Text style={styles.empty}>No offices scheduled.</Text>;

  return (
    <View style={{ marginBottom: 24 }}>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(o) => o.id}
        renderItem={({ item }) => (
          <OfficeCard office={item} onPress={onSelect} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  empty: {
    textAlign: "center",
    color: "#777",
    marginVertical: 16,
  },
});
