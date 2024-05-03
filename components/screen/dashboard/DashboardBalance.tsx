import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TextComponent from "@/components/_general/TextComponent";
import { Poppins } from "@/assets/fonts";

const DashboardBalance = () => {
  return (
    <View
      style={{
        alignItems: "center",
        gap: 4,
        paddingVertical: 40,
        marginTop: 30
      }}
    >
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center"
        }}
      >
        <TextComponent>₦</TextComponent>
        <TextComponent fontSize={30} fontFamily={Poppins.semiBold.default}>
          100,000
        </TextComponent>
      </View>
      <TextComponent textAlign="center" style={{ opacity: 0.6 }}>
        Wallet balance
      </TextComponent>
    </View>
  );
};

export default DashboardBalance;

const styles = StyleSheet.create({});
