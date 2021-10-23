import React from "react";
import Svg, { Path } from "react-native-svg";
export default () => {
  return (
    <Svg width="22" height="14" viewBox="0 0 22 14" fill="none">
      <Path
        d="M1 7H14"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M1 1H21"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M1 13H21"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
