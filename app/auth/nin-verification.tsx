import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AuthLayout from "@/components/_layouts/AuthLayout";
import InputField from "@/components/_general/form/InputField";
import { router } from "expo-router";
import Button from "@/components/_general/Button";
import {
  ScreenNames,
  VerificationResponseType,
  VerificationTypes
} from "@/utils/_variables";
import { constructVerificationTypeObject } from "@/utils/functions";
import TextComponent from "@/components/_general/TextComponent";
import { whiteColor } from "@/assets/colors";

const NINVerification = () => {
  const { push } = router;
  return (
    <AuthLayout
      title="NIN Verification"
      description="Please input your NIN to continue using this app"
    >
      <InputField placeholder="Your NIN number here" />

      <Button
        action={() => {
          push({
            pathname: ScreenNames.VerificationResponse.path,
            params: {
              nextScreenName: ScreenNames.Login.path,
              description: "NIN Saved successfully",
              type: VerificationResponseType.success
            }
          });
        }}
        type="primary"
        style={{
          alignItems: "center"
        }}
      >
        <TextComponent color={whiteColor.default}>Verify</TextComponent>
      </Button>
    </AuthLayout>
  );
};

export default NINVerification;

const styles = StyleSheet.create({});
