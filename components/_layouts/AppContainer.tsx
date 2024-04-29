import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RootSiblingParent } from "react-native-root-siblings";
import { useFonts } from "expo-font";
import { Poppins } from "@/assets/fonts";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const AppContainer: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [fontsLoaded] = useFonts({
    [Poppins.regular
      .default]: require("@/assets/fonts/Poppins/Poppins-Regular.ttf"),
    [Poppins.regular
      .italics]: require("@/assets/fonts/Poppins/Poppins-Italic.ttf"),
    [Poppins.bold.default]: require("@/assets/fonts/Poppins/Poppins-Bold.ttf"),
    [Poppins.bold
      .italics]: require("@/assets/fonts/Poppins/Poppins-BoldItalic.ttf"),
    [Poppins.semiBold
      .default]: require("@/assets/fonts/Poppins/Poppins-SemiBold.ttf"),
    [Poppins.semiBold
      .italics]: require("@/assets/fonts/Poppins/Poppins-SemiBoldItalic.ttf"),
    [Poppins.medium
      .default]: require("@/assets/fonts/Poppins/Poppins-Medium.ttf"),
    [Poppins.medium
      .italics]: require("@/assets/fonts/Poppins/Poppins-MediumItalic.ttf"),
    [Poppins.black
      .default]: require("@/assets/fonts/Poppins/Poppins-Black.ttf"),
    [Poppins.black
      .italics]: require("@/assets/fonts/Poppins/Poppins-BlackItalic.ttf"),
    [Poppins.extraBold
      .default]: require("@/assets/fonts/Poppins/Poppins-ExtraBold.ttf"),
    [Poppins.extraBold
      .italics]: require("@/assets/fonts/Poppins/Poppins-ExtraBoldItalic.ttf")
  });

  useEffect(() => {
    if (fontsLoaded) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return (
    fontsLoaded && (
      <RootSiblingParent>
        <GestureHandlerRootView style={{ flex: 1 }}>
          {children}
        </GestureHandlerRootView>
      </RootSiblingParent>
    )
  );
};

export default AppContainer;

const styles = StyleSheet.create({});
