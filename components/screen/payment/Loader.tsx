import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { ApiLoadingLottieAnimation } from "@/assets/lotties";
import { windowHeight, windowWidth } from "@/utils/_variables";
import TextComponent from "@/components/_general/TextComponent";

const Loader = () => {
  return (
    <View
      style={{
        height: windowHeight - 250,
        width: windowWidth,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 4
      }}
    >
      <LottieView
        autoPlay
        loop
        source={ApiLoadingLottieAnimation}
        style={{
          width: 100,
          height: 100
        }}
      />
      <TextComponent
        style={{
          maxWidth: windowWidth * 0.7,
          opacity: 0.6
        }}
      >
        Fetching payment details...
      </TextComponent>
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({});
