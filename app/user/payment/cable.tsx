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

const CablePayment = () => {
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
        placeholder="Select cable name"
        label="Cable name"
      />
      <InputField
        label="Card number"
        placeholder="Smart card number / IUC number"
        inputMode="numeric"
        keyboardType="phone-pad"
      />

      <SelectBox
        data={[]}
        search={false}
        onChange={() => {}}
        setSelected={() => {}}
        placeholder="Select cable plan"
        label="Cable plan"
      />

      <Button
        action={back}
        type="primary"
        style={{
          alignItems: "center"
        }}
      >
        <TextComponent color={whiteColor.default}>Subscribe</TextComponent>
      </Button>
    </LoggedInContainer>
  );
};

export default CablePayment;

const styles = StyleSheet.create({});
