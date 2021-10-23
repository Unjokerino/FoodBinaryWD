import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Menu from "../assets/Icons/Menu";
import Layout from "../constants/Layout";

export default function HeaderLeft({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ paddingLeft: Layout.horizontalSpacing }}
    >
      <Menu />
    </TouchableOpacity>
  );
}
