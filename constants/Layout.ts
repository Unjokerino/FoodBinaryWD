import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  horizontalSpacing: 30,
  spacing: {
    xsmall: 3,
    small: 7,
    medium: 14,
    large: 21,
    xLarge: 28,
    xxLarge: 35,
    xxxLarge: 40,
  },
};
