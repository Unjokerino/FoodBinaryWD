import { StyleSheet } from "react-native";
import Colors from "./Colors";

export default StyleSheet.create({
  title: {
    fontFamily: "NunitoExtraBold",
    fontSize: 20,
  },
  h1: {
    fontFamily: "NunitoBlack",
    fontSize: 22,
  },
  h3: {
    fontFamily: "NunitoBold",
    fontSize: 14,
  },
  description: {
    fontFamily: "Nunito",
    fontSize: 12,
    color: Colors.light.description,
  },
});
