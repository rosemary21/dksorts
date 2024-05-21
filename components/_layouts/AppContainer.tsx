import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RootSiblingParent } from "react-native-root-siblings";
import { useFonts } from "expo-font";
import { Poppins } from "@/assets/fonts";
import * as SplashScreen from "expo-splash-screen";
import { useActionContext, useUserContext } from "@/context";
import { getUserToken } from "@/localServices/function";
import useUser from "@/hooks/useUser";
import Toast from "../_general/Toast";

SplashScreen.preventAutoHideAsync();

const AppContainer: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const { appLoaded, setAppLoaded } = useActionContext();
  const { setToken, token } = useUserContext();
  const { makeUseWithToken } = useUser();
  const [localServiceRan, setLocalServiceRan] = useState(false);
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
    (async () => {
      const token = await getUserToken();
      makeUseWithToken(token);
      setLocalServiceRan(true);
    })();
  }, []);

  useEffect(() => {
    if (localServiceRan && fontsLoaded) {
      setAppLoaded();
    }
  }, [localServiceRan, fontsLoaded]);

  useEffect(() => {
    if (appLoaded) {
      SplashScreen.hideAsync();
    }
  }, [appLoaded]);

  return (
    appLoaded && (
      <GestureHandlerRootView style={{ flex: 1 }}>
        {children}
        <Toast />
      </GestureHandlerRootView>
    )
  );
};

export default AppContainer;

const styles = StyleSheet.create({});
