import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { WalletBackground } from "@/assets/images";
import { whiteColor } from "@/assets/colors";
import TextComponent from "@/components/_general/TextComponent";
import { Poppins } from "@/assets/fonts";
import { Copy } from "iconsax-react-native";
import { defaultIconProps } from "@/utils/_variables";

const WalletBalance = () => {
  return (
    <View
      style={{
        borderRadius: 15,
        overflow: "hidden"
      }}
    >
      <Image
        source={WalletBackground}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          resizeMode: "cover",
          top: 0,
          left: 0,
          opacity: 0.7
        }}
      />
      <View
        style={{
          gap: 20,
          padding: 20,
          paddingVertical: 30,
          backgroundColor: whiteColor.opacity300
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
              gap: 2
            }}
          >
            <TextComponent
              style={{
                opacity: 0.6
              }}
            >
              Wallet balance
            </TextComponent>

            <View
              style={{
                alignItems: "center",
                flexDirection: "row"
              }}
            >
              <TextComponent>₦</TextComponent>
              <TextComponent
                fontSize={30}
                fontFamily={Poppins.semiBold.default}
              >
                100,000
              </TextComponent>
            </View>
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
    </View>
  );
};

export default WalletBalance;

const styles = StyleSheet.create({});
