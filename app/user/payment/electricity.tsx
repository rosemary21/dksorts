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
import SelectBox from "@/components/_general/form/SelectBox";

const ElectricityPayment = () => {
  const { back } = router;
  return (
    <LoggedInContainer
      hideNav
      contentContainerStyle={{
        gap: 20
      }}
    >
      <SelectBox
        data={[]}
        search={false}
        onChange={() => {}}
        setSelected={() => {}}
        placeholder="Select disco name"
        label="Disco name"
      />
      <InputField
        label="Meter number"
        placeholder="Your meter number"
        inputMode="numeric"
        keyboardType="phone-pad"
      />

      <SelectBox
        data={[]}
        search={false}
        onChange={() => {}}
        setSelected={() => {}}
        placeholder="Select meter type"
        label="Meter type"
      />
      <InputField
        label="Amount"
        placeholder="Input amount"
        inputMode="numeric"
        keyboardType="phone-pad"
      />

      <InputField
        label="Phone number"
        placeholder="Customer phone number"
        inputMode="tel"
        keyboardType="phone-pad"
      />

      <Button
        action={back}
        type="primary"
        style={{
          alignItems: "center"
        }}
      >
        <TextComponent color={whiteColor.default}>Pay</TextComponent>
      </Button>
    </LoggedInContainer>
  );
};

export default ElectricityPayment;

const styles = StyleSheet.create({});
