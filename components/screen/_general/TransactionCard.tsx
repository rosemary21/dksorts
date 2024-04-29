import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { blackColor, whiteColor } from "@/assets/colors";
import TextComponent from "@/components/_general/TextComponent";
import { Poppins } from "@/assets/fonts";

const TransactionCard: React.FC<{ invertColor?: boolean }> = ({
  invertColor
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 20
      }}
    >
      <View
        style={{
          width: 50,
          height: 50,
          backgroundColor: invertColor
            ? blackColor.opacity100
            : whiteColor.opacity100,
          borderRadius: 1000
        }}
      ></View>

      <View
        style={{
          flex: 1
        }}
      >
        <TextComponent
          color={invertColor ? blackColor.default : whiteColor.default}
          fontFamily={Poppins.semiBold.default}
        >
          Data purchased
        </TextComponent>
        <TextComponent
          color={invertColor ? blackColor.opacity400 : whiteColor.opacity400}
        >
          Today, 09:05 am
        </TextComponent>
      </View>

      <TextComponent
        color={invertColor ? blackColor.default : whiteColor.default}
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
