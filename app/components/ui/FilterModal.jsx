import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider"; // expo install @react-native-community/slider
import { COLORS } from "../../theme";

export default function FilterModal({
  visible,
  onClose,
  onApply,
  onReset,
  initialFilters = {},
}) {
  const [datePreset, setDatePreset] = useState(null); // "week" | "month" | "custom"
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [kidgo, setKidgo] = useState("Moderate"); // Low, Moderate, High, Very High
  const [creatinine, setCreatinine] = useState(0.5);
  const [lactate, setLactate] = useState(0.5);

  const handleApply = () => {
    onApply({ datePreset, startDate, endDate, kidgo, creatinine, lactate });
    onClose();
  };

  const handleReset = () => {
    setDatePreset(null);
    setStartDate(null);
    setEndDate(null);
    setKidgo("Moderate");
    setCreatinine(0.5);
    setLactate(0.5);
    onReset();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scroll}>
            {/* Close button */}
            <TouchableOpacity style={styles.close} onPress={onClose}>
              <Ionicons name="close" size={24} color="#444" />
            </TouchableOpacity>

            {/* Date */}
            <Text style={styles.sectionTitle}>Date</Text>
            <View style={styles.presetRow}>
              {["week", "month", "custom"].map((p) => (
                <TouchableOpacity
                  key={p}
                  style={[
                    styles.presetBtn,
                    datePreset === p && styles.presetBtnActive,
                  ]}
                  onPress={() => setDatePreset(p)}
                >
                  <Text
                    style={[
                      styles.presetLabel,
                      datePreset === p && styles.presetLabelActive,
                    ]}
                  >
                    {p === "week"
                      ? "Last Week"
                      : p === "month"
                      ? "Last Month"
                      : "Custom"}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {datePreset === "custom" && (
              <View style={styles.chipRow}>
                {["Start Date", "End Date"].map((label, i) => {
                  const val = i === 0 ? startDate : endDate;
                  return (
                    <View key={i} style={styles.chip}>
                      <Text style={styles.chipText}>{val || label}</Text>
                      <TouchableOpacity
                        onPress={() =>
                          i === 0 ? setStartDate(null) : setEndDate(null)
                        }
                      >
                        <Ionicons name="close-circle" size={16} color="#666" />
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            )}

            {/* KIDGO */}
            <Text style={styles.sectionTitle}>KIDGO Scores</Text>
            <View style={styles.presetRow}>
              {["Low", "Moderate", "High", "Very High"].map((lvl) => (
                <TouchableOpacity
                  key={lvl}
                  style={[
                    styles.presetBtn,
                    kidgo === lvl && styles.presetBtnActive,
                  ]}
                  onPress={() => setKidgo(lvl)}
                >
                  <Text
                    style={[
                      styles.presetLabel,
                      kidgo === lvl && styles.presetLabelActive,
                    ]}
                  >
                    {lvl}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Creatinine */}
            <Text style={styles.sectionTitle}>Creatinine</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={1}
              value={creatinine}
              onValueChange={setCreatinine}
            />

            {/* Lactate */}
            <Text style={styles.sectionTitle}>Lactate</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={1}
              value={lactate}
              onValueChange={setLactate}
            />
          </ScrollView>

          {/* Footer buttons */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.btn} onPress={handleApply}>
              <Text style={styles.btnText}>Apply</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, styles.btnOutline]}
              onPress={handleReset}
            >
              <Text style={[styles.btnText, styles.btnOutlineText]}>Reset</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#00000066",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: 16,
    maxHeight: "90%",
    overflow: "hidden",
  },
  close: {
    alignSelf: "flex-end",
    padding: 12,
  },
  scroll: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 12,
    marginBottom: 6,
    color: COLORS.text,
  },
  presetRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  presetBtn: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    backgroundColor: "#eee",
    marginRight: 8,
    marginBottom: 8,
  },
  presetBtnActive: {
    backgroundColor: COLORS.primary,
  },
  presetLabel: {
    fontSize: 14,
    color: "#444",
  },
  presetLabelActive: {
    color: "#fff",
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 8,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  chipText: { marginRight: 4, fontSize: 14, color: "#333" },
  slider: {
    width: "100%",
    height: 40,
    marginBottom: 12,
  },
  footer: {
    flexDirection: "row",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: "#ddd",
  },
  btn: {
    flex: 1,
    padding: 16,
    backgroundColor: "#E8E828",
    alignItems: "center",
  },
  btnText: {
    fontWeight: "700",
    color: "#222",
    fontSize: 16,
  },
  btnOutline: {
    backgroundColor: "#fff",
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderColor: "#ddd",
  },
  btnOutlineText: {
    color: COLORS.text,
  },
});
