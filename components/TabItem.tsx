import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { LabelPosition } from "@react-navigation/bottom-tabs/lib/typescript/src/types";

import React, { useEffect, useMemo, useRef } from "react";
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
import { HOME, SEARCH_SCREEN, SHOPING_BAG, USER_SCREEN } from "../constants";
import Colors from "../constants/Colors";
import Typography from "../constants/Typography";
import useAppSelector from "../hooks/useAppSelector";
import Badge from "./Badge";
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

export const TabItem: React.FC<TabItemProps> = ({
  style,
  label,
  active,
  onPress,
}) => {
  const cart = useAppSelector((state) => state.cart.cart);
  const amount = useMemo(
    () => Object.keys(cart).reduce((prev, cur) => (prev += cart[cur]), 0),
    [cart]
  );
  const ICONS = {
    [HOME]: { name: "home", type: FontAwesome5 },
    [SEARCH_SCREEN]: { name: "search", type: FontAwesome5 },
    [SHOPING_BAG]: { name: "shopping-bag", type: FontAwesome5, badge: amount },
    [USER_SCREEN]: { name: "user", type: FontAwesome5 },
  };
  const Icon = ICONS[label]?.type;
  const iconName = ICONS[label]?.name;
  const colors = Colors.light;
  const badge = ICONS[label]?.badge || 0;
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
          <Badge
            style={{ left: -5 }}
            textColor={Colors.light.text}
            color={Colors.light.cardColor}
            amount={badge}
          />
          <Icon
            color={active ? activeColor : inactiveColor}
            size={22}
            name={iconName}
          />
        </View>
        {active && (
          <View style={[styles.textContainer]}>
            <Text numberOfLines={1} style={[styles.label, Typography.h3]}>
              {label}
            </Text>
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
