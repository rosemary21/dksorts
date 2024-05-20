import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Redirect, Slot, usePathname } from "expo-router";
import { useUserContext } from "@/context";
import { ScreenNames } from "@/utils/_variables";

const AuthLayout = () => {
  const { token } = useUserContext();
  const pathname = usePathname();

  if (
    token &&
    pathname !== ScreenNames.VerifyOTP.path &&
    pathname !== ScreenNames.NINVerification.path
  ) {
    return <Redirect href={ScreenNames.Dashboard.path} />;
  }
  return (
    <>
      <Slot />
    </>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({});
