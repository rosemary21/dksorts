import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LoggedInContainer from "@/components/_layouts/LoggedInContainer";
import InputField from "@/components/_general/form/InputField";
import Button from "@/components/_general/Button";
import TextComponent from "@/components/_general/TextComponent";
import { whiteColor } from "../../../assets/colors";
import { router } from "expo-router";

const ChangePassword = () => {
  const { back } = router;
  return (
    <LoggedInContainer
      hideNav
      contentContainerStyle={{
        gap: 20
      }}
    >
      <InputField
        label="Old Password"
        secureTextEntry
        placeholder="Input old password"
      />
      <InputField
        label="New Password"
        secureTextEntry
        placeholder="Input new password"
      />
      <InputField
        label="Repeat Password"
        secureTextEntry
        placeholder="Repeat new password"
      />

      <Button
        action={back}
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

export default ChangePassword;

const styles = StyleSheet.create({});
