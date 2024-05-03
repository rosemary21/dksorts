import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LoggedInContainer from "@/components/_layouts/LoggedInContainer";
import InputField from "@/components/_general/form/InputField";
import Button from "@/components/_general/Button";
import TextComponent from "@/components/_general/TextComponent";
import { whiteColor } from "../../../assets/colors";
import { router } from "expo-router";

const ChangePin = () => {
  const { back } = router;
  return (
    <LoggedInContainer
      hideNav
      contentContainerStyle={{
        gap: 20
      }}
    >
      <InputField label="Old Pin" secureTextEntry placeholder="Input old pin" />
      <InputField label="New Pin" secureTextEntry placeholder="Input new pin" />
      <InputField
        label="Repeat Pin"
        secureTextEntry
        placeholder="Repeat new pin"
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

export default ChangePin;

const styles = StyleSheet.create({});
