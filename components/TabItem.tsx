import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { LabelPosition } from "@react-navigation/bottom-tabs/lib/typescript/src/types";

import React, { useEffect, useRef } from "react";
import {
  ImageRequireSource,
  StyleProp,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
  Image,
  StyleSheet,
  Animated,
} from "react-native";
import { HOME } from "../constants";
import Colors from "../constants/Colors";
import { Text } from "./Themed";

export interface TabItemProps {
  style?: StyleProp<ViewStyle>;

  label:
    | string
    | ((props: {
        focused: boolean;
        color: string;
        position: LabelPosition;
      }) => React.ReactNode);
  active: boolean;
  onPress: () => void;
}

const ICONS = {
  [HOME]: { name: "home", type: FontAwesome5 },
};

export const TabItem: React.FC<TabItemProps> = ({
  style,
  label,
  active,
  onPress,
}) => {
  const Icon = ICONS[label].type;
  const iconName = ICONS[label].name;
  const colors = Colors.light;
  const animatedValue = useRef(new Animated.Value(0)).current;
  const activeColor = Colors.light.textReveted;
  const inactiveColor = colors.tabIconDefault;

  const animation = (toValue: number) => {
    return Animated.timing(animatedValue, {
      toValue,
      delay: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    animation(active ? 100 : 0);
  }, [active]);

  const paddingHorizontal = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [10, 20],
  });
  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [colors.tint, Colors.light.tintDarker],
  });

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View
        style={[
          styles.container,
          style,
          { paddingHorizontal, backgroundColor },
        ]}
      >
        <View>
          <Icon
            color={active ? activeColor : inactiveColor}
            size={22}
            name={iconName}
          />
        </View>
        {active && (
          <View style={[styles.textContainer]}>
            <Animated.Text numberOfLines={1} style={[styles.label]}>
              {label}
            </Animated.Text>
          </View>
        )}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 10,
    paddingVertical: 11,
  },
  textContainer: {
    marginLeft: 10,
  },

  label: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: -0.2,
  },
});
