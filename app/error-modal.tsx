import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ModalLayout from "@/components/_layouts/ModalLayout";
import LottieView from "lottie-react-native";
import { FailedLottieAnimation } from "@/assets/lotties";
import TextComponent from "@/components/_general/TextComponent";
import Button from "@/components/_general/Button";
import { whiteColor } from "@/assets/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { primaryColor } from "../assets/colors";
import { Poppins } from "@/assets/fonts";
import { router, useLocalSearchParams } from "expo-router";

const ErrorModal = () => {
  const { error } = useLocalSearchParams();
  const { back } = router;
  return (
    <ModalLayout
      hideHeader
      contentContainerStyle={{
        alignItems: "center",
        gap: 10
      }}
    >
      <LottieView
        source={FailedLottieAnimation}
        autoPlay
        style={{
          width: 100,
          height: 100
        }}
      />
      <View
        style={{
          gap: 1
        }}
      >
        <TextComponent
          textAlign="center"
          style={{
            opacity: 0.6
          }}
        >
          Error occurred when processing request
        </TextComponent>
        <TextComponent fontFamily={Poppins.semiBold.default} textAlign="center">
          Reason: {error || "Unknown"}
        </TextComponent>
      </View>

      <TouchableOpacity
        onPress={back}
        style={{
          marginTop: 20
        }}
      >
        <TextComponent color={primaryColor.default}>Close</TextComponent>
      </TouchableOpacity>
    </ModalLayout>
  );
};

export default ErrorModal;

const styles = StyleSheet.create({});
