import { NavigationProp, RouteProp } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Image, View } from "react-native";
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

interface Props {
  route: RouteProp<RootStackParamList, typeof FOOD_ITEM>;
  navigation: NavigationProp<RootStackParamList>;
}

const height = Layout.window.height;

export default function FoodItemScreen({
  navigation,
  route: {
    params: { item },
  },
}: Props) {
  const translateY = useSharedValue(0);
  const isGestureActive = useSharedValue(false);

  const onGestuerEvent = useAnimatedGestureHandler({
    onStart: () => {
      isGestureActive.value = true;
    },
    onActive: ({ translationY }) => {
      translateY.value = translationY;
    },
    onEnd: ({ velocityY }) => {
      const shouldGoBack =
        snapPoint(translateY.value, velocityY, [0, height]) === height;
      if (shouldGoBack) {
        runOnJS(navigation.goBack)();
      } else {
        translateY.value = withSpring(0, { velocity: velocityY });
      }
      isGestureActive.value = false;
    },
  });

  const style = useAnimatedStyle(() => {
    const scale = interpolate(
      translateY.value,
      [0, height],
      [1, 0.5],
      Extrapolate.CLAMP
    );
    return {
      flex: 1,
      transform: [{ translateY: translateY.value }, { scale }],
    };
  });

  const borderStyle = useAnimatedStyle(() => ({
    borderRadius: withTiming(isGestureActive.value ? 40 : 0),
  }));

  return (
    <>
      <StatusBar backgroundColor={Colors.light.cardColor} />
      <PanGestureHandler onGestureEvent={onGestuerEvent}>
        <Animated.View style={[style, styles.container, borderStyle]}>
          <View style={styles.imageContainer}>
            <SharedElement style={{ flex: 1 }} id={item.id}>
              <Animated.Image
                style={[styles.image]}
                source={{ uri: item.image }}
              />
            </SharedElement>
          </View>

          <Animatable.View animation="bounce" style={styles.infoContainer}>
            <Text style={[Typography.title, styles.title]}>{item.name}</Text>
          </Animatable.View>
        </Animated.View>
      </PanGestureHandler>
    </>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    height: 370,
  },
  image: { ...StyleSheet.absoluteFillObject, resizeMode: "cover" },
  container: {
    overflow: "hidden",
    marginTop: Layout.spacing.large,
    flex: 1,
    backgroundColor: Colors.light.cardColor,
  },
  title: {
    fontSize: 24,
  },
  infoContainer: {
    backgroundColor: Colors.light.background,
    height: 315,
    borderRadius: 40,
    marginTop: -100,
    padding: Layout.spacing.large,
  },
});
