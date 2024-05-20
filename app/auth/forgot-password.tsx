import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View
} from "react-native";
import React, { useState } from "react";
import AuthLayout from "@/components/_layouts/AuthLayout";
import InputField from "@/components/_general/form/InputField";
import Button from "@/components/_general/Button";
import TextComponent from "@/components/_general/TextComponent";
import { primaryColor, whiteColor } from "@/assets/colors";
import { ScreenNames, VerificationTypes } from "@/utils/_variables";
import { Link, router } from "expo-router";
import { constructVerificationTypeObject } from "@/utils/functions";
import { useFormContext } from "@/context";

const ForgotPassword = () => {
  const { push } = router;
  const { setPhoneNumber } = useFormContext();
  const [phone, setPhone] = useState("");
  return (
    <AuthLayout
      title="Forgot password"
      description="Forgot your password? Don't fret, because we got you covered. Input your mobile number below to reset your password"
    >
      <InputField
        placeholder="Your mobile number"
        inputMode="tel"
        keyboardType="phone-pad"
      />

      <Button
        action={() => {
          push({
            pathname: ScreenNames.VerifyOTP.path,
            params: {
              ...constructVerificationTypeObject(
                VerificationTypes.forgotPassword,
                undefined,
                phone
              )
            }
          });
        }}
        type="primary"
        style={{
          alignItems: "center"
        }}
      >
        <TextComponent color={whiteColor.default}>Continue</TextComponent>
      </Button>

      <View
        style={{
          alignItems: "center",
          gap: 3,
          flexDirection: "row",
          justifyContent: "center",
          flexWrap: "wrap"
        }}
      >
        <TextComponent>Remember password?</TextComponent>
        <Link href={ScreenNames.Login.path}>
          <TextComponent color={primaryColor.default}>Login</TextComponent>
        </Link>
      </View>
    </AuthLayout>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({});
