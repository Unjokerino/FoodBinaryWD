import React from "react";
import { StyleSheet, Text, ImageBackground } from "react-native";
import Layout from "../constants/Layout";

export default function PromoCard() {
  return (
    <ImageBackground
      style={styles.container}
      source={require("../assets/images/foodTemp.png")}
    >
      <Text></Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 150,
    borderRadius: 18,
    overflow: "hidden",
    width: Layout.window.width - Layout.horizontalSpacing * 2,
  },
});
