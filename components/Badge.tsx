import React from "react";
import { View, Text, StyleProp, ViewStyle } from "react-native";
import Colors from "../constants/Colors";
import Typography from "../constants/Typography";

export default function Badge({
  amount,
  color,
  textColor,
  style,
}: {
  amount: number;
  color?: string;
  textColor?: string;
  style?: StyleProp<ViewStyle>;
}) {
  return amount > 0 ? (
    <View
      style={[
        {
          width: 14,
          height: 14,
          borderRadius: 7,
          backgroundColor: color || Colors.light.tint,
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          zIndex: 1,
          top: -3,
        },
        style,
      ]}
    >
      <Text
        style={[Typography.h3, { color: textColor || "#fff", fontSize: 9 }]}
      >
        {amount}
      </Text>
    </View>
  ) : null;
}
