import React from "react";
import { IconType } from "@/utils/types";
import { blackColor, whiteColor } from "../colors";
import { Path, Svg } from "react-native-svg";

const StarTransparent: React.FC<IconType> = ({
  size = 20,
  color = blackColor.default,
  ...props
}) => (
  <Svg width={size} height={size} viewBox="0 0 11 11" fill="none" {...props}>
    {/* <rect width="19" height="19" fill="#00AC35" /> */}
    <Path
      d="M6 2L6.927 3.97476L9 4.29338L7.5 5.82965L7.854 8L6 6.97476L4.146 8L4.5 5.82965L3 4.29338L5.073 3.97476L6 2Z"
      stroke={color}
      strokeWidth={0.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default StarTransparent;
