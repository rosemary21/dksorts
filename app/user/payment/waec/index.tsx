import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LoggedInContainer from "@/components/_layouts/LoggedInContainer";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  blackColor,
  greenColor,
  primaryColor,
  redColor,
  whiteColor
} from "@/assets/colors";
import TextComponent from "@/components/_general/TextComponent";
import { Poppins } from "@/assets/fonts";
import { Check } from "iconsax-react-native";
import { defaultIconProps, ScreenNames } from "@/utils/_variables";
import { CheckIcon, X } from "lucide-react-native";
import { router } from "expo-router";

const WAEC = () => {
  const { push } = router;
  return (
    <LoggedInContainer
      rightContent={
        <TouchableOpacity
          onPress={() => {
            push(ScreenNames.GenerateWaecPin.path);
          }}
          style={{
            paddingVertical: 5,
            paddingHorizontal: 15,
            borderRadius: 15,
            backgroundColor: primaryColor.default
          }}
        >
          <TextComponent color={whiteColor.default}>Generate</TextComponent>
        </TouchableOpacity>
      }
    >
      {new Array(4).fill(0).map((_, index) => (
        <View
          key={index}
          style={{
            gap: 6,
            paddingVertical: 20,
            borderBottomWidth: index + 1 < 4 ? 1 : 0,
            borderColor: blackColor.opacity200,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <View
            style={{
              gap: 6
            }}
          >
            <TextComponent
              color={index % 2 !== 0 ? redColor.default : undefined}
            >
              {index % 2 === 0 ? (
                <>
                  Generate pin:{" "}
                  <TextComponent fontFamily={Poppins.bold.default}>
                    321445
                  </TextComponent>
                </>
              ) : (
                "Pin generation failed"
              )}
            </TextComponent>
            <TextComponent
              style={{
                opacity: 0.6
              }}
            >
              13 January 2024
            </TextComponent>
          </View>

          {index % 2 === 0 ? (
            <CheckIcon
              {...defaultIconProps}
              color={greenColor.default}
              size={20}
            />
          ) : (
            <X {...defaultIconProps} color={redColor.default} size={20} />
          )}
        </View>
      ))}
    </LoggedInContainer>
  );
};

export default WAEC;

const styles = StyleSheet.create({});
