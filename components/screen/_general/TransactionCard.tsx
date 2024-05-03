import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import { blackColor, primaryColor, whiteColor } from "@/assets/colors";
import TextComponent from "@/components/_general/TextComponent";
import { Poppins } from "@/assets/fonts";

const TransactionCard: React.FC<{
  invertColor?: boolean;
  style?: ViewStyle;
}> = ({ invertColor, style }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
        ...style
      }}
    >
      <View
        style={{
          width: 50,
          height: 50,
          backgroundColor: invertColor
            ? whiteColor.opacity100
            : primaryColor.opacity100,
          borderRadius: 1000
        }}
      ></View>

      <View
        style={{
          flex: 1
        }}
      >
        <TextComponent
          color={invertColor ? whiteColor.default : blackColor.default}
          fontFamily={Poppins.semiBold.default}
        >
          Data purchased
        </TextComponent>
        <TextComponent
          color={invertColor ? whiteColor.opacity400 : blackColor.opacity400}
        >
          Today, 09:05 am
        </TextComponent>
      </View>

      <TextComponent
        color={invertColor ? whiteColor.default : blackColor.default}
        fontFamily={Poppins.bold.default}
        fontSize={20}
      >
        ₦220
      </TextComponent>
    </View>
  );
};

export default TransactionCard;

const styles = StyleSheet.create({});
