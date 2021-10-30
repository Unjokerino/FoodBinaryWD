import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from "react-native";
import Colors from "../constants/Colors";

export default function BackButton({
  style,
  onPress,
}: {
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          width: 36,
          height: 36,
          backgroundColor: Colors.light.tint,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
        },
        style,
      ]}
    >
      <FontAwesome color="#fff" name="arrow-left" />
    </TouchableOpacity>
  );
}
