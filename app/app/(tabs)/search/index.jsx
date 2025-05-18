import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Background from "../../../components/ui/Background";
import { COLORS } from "../../../theme";
import FilterModal from "../../../components/ui/FilterModal";

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get("window");
const LOGO_H = SCREEN_W * 0.6 * (48 / 160);
const CONTENT_TOP = SCREEN_H * 0.1 + LOGO_H + SCREEN_H * 0.02;
const H_PADDING = SCREEN_W * 0.04;

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);

  const patients = Array.from({ length: 21 }).map((_, i) => ({
    id: String(i + 1),
    name: "Mario Mattos",
  }));

  return (
    <Background>
      <View style={styles.container}>
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

        {/* Patient grid */}
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

        {/* Filters row */}
        <View style={styles.filtersRow}>
          <TouchableOpacity
            style={styles.filterBtn}
            onPress={() => setShowFilters(true)}
          >
            <Text style={styles.filterBtnText}>
              ({Object.keys(activeFilters).length}) Filters
            </Text>
          </TouchableOpacity>

          <FilterModal
            visible={showFilters}
            onClose={() => setShowFilters(false)}
            initialFilters={activeFilters}
            onApply={(f) => setActiveFilters(f)}
            onReset={() => setActiveFilters({})}
          />

          <TouchableOpacity
            style={styles.clearBtn}
            onPress={() => setActiveFilters({})}
          >
            <Text style={styles.clearBtnText}>Clear Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
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
  grid: {
    paddingBottom: 24,
  },
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
  filtersRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    marginBottom: 24,
  },
  filterBtn: {
    flex: 1,
    backgroundColor: "#FFEB3B",
    paddingVertical: 14,
    borderRadius: 8,
    marginRight: 8,
    alignItems: "center",
  },
  clearBtn: {
    flex: 1,
    backgroundColor: "#FFEB3B",
    paddingVertical: 14,
    borderRadius: 8,
    marginLeft: 8,
    alignItems: "center",
  },
  filterBtnText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
  },
  clearBtnText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
  },
});
