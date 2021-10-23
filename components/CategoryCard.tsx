import React from "react";
import { StyleSheet, Text, Pressable } from "react-native";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import Typography from "../constants/Typography";

export default function CategoryCard({
  title,
  onPress,
  isActive,
}: {
  title: string;
  onPress: () => void;
  isActive?: boolean;
}) {
  return (
    <Text
      onPress={onPress}
      style={[styles.conainer, Typography.h3, isActive && styles.active]}
    >
      {title}
    </Text>
  );
}

const styles = StyleSheet.create({
  conainer: {
    backgroundColor: Colors.light.itemColor,
    marginRight: Layout.spacing.small,
    borderRadius: 16,
    paddingHorizontal: Layout.spacing.medium,
    paddingVertical: Layout.spacing.small,
    borderColor: Colors.light.borderColor,
    borderWidth: 1,
    color: Colors.light.text,
  },
  active: {
    color: Colors.light.textReveted,
    borderColor: Colors.light.tint,
    borderWidth: 0,
    backgroundColor: Colors.light.tint,
  },
});
