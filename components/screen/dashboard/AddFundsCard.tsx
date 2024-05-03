import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { primaryColor } from "@/assets/colors";
import TextComponent from "@/components/_general/TextComponent";
import { whiteColor } from "../../../assets/colors";
import { Poppins } from "@/assets/fonts";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Copy } from "iconsax-react-native";
import { defaultIconProps } from "@/utils/_variables";

const AddFundsCard = () => {
  return (
    <View
      style={{
        gap: 10
      }}
    >
      <View
        style={{
          padding: 20,
          borderRadius: 15,
          backgroundColor: "#E6E6E6",
          gap: 30,
          alignItems: "flex-start"
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
            width: "100%"
          }}
        >
          <View
            style={{
              paddingVertical: 3,
              paddingHorizontal: 10,
              backgroundColor: whiteColor.default,
              borderRadius: 9000
            }}
          >
            <TextComponent fontSize={12} color={primaryColor.default}>
              Add funds
            </TextComponent>
          </View>

          <TouchableOpacity>
            <Copy {...defaultIconProps} size={25} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "space-between",
            width: "100%"
          }}
        >
          <View
            style={{
              gap: 2
            }}
          >
            <TextComponent>Moniepoint</TextComponent>
            <TextComponent fontSize={20} fontFamily={Poppins.bold.default}>
              1234567890
            </TextComponent>
          </View>

          <TextComponent>Isaac Omonimewa</TextComponent>
        </View>
      </View>
      <TextComponent
        style={{
          opacity: 0.6
        }}
      >
        Make a bank transfer to the above account to fund your wallet
      </TextComponent>
    </View>
  );
};

export default AddFundsCard;

const styles = StyleSheet.create({});
