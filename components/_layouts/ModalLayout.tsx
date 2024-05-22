import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";
import React from "react";
import {
  padding,
  screenHeight,
  screenWidth,
  windowHeight,
  windowWidth
} from "@/utils/_variables";
import { blackColor, whiteColor } from "@/assets/colors";
import { router } from "expo-router";
import TextComponent from "../_general/TextComponent";
import { X } from "lucide-react-native";
import { defaultIconProps } from "@/utils/_variables";

const ModalLayout: React.FC<{
  title?: string;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  children: React.ReactNode;
  hideHeader?: boolean;
  onClose?: () => void;
  removeAutoClose?: boolean;
  hideCancelButton?: boolean;
}> = ({
  title,
  style,
  contentContainerStyle,
  children,
  hideHeader,
  hideCancelButton,
  onClose,
  removeAutoClose = null
}) => {
  const { back } = router;
  return (
    <View
      style={{
        width: screenWidth,
        height: screenHeight,
        justifyContent: "flex-end",
        ...style
      }}
    >
      <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: blackColor.opacity300,
          position: "absolute",
          top: 0,
          left: 0
        }}
      >
        <TouchableOpacity
          onPress={() => {
            if (!removeAutoClose) {
              back();
            }

            if (onClose && typeof onClose === "function") {
              onClose();
            }
          }}
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: blackColor.opacity200
          }}
        ></TouchableOpacity>
      </View>

      <View
        style={{
          width: "100%",
          height: "auto",
          backgroundColor: whiteColor.default,
          borderTopLeftRadius: 35,
          borderTopRightRadius: 35,
          padding: 40,
          paddingHorizontal: padding,
          ...contentContainerStyle
        }}
      >
        {!hideHeader && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <TextComponent>{title}</TextComponent>

            {!hideCancelButton && (
              <TouchableOpacity onPress={back}>
                <X {...defaultIconProps} />
              </TouchableOpacity>
            )}
          </View>
        )}

        {children}
      </View>
    </View>
  );
};

export default ModalLayout;

const styles = StyleSheet.create({});
