import { NavigationProp, RouteProp } from "@react-navigation/native";
import React, { useMemo, useState } from "react";
import { StyleSheet, Image, View, Pressable } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { ScreenStackProps } from "react-native-screens";
import { SharedElement } from "react-navigation-shared-element";
import { FOOD_ITEM } from "../constants";
import { RootStackParamList, RootStackScreenProps } from "../Types";
import { snapPoint } from "react-native-redash";
import Layout from "../constants/Layout";
import Colors from "../constants/Colors";
import { StatusBar } from "expo-status-bar";
import * as Animatable from "react-native-animatable";
import Typography from "../constants/Typography";
import { Text } from "../components/Themed";
import BackButton from "../components/BackButton";
import Cart from "../assets/Icons/Cart";
import AmountSwitch from "../components/AmountSwitch";

interface Props {
  route: RouteProp<RootStackParamList, typeof FOOD_ITEM>;
  navigation: NavigationProp<RootStackParamList>;
}

export default function FoodItemScreen({
  navigation,
  route: {
    params: { item },
  },
}: Props) {
  const [imageOpen, setImageOpen] = useState(false);

  return (
    <>
      <StatusBar backgroundColor={Colors.light.cardColor} />

      <View style={[styles.container]}>
        <Pressable
          onPress={() => setImageOpen((prev) => !prev)}
          style={styles.imageContainer}
        >
          <SharedElement style={{ flex: 1 }} id={item.name}>
            <Animated.Image
              style={[styles.image]}
              source={{ uri: item.images[0].src }}
            />
          </SharedElement>
          <View style={styles.header}>
            <Animatable.View animation="slideInLeft">
              <BackButton onPress={() => navigation.goBack()} />
            </Animatable.View>
            <Animatable.View animation="slideInRight">
              <Cart />
            </Animatable.View>
          </View>
        </Pressable>

        <Animatable.View
          style={[styles.infoContainer, { marginTop: imageOpen ? -40 : -0 }]}
        >
          <Text style={styles.category}>{item.type}</Text>
          <Text style={[Typography.title, styles.title]}>{item.name}</Text>
          <View style={styles.divider}>
            <View style={styles.rhombus} />
            <View style={styles.rhombus} />
          </View>
          <Text style={[Typography.title, styles.subtitle]}>Описание</Text>
          <Text style={[Typography.description, styles.description]}>
            {item.description}
          </Text>
          <View style={styles.footer}>
            <AmountSwitch mode="medium" itemId={item.id} />
          </View>
        </Animatable.View>
        <View
          style={{
            paddingVertical: Layout.spacing.medium,
            paddingHorizontal: Layout.horizontalSpacing,
          }}
        >
          <Text style={Typography.h1}>Рекомендуем с этим товаром</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    height: 370,
  },
  subtitle: {
    fontSize: 16,
  },
  category: {
    alignSelf: "flex-end",
    position: "absolute",
    top: -34,
    right: 32,
    color: "#302F3C",
    fontSize: 18,
  },
  footer: {
    marginTop: Layout.spacing.xxxLarge,
    marginBottom: Layout.spacing.large,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  description: {
    marginTop: Layout.spacing.xsmall,
  },
  divider: {
    backgroundColor: Colors.light.dividerColor,
    height: 2,
    marginTop: Layout.spacing.large,
    marginBottom: Layout.spacing.medium,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rhombus: {
    transform: [{ rotate: "45deg" }],
    height: 6,
    width: 6,
    backgroundColor: Colors.light.dividerColor,
  },
  header: {
    position: "absolute",
    top: Layout.spacing.xLarge,
    left: Layout.spacing.large,
    right: Layout.spacing.large,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: { ...StyleSheet.absoluteFillObject, resizeMode: "cover" },
  container: {
    overflow: "hidden",
    paddingTop: Layout.spacing.large,
    flex: 1,
    backgroundColor: Colors.light.cardColor,
  },
  title: {
    fontSize: 24,
  },
  infoContainer: {
    backgroundColor: Colors.light.background,

    borderRadius: 40,

    padding: Layout.spacing.large,
  },
});
