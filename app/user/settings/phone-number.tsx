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

const ChangePhoneNumber = () => {
  const { push } = router;
  return (
    <LoggedInContainer
      hideNav
      contentContainerStyle={{
        gap: 20
      }}
    >
      <InputField
        label="Phone number"
        inputMode="tel"
        keyboardType="phone-pad"
        placeholder="Input phone number"
      />

      <Button
        action={() => {
          push({
            pathname: ScreenNames.VerifyOTP.path,
            params: {
              ...constructVerificationTypeObject(
                VerificationTypes.changePhoneNumber,
                "",
                ""
              ),
              hideEmail: true
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

export default ChangePhoneNumber;

const styles = StyleSheet.create({});
