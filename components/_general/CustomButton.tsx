import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";
import React from "react";
import TextComponent from "./TextComponent";
import { blackColor } from "@/assets/colors";
import { Poppins } from "@/assets/fonts";

const CustomButton: React.FC<{
  letter: string | React.ReactNode;
  onPress?: (letter: string) => void;
  style?: ViewStyle;
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  hasBackground?: boolean;
}> = ({
  letter,
  onPress,
  style,
  fontSize = 24,
  fontFamily = Poppins.regular.default,
  color,
  hasBackground
}) => {
  if (!color) {
    color = blackColor.default;
  }
  return (
    <TouchableOpacity
      onPress={() => {
        if (onPress && typeof onPress === "function") {
          onPress(typeof letter === "string" ? letter : "");
        }
      }}
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40,
        backgroundColor: hasBackground ? blackColor.opacity40 : undefined,
        borderRadius: 9000,
        ...style
      }}
    >
      <TextComponent fontSize={fontSize} fontFamily={fontFamily} color={color}>
        {letter}
      </TextComponent>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({});
