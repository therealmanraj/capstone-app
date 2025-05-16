// app/(tabs)/_layout.jsx
import React from "react";
import { Slot } from "expo-router";
import { SafeAreaView, View, StyleSheet } from "react-native";
import NavBar from "../../components/ui/NavBar";
import { COLORS } from "../../theme";

export default function TabsLayout() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Slot />
      </View>
      <NavBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { flex: 1, overflow: "hidden" },
});
