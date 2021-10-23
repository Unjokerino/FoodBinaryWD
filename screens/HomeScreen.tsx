import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "../components/Themed";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Layout.horizontalSpacing,
    backgroundColor: Colors.light.background,
  },
  searchContainer: {
    flexDirection: "row",
  },
});
