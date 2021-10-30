import { FontAwesome } from "@expo/vector-icons";
import React, { useMemo } from "react";
import {
  View,
  Text,
  Pressable,
  Vibration,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { useDispatch } from "react-redux";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import Typography from "../constants/Typography";
import useAppSelector from "../hooks/useAppSelector";
import { addToCart, removeFromCart } from "../store/reducers/cart";
import AddToCartButton from "./AddToCartButton";

export default function AmountSwitch({
  itemId,
  mode = "small",
  style,
}: {
  itemId: string | number;
  mode: "small" | "medium";
  style?: StyleProp<ViewStyle>;
}) {
  const dispatch = useDispatch();
  const cart = useAppSelector((state) => state.cart.cart);
  const amount = cart[itemId];
  const onDecrease = () => {
    Vibration.vibrate(100);
    dispatch(removeFromCart(itemId));
  };
  const onIncrease = () => {
    Vibration.vibrate(100);
    dispatch(addToCart(itemId));
  };

  return (
    <View style={{ height: 42 }}>
      {amount > 0 ? (
        <View style={[styles.container, style]}>
          <Pressable
            style={({ pressed }) => ({
              ...styles.button,
              backgroundColor: pressed
                ? Colors.light.tintDarker
                : "transparent",
            })}
            onPress={onDecrease}
          >
            <FontAwesome color={"#fff"} name="minus" />
          </Pressable>
          <Text
            style={[
              Typography.h3,
              {
                color: "#fff",
                paddingHorizontal: Layout.spacing.small,
                fontSize: 10,
              },
            ]}
          >
            {amount}
          </Text>
          <Pressable
            style={({ pressed }) => ({
              ...styles.button,
              backgroundColor: pressed
                ? Colors.light.tintDarker
                : "transparent",
            })}
            onPress={onIncrease}
          >
            <FontAwesome color={"#fff"} name="plus" />
          </Pressable>
        </View>
      ) : (
        <AddToCartButton style={style} mode={mode} onPress={onIncrease} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: Layout.spacing.medium,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    height: "100%",

    backgroundColor: Colors.light.tint,
    alignSelf: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
  },
});
