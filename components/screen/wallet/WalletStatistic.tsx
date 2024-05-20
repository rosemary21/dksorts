import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TextComponent from "@/components/_general/TextComponent";
import { Poppins } from "@/assets/fonts";
import { greenColor, primaryColor } from "@/assets/colors";
import { ArrowDown, ArrowUp } from "iconsax-react-native";
import { defaultIconProps } from "@/utils/_variables";
import useUser from "@/hooks/useUser";
import LottieView from "lottie-react-native";
import { ApiLoadingLottieAnimation } from "@/assets/lotties";

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
      {value ? (
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
      ) : (
        <LottieView
          source={ApiLoadingLottieAnimation}
          autoPlay
          loop
          style={{
            width: 50,
            height: 50
          }}
        />
      )}
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
  const { userDetails } = useUser();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "stretch",
        gap: 10
      }}
    >
      <WalletStatisticCard
        label="Funded"
        value={userDetails?.totalFunded?.toString() || ""}
      />
      <WalletStatisticCard
        label="Spent"
        value={userDetails?.totalSpent?.toString() || ""}
        alternate
      />
    </View>
  );
};

export default WalletStatistic;

const styles = StyleSheet.create({});
