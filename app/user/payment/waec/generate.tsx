import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LoggedInContainer from "@/components/_layouts/LoggedInContainer";
import InputField from "@/components/_general/form/InputField";
import Button from "@/components/_general/Button";
import TextComponent from "@/components/_general/TextComponent";
import { router } from "expo-router";
import { ScreenNames, VerificationTypes } from "@/utils/_variables";
import { constructVerificationTypeObject } from "@/utils/functions";
import SelectBox from "@/components/_general/form/SelectBox";
import ModalLayout from "@/components/_layouts/ModalLayout";
import { Poppins } from "@/assets/fonts";
import { whiteColor } from "@/assets/colors";

const GeneratePin = () => {
  const { back } = router;
  return (
    <ModalLayout
      style={{
        alignItems: "center",
        justifyContent: "center"
      }}
      hideHeader
      contentContainerStyle={{
        width: "90%",
        borderRadius: 30,
        gap: 20
      }}
    >
      <View>
        <TextComponent
          textAlign="center"
          fontFamily={Poppins.semiBold.default}
          fontSize={20}
        >
          Generate WAEC pin
        </TextComponent>
        <TextComponent
          textAlign="center"
          style={{
            opacity: 0.6
          }}
        >
          Are you sure you want to deduct{" "}
          <TextComponent fontFamily={Poppins.bold.default}>3900</TextComponent>{" "}
          from your account for the generation of Waec pin?
        </TextComponent>
      </View>
      <View
        style={{
          gap: 10,
          flexDirection: "row"
        }}
      >
        <Button
          action={back}
          type="primary"
          style={{
            ...styles.buttonStyle
          }}
        >
          <TextComponent textAlign="center" color={whiteColor.default}>
            Cancel
          </TextComponent>
        </Button>
        <Button
          style={{
            ...styles.buttonStyle
          }}
        >
          <TextComponent textAlign="center" color={whiteColor.default}>
            Generate
          </TextComponent>
        </Button>
      </View>
    </ModalLayout>
  );
};

export default GeneratePin;

const styles = StyleSheet.create({
  buttonStyle: {
    flex: 1 / 2,
    width: "auto"
  }
});
