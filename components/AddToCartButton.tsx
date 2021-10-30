import { FontAwesome5 } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { View, Text, Pressable, StyleProp, ViewStyle } from "react-native";
import Bag from "../assets/Icons/Bag";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import Typography from "../constants/Typography";

export default function AddToCartButton({
  onPress,
  mode,
  style,
}: {
  onPress: () => void;
  mode: "small" | "medium";
  style?: StyleProp<ViewStyle>;
}) {
  const containerStyle = useMemo(() => {
    switch (mode) {
      case "small":
        return {
          paddingHorizontal: Layout.spacing.medium,

          borderRadius: 10,
          alignSelf: "flex-end",
        };
      case "medium":
        return {
          paddingHorizontal: Layout.spacing.large,

          borderRadius: 10,
          alignSelf: "center",
        };
    }
  }, [mode]);

  const textStyle = useMemo(() => {
    switch (mode) {
      case "small":
        return {
          paddingLeft: Layout.spacing.small,
          fontSize: 12,
        };
      case "medium":
        return {
          paddingLeft: Layout.spacing.medium,
        };
    }
  }, [mode]);

  return (
    <Pressable
      onPress={onPress}
      //@ts-ignore
      style={({ pressed }) => [
        {
          backgroundColor: pressed
            ? Colors.light.tintDarker
            : Colors.light.tint,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          ...containerStyle,
        },
        style,
      ]}
    >
      <Bag />
      <Text style={[Typography.h3, { color: "#fff" }, textStyle]}>
        В корзину
      </Text>
    </Pressable>
  );
}
