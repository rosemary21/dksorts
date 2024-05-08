import { StyleSheet } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { whiteColor } from "@/assets/colors";
import { useUserContext } from "@/context";
import { modalScreenOptions, ScreenNames } from "@/utils/_variables";

const ScreenStacks = () => {
  const { token } = useUserContext();
  return (
    <Stack
      initialRouteName={
        token ? ScreenNames.User.path : ScreenNames.GettingStarted.path
      }
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        contentStyle: {
          backgroundColor: whiteColor.default
        }
      }}
    >
      <Stack.Screen
        name={"error-modal"}
        options={{
          ...modalScreenOptions
        }}
      />
      {/* <Slot /> */}
    </Stack>
  );
};

export default ScreenStacks;

const styles = StyleSheet.create({});
