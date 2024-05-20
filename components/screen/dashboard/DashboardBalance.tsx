import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TextComponent from "@/components/_general/TextComponent";
import { Poppins } from "@/assets/fonts";
import useUser from "@/hooks/useUser";
import LottieView from "lottie-react-native";
import { ApiLoadingLottieAnimation } from "@/assets/lotties";

const DashboardBalance = () => {
  const { userDetails } = useUser();
  return (
    <View
      style={{
        alignItems: "center",
        gap: 4,
        paddingVertical: 40,
        marginTop: 30
      }}
    >
      {!userDetails ? (
        <LottieView
          source={ApiLoadingLottieAnimation}
          autoPlay
          loop
          style={{
            width: 50,
            height: 50
          }}
        />
      ) : (
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          <TextComponent>₦</TextComponent>
          <TextComponent fontSize={30} fontFamily={Poppins.semiBold.default}>
            {userDetails.balance}
          </TextComponent>
        </View>
      )}
      <TextComponent textAlign="center" style={{ opacity: 0.6 }}>
        Wallet balance
      </TextComponent>
    </View>
  );
};

export default DashboardBalance;

const styles = StyleSheet.create({});
