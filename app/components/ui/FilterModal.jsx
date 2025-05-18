// components/ui/FilterModal.jsx
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
import { COLORS } from "../../theme";

export default function FilterModal({ visible, onClose, onApply, onReset }) {
  const [datePreset, setDatePreset] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [kidgo, setKidgo] = useState("Moderate");
  const [creMin, setCreMin] = useState(null);
  const [creMax, setCreMax] = useState(null);
  const [lacMin, setLacMin] = useState(null);
  const [lacMax, setLacMax] = useState(null);

  const handleApply = () => {
    onApply({
      datePreset,
      startDate,
      endDate,
      kidgo,
      creMin,
      creMax,
      lacMin,
      lacMax,
    });
    onClose();
  };
  const handleReset = () => {
    setDatePreset(null);
    setStartDate(null);
    setEndDate(null);
    setKidgo("Moderate");
    setCreMin(null);
    setCreMax(null);
    setLacMin(null);
    setLacMax(null);
    onReset();
  };

  const renderChip = (label, onPress) => (
    <View style={styles.chip}>
      <Text style={styles.chipText}>{label}</Text>
      <TouchableOpacity onPress={onPress} style={styles.chipClose}>
        <Ionicons name="close-circle" size={18} color="#666" />
      </TouchableOpacity>
    </View>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scroll}>
            <TouchableOpacity style={styles.close} onPress={onClose}>
              <Ionicons name="close" size={28} color="#444" />
            </TouchableOpacity>

            {/* --- Date Section --- */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Date</Text>
              <View style={styles.controls}>
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
                <View style={styles.controls}>
                  {renderChip(startDate || "Start Date", () =>
                    setStartDate(null)
                  )}
                  {renderChip(endDate || "End Date", () => setEndDate(null))}
                </View>
              )}
            </View>

            {/* --- KIDGO Section --- */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>KIDGO Scores</Text>
              <View style={styles.controls}>
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
            </View>

            {/* --- Creatinine Section --- */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Creatinine</Text>
              <View style={styles.controls}>
                {renderChip(creMin != null ? creMin : "Min Lactate", () =>
                  setCreMin(null)
                )}
                {renderChip(creMax != null ? creMax : "Max Lactate", () =>
                  setCreMax(null)
                )}
              </View>
            </View>

            {/* --- Lactate Section --- */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Lactate</Text>
              <View style={styles.controls}>
                {renderChip(lacMin != null ? lacMin : "Min Lactate", () =>
                  setLacMin(null)
                )}
                {renderChip(lacMax != null ? lacMax : "Max Lactate", () =>
                  setLacMax(null)
                )}
              </View>
            </View>
          </ScrollView>

          {/* --- Footer Buttons --- */}
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
    alignSelf: "center",
    width: "100%",
    backgroundColor: "#EAF3FF",
    borderRadius: 16,
    maxHeight: "90%",
    overflow: "hidden",
  },
  close: { alignSelf: "flex-end", padding: 12 },
  scroll: { paddingHorizontal: 16, paddingBottom: 24 },

  section: {
    flexDirection: "column",
    marginTop: 12,
    paddingHorizontal: 8,
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 12,
  },
  controls: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  presetBtn: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 6,
    backgroundColor: "#eee",
    marginRight: 5,
    marginBottom: 8,
  },
  presetBtnActive: { backgroundColor: COLORS.primary },
  presetLabel: { fontSize: 12, color: "#444" },
  presetLabelActive: { color: "#fff" },

  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#ccc",
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  chipText: { marginRight: 6, fontSize: 16, color: "#333" },
  chipClose: { marginLeft: 4 },

  footer: {
    flexDirection: "row",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: "#ddd",
  },
  btn: {
    flex: 1,
    padding: 18,
    backgroundColor: "#E8E828",
    alignItems: "center",
  },
  btnText: { fontWeight: "700", fontSize: 18, color: "#222" },
  btnOutline: {
    backgroundColor: "#fff",
    borderLeftWidth: 1,
    borderColor: "#ddd",
  },
  btnOutlineText: { color: COLORS.text },
});
