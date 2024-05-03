import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LoggedInContainer from "@/components/_layouts/LoggedInContainer";
import InputField from "@/components/_general/form/InputField";
import Button from "@/components/_general/Button";
import TextComponent from "@/components/_general/TextComponent";
import { whiteColor } from "../../../assets/colors";
import { router } from "expo-router";
import { ScreenNames, VerificationTypes } from "@/utils/_variables";
import { constructVerificationTypeObject } from "@/utils/functions";

const ChangeEmail = () => {
  const { push } = router;
  return (
    <LoggedInContainer
      hideNav
      contentContainerStyle={{
        gap: 20
      }}
    >
      <InputField
        label="Email"
        keyboardType="email-address"
        inputMode="email"
        placeholder="Input email"
      />

      <Button
        action={() => {
          push({
            pathname: ScreenNames.VerifyOTP.path,
            params: {
              ...constructVerificationTypeObject(
                VerificationTypes.changeEmail,
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
        <TextComponent color={whiteColor.default}>Change</TextComponent>
      </Button>
    </LoggedInContainer>
  );
};

export default ChangeEmail;

const styles = StyleSheet.create({});
