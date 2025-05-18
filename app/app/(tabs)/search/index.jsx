// app/app/(tabs)/search/index.jsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Background from "../../../components/ui/Background";
import { COLORS } from "../../../theme";

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get("window");
// match Dashboard’s spacing under the logo:
const LOGO_W = SCREEN_W * 0.6;
const LOGO_H = LOGO_W * (48 / 160);
const CONTENT_TOP = SCREEN_H * 0.1 + LOGO_H + SCREEN_H * 0.02;
const H_PADDING = SCREEN_W * 0.04;

export default function SearchScreen() {
  const [query, setQuery] = useState("");

  // dummy patient data:
  const patients = Array.from({ length: 21 }).map((_, i) => ({
    id: String(i + 1),
    name: "Mario Mattos",
  }));

  return (
    <Background>
      <View style={styles.content}>
        {/* Search bar */}
        <View style={styles.searchWrapper}>
          <Ionicons
            name="search-outline"
            size={20}
            color="#888"
            style={styles.searchIcon}
          />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search"
            placeholderTextColor="#888"
            style={styles.searchInput}
          />
        </View>

        {/* Heading */}
        <Text style={styles.heading}>Patients</Text>

        {/* 3-column grid */}
        <FlatList
          data={patients}
          keyExtractor={(item) => item.id}
          numColumns={3}
          showsVerticalScrollIndicator={Platform.OS === "web"}
          contentContainerStyle={styles.grid}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Ionicons
                name="person-circle-outline"
                size={48}
                color={COLORS.primary}
              />
              <Text style={styles.cardLabel}>{item.name}</Text>
            </View>
          )}
        />
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingTop: CONTENT_TOP,
    paddingHorizontal: H_PADDING,
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEE",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    padding: 0,
  },
  heading: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 12,
  },
  // grid: {
  //   paddingBottom: 32,
  // },
  card: {
    flex: 1 / 3,
    aspectRatio: 1,
    backgroundColor: "#D1E8FF",
    margin: H_PADDING / 4,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  cardLabel: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
    textAlign: "center",
  },
});
