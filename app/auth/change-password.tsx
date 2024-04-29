import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AuthLayout from "@/components/_layouts/AuthLayout";
import InputField from "@/components/_general/form/InputField";
import Button from "@/components/_general/Button";
import { ScreenNames, VerificationResponseType } from "@/utils/_variables";
import TextComponent from "@/components/_general/TextComponent";
import { whiteColor } from "@/assets/colors";
import { router } from "expo-router";

const ChangePassword = () => {
  const { push } = router;
  return (
    <AuthLayout
      title="Change password"
      description="Please provide a more simple password this time around"
    >
      <InputField secureTextEntry placeholder="New password" />
      <InputField secureTextEntry placeholder="Repeat new password" />
      <Button
        action={() => {
          push({
            pathname: ScreenNames.VerificationResponse.path,
            params: {
              nextScreenName: ScreenNames.Login.path,
              description: "Password change successfully",
              type: VerificationResponseType.success
            }
          });
        }}
        type="primary"
        style={{
          alignItems: "center"
        }}
      >
        <TextComponent color={whiteColor.default}>Save password</TextComponent>
      </Button>
    </AuthLayout>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({});
