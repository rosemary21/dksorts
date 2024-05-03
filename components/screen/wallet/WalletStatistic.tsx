import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TextComponent from "@/components/_general/TextComponent";
import { Poppins } from "@/assets/fonts";
import { greenColor, primaryColor } from "@/assets/colors";
import { ArrowDown, ArrowUp } from "iconsax-react-native";
import { defaultIconProps } from "@/utils/_variables";

const WalletStatisticCard: React.FC<{
  value: string;
  label: string;
  alternate?: boolean;
}> = ({ value, label, alternate }) => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        padding: 20,
        borderRadius: 15,
        flex: 1,
        backgroundColor: alternate ? primaryColor.opacity100 : "#e6e6e6"
      }}
    >
      <View
        style={{
          alignItems: "center",
          flexDirection: "row"
        }}
      >
        <TextComponent>₦</TextComponent>
        <TextComponent fontSize={20} fontFamily={Poppins.semiBold.default}>
          {value}
        </TextComponent>
      </View>
      <View
        style={{
          alignItems: "center",
          flexDirection: "row"
        }}
      >
        <TextComponent style={{ opacity: 0.6 }}>{label}</TextComponent>
      </View>
    </View>
  );
};

const WalletStatistic = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "stretch",
        gap: 10
      }}
    >
      <WalletStatisticCard label="Funded" value="300,000" />
      <WalletStatisticCard label="Spent" value="200,000" alternate />
    </View>
  );
};

export default WalletStatistic;

const styles = StyleSheet.create({});
