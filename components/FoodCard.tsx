import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Image, StyleSheet, Pressable } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { FOOD_ITEM } from "../constants";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import Typography from "../constants/Typography";
import { Product } from "../types/store/products";
import AmountSwitch from "./AmountSwitch";
import Button from "./Button";
import { Text } from "./Themed";

export default function FoodCard(item: Product) {
  const { images, name, weight, price, id } = item;
  const navigation = useNavigation();
  const [opacity, setOpacity] = useState(1);

  useFocusEffect(() => {
    if (navigation.isFocused()) {
      setOpacity(1);
    }
  });

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { opacity: pressed ? 0.2 : 1 },
      ]}
      onPress={() => {
        navigation.navigate(FOOD_ITEM, { item });
        setOpacity(0.5);
      }}
    >
      <View style={styles.imageContainer}>
        <SharedElement style={{ flex: 1 }} id={name}>
          <Image
            style={[styles.image, { opacity }]}
            source={{ uri: images[0].src }}
          />
        </SharedElement>
      </View>
      <AmountSwitch
        mode="small"
        style={styles.cartButton}
        itemId={id.toString()}
      />
      <View style={styles.cardInfo}>
        <Text style={[Typography.title, styles.title]}>{name}</Text>
        <View style={styles.footer}>
          <Text style={styles.weight}>{weight} грм</Text>
          <Text style={styles.price}>{price} руб</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "48%",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: Colors.light.cardColor,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  cartButton: { marginTop: -22, alignSelf: "flex-end", marginRight: 10 },
  footer: {
    paddingVertical: Layout.spacing.medium,
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    alignItems: "flex-end",
  },
  weight: {
    fontFamily: "Nunito",
    fontSize: 12,
    borderRadius: 18,
    backgroundColor: Colors.light.tint,
    color: Colors.light.textReveted,
    paddingHorizontal: Layout.spacing.medium,
    paddingVertical: Layout.spacing.xsmall,
  },
  imageContainer: { height: 134 },
  price: {
    fontFamily: "NunitoBold",
    fontSize: 12,
  },
  cardInfo: {
    paddingHorizontal: Layout.spacing.medium,
    flex: 1,
    paddingBottom: Layout.spacing.large,
  },
  title: {
    textAlign: "center",
    fontSize: 16,
  },
  image: {
    borderRadius: 8,
    resizeMode: "cover",
    width: undefined,
    height: undefined,
    ...StyleSheet.absoluteFillObject,
  },
});
