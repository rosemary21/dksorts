import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AuthLayout from "@/components/_layouts/AuthLayout";
import InputField from "@/components/_general/form/InputField";
import Button from "@/components/_general/Button";
import TextComponent from "@/components/_general/TextComponent";
import { whiteColor } from "@/assets/colors";
import { ScreenNames, VerificationTypes } from "@/utils/_variables";
import { router } from "expo-router";
import { constructVerificationTypeObject } from "@/utils/functions";

const ForgotPassword = () => {
  const { push } = router;
  return (
    <AuthLayout
      title="Forgot password"
      description="Forgot your password? Don't fret, because we got you covered. Input your email below to reset your password"
    >
      <InputField
        placeholder="Your email address"
        inputMode="email"
        keyboardType="email-address"
      />

      <Button
        action={() => {
          push({
            pathname: ScreenNames.VerifyOTP.path,
            params: {
              ...constructVerificationTypeObject(
                VerificationTypes.forgotPassword,
                ""
              )
            }
          });
        }}
        type="primary"
        style={{
          alignItems: "center"
        }}
      >
        <TextComponent color={whiteColor.default}>Continue</TextComponent>
      </Button>
    </AuthLayout>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({});
