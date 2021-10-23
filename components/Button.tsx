import React from "react";
import { View, Text, Pressable, StyleProp, ViewStyle } from "react-native";
import Bag from "../assets/Icons/Bag";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";

export default function Button({
  title,
  onPress,
  style,
}: {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Pressable
      style={[
        {
          flexDirection: "row",
          backgroundColor: Colors.light.tint,
          padding: Layout.spacing.small,
          alignItems: "center",
          borderRadius: 10,
          width: 120,
          justifyContent: "center",
        },
        style,
      ]}
    >
      <Text
        style={{
          color: Colors.light.textReveted,
          paddingRight: Layout.spacing.small,
        }}
      >
        {title}
      </Text>
      <Bag />
    </Pressable>
  );
}
