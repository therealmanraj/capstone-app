// components/SearchHeader.jsx
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SearchHeader({
  avatar,
  value,
  onChange,
  onAvatarPress,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color="#888" />
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={value}
          onChangeText={onChange}
        />
      </View>
      <TouchableOpacity onPress={onAvatarPress}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
      </TouchableOpacity>
    </View>
  );
}

const AVATAR_SIZE = 36;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: "center",
    marginRight: 12,
  },
  input: {
    marginLeft: 8,
    flex: 1,
    height: 36,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
  },
});
