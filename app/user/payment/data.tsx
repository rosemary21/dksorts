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

const PurchaseData = () => {
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
        placeholder="Input phone number"
        inputMode="tel"
        keyboardType="phone-pad"
      />
      <SelectBox
        data={[]}
        search={false}
        onChange={() => {}}
        setSelected={() => {}}
        placeholder="Select Network"
        label="Network"
      />
      <SelectBox
        data={[]}
        search={false}
        onChange={() => {}}
        setSelected={() => {}}
        placeholder="Select data plan"
        label="Data plan"
      />

      <Button
        action={() => {}}
        type="primary"
        style={{
          alignItems: "center"
        }}
      >
        <TextComponent color={whiteColor.default}>Purchase</TextComponent>
      </Button>
    </LoggedInContainer>
  );
};

export default PurchaseData;

const styles = StyleSheet.create({});
