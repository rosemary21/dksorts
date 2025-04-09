import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Container from "@/components/_layouts/Container";
import LottieView from "lottie-react-native";
import { router, useLocalSearchParams } from "expo-router";
import TextComponent from "@/components/_general/TextComponent";
import { VerificationResponseType } from "@/utils/_variables";
import {
  FailedLottieAnimation,
  SuccessLottieAnimation
} from "@/assets/lotties";
import { greenColor, primaryColor } from "@/assets/colors";
import { Poppins } from "@/assets/fonts";
import Button from "@/components/_general/Button";
import { whiteColor } from "../assets/colors";

const VerificationResponse = () => {
  const { type, description, nextScreenName } = useLocalSearchParams();
  const { back, push } = router;
  return (
    <Container
      style={{
        alignItems: "center",
        justifyContent: "center",
        gap: 20
      }}
    >
      <LottieView
        autoPlay
        duration={4500}
        loop={false}
        source={
          type === VerificationResponseType.success
            ? SuccessLottieAnimation
            : FailedLottieAnimation
        }
        style={{
          width: 200,
          height: 200
        }}
      />
      <View
        style={{
          alignItems: "center",
          gap: 6
        }}
      >
        <TextComponent
          fontSize={20}
          fontFamily={Poppins.medium.default}
          //   color={
          //     type === VerificationResponseType.success
          //       ? greenColor.default
          //       : primaryColor.default
          //   }
        >
          {type}
        </TextComponent>
        <TextComponent
          textAlign="center"
          style={{
            opacity: 0.6
          }}
        >
          {description}
        </TextComponent>
      </View>

      <Button
        action={() => {
          if (nextScreenName) {
            back();
            push(nextScreenName as string);
          } else {
            back();
          }
        }}
        style={{
          width: "auto",
          paddingVertical: 10
        }}
      >
        <TextComponent color={whiteColor.default}>Continue</TextComponent>
      </Button>
    </Container>
  );
};

export default VerificationResponse;

const styles = StyleSheet.create({});
