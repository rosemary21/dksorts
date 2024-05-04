import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import AuthLayout from "@/components/_layouts/AuthLayout";
import InputField from "@/components/_general/form/InputField";
import TextComponent from "@/components/_general/TextComponent";
import { greenColor, primaryColor, whiteColor } from "@/assets/colors";
import {
  defaultIconProps,
  ScreenNames,
  VerificationTypes
} from "@/utils/_variables";
import Button from "@/components/_general/Button";
import { ArrowRight } from "iconsax-react-native";

const OTPVerification = () => {
  const { verificationType, email, phone, hideEmail } = useLocalSearchParams();
  const [emailCodeSent, setEmailCodeSent] = useState(false);
  const [emailCode, setEmailCode] = useState("");
  const [phoneCodeSent, setPhoneCodeSent] = useState(false);
  const [phoneCode, setPhoneCode] = useState("");
  const { push } = router;
  let pathname = ScreenNames.Login.path;

  switch (verificationType) {
    case VerificationTypes.forgotPassword:
      pathname = ScreenNames.ChangePassword.path;
      break;
    case VerificationTypes.registration:
      pathname = ScreenNames.NINVerification.path;
      break;
    case VerificationTypes.changeEmail:
      pathname = ScreenNames.ChangeEmail.path;
      break;
    case VerificationTypes.changePhoneNumber:
      pathname = ScreenNames.ChangePhoneNumber.path;
      break;
    default:
      break;
  }
  return (
    <AuthLayout
      title="Verification"
      description="Please verify your account to proceed"
    >
      {!hideEmail && (
        <InputField
          editable={emailCodeSent}
          onChangeText={(code) => {
            setEmailCode(code);
          }}
          label={`Email (${email})`}
          inputMode="numeric"
          keyboardType="phone-pad"
          placeholder={emailCodeSent ? "Input OTP" : "Click send code"}
          rightIcon={
            <TouchableOpacity
              onPress={() => {
                setEmailCodeSent(true);
              }}
            >
              <TextComponent
                color={
                  emailCodeSent && emailCode.length > 0
                    ? greenColor.default
                    : primaryColor.default
                }
              >
                {emailCodeSent
                  ? emailCode.length > 0
                    ? "Verify Code"
                    : "Resend Code (30s)"
                  : "Send Code"}
              </TextComponent>
            </TouchableOpacity>
          }
        />
      )}
      {(verificationType === VerificationTypes.registration || phone) && (
        <InputField
          editable={phoneCodeSent}
          onChangeText={(code) => {
            setPhoneCode(code);
          }}
          label={`Phone (${phone})`}
          inputMode="numeric"
          keyboardType="phone-pad"
          value={phoneCode}
          placeholder={phoneCodeSent ? "Input OTP" : "Click send code"}
          rightIcon={
            <TouchableOpacity
              onPress={() => {
                setPhoneCodeSent(true);
              }}
            >
              <TextComponent
                color={
                  phoneCodeSent && phoneCode.length > 0
                    ? greenColor.default
                    : primaryColor.default
                }
              >
                {phoneCodeSent
                  ? phoneCode.length > 0
                    ? "Verify Code"
                    : "Resend Code (30s)"
                  : "Send Code"}
              </TextComponent>
            </TouchableOpacity>
          }
        />
      )}
      <Button
        action={() => {
          push({
            pathname
          });
        }}
        type="primary"
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
          gap: 3
        }}
      >
        <TextComponent color={whiteColor.default}>Continue</TextComponent>
        <ArrowRight {...defaultIconProps} color={whiteColor.default} />
      </Button>
    </AuthLayout>
  );
};

export default OTPVerification;

const styles = StyleSheet.create({});
