import React from "react";
import { View, Image, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import Typography from "../constants/Typography";
import { FoodItem } from "../Types";
import Button from "./Button";
import { Text } from "./Themed";

export default function FoodCard({ image, name, weight, price }: FoodItem) {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: image }} />
      <Button
        style={{ marginTop: -20, alignSelf: "flex-end", marginRight: 10 }}
        onPress={() => {}}
        title={"В корзину"}
      />
      <View style={styles.cardInfo}>
        <Text style={[Typography.title, styles.title]}>{name}</Text>
        <View style={styles.footer}>
          <Text style={styles.weight}>{weight} грм</Text>
          <Text style={styles.price}>{price} руб</Text>
        </View>
      </View>
    </View>
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
  footer: {
    paddingVertical: Layout.spacing.medium,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  price: {
    fontFamily: "NunitoBold",
    fontSize: 12,
  },
  cardInfo: {
    paddingHorizontal: Layout.spacing.medium,
    paddingTop: Layout.spacing.large,
    paddingBottom: Layout.spacing.large,
  },
  title: {
    textAlign: "center",
    fontSize: 16,
  },
  image: {
    borderRadius: 8,
    overflow: "hidden",
    height: 134,
  },
});
