// components/ui/Background.jsx
import React from "react";
import {
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { COLORS } from "../../theme";

// exactly the same blob + logo logic as before
const LOGO = require("../../assets/images/vchLogo.webp");
const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get("window");

const TOPLEFT = SCREEN_W * 0.3;
const BLUE_SZ = SCREEN_W * 0.55;
const GREEN_SZ = SCREEN_W * 0.6;
const LOGO_W = SCREEN_W * 0.6;
const LOGO_H = LOGO_W * (48 / 160);
const LOGO_TOP = SCREEN_H * 0.1;
const LOGO_LEFT = SCREEN_W * 0.05;

export default function Background({ children }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* blobs */}
      <View style={styles.topLeftCircle} />
      <View style={styles.circleBlue} />
      <View style={styles.circleGreen} />

      {/* logo */}
      <View style={styles.logoWrapper}>
        <Image source={LOGO} style={styles.logo} resizeMode="contain" />
      </View>

      {/* your screen’s contents */}
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    overflow: "hidden",
  },
  topLeftCircle: {
    position: "absolute",
    width: TOPLEFT,
    height: TOPLEFT,
    borderRadius: TOPLEFT / 2,
    backgroundColor: "#C1D82F",
    top: -TOPLEFT * 0.4,
    left: -TOPLEFT * 0.4,
    zIndex: 0,
  },
  circleBlue: {
    position: "absolute",
    width: BLUE_SZ,
    height: BLUE_SZ,
    borderRadius: BLUE_SZ / 2,
    backgroundColor: "#0078AE",
    top: -BLUE_SZ * 0.6,
    right: -BLUE_SZ * 0.3,
    zIndex: 0,
  },
  circleGreen: {
    position: "absolute",
    width: GREEN_SZ,
    height: GREEN_SZ,
    borderRadius: GREEN_SZ / 2,
    backgroundColor: "#C1D82F",
    bottom: -GREEN_SZ * 0.5,
    left: -GREEN_SZ * 0.4,
    zIndex: 0,
  },
  logoWrapper: {
    position: "absolute",
    top: LOGO_TOP,
    left: LOGO_LEFT,
    width: LOGO_W,
    height: LOGO_H,
    zIndex: 1,
  },
  logo: {
    width: "100%",
    height: "100%",
  },
});
