import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AuthLayout from "@/components/_layouts/AuthLayout";
import InputField from "@/components/_general/form/InputField";
import Button from "@/components/_general/Button";
import { primaryColor, whiteColor } from "@/assets/colors";
import TextComponent from "@/components/_general/TextComponent";
import { Link, router } from "expo-router";
import { ScreenNames, VerificationTypes } from "@/utils/_variables";
import { constructVerificationTypeObject } from "@/utils/functions";

const SignUp = () => {
  const { push } = router;
  return (
    <AuthLayout
      title="Hello user!"
      description="All we need is a little information from you to create an account for you"
      contentContainerStyle={{
        paddingBottom: 30
      }}
    >
      <InputField placeholder="Your full name" />
      <InputField
        keyboardType="email-address"
        inputMode="email"
        placeholder="Your email address"
      />
      <InputField
        keyboardType="phone-pad"
        inputMode="tel"
        placeholder="Your mobile number"
      />
      <InputField editable={false} placeholder="DD-MM-YYYY" />

      <InputField secureTextEntry placeholder="Your password" />
      <InputField secureTextEntry placeholder="Repeat password" />
      <Button
        action={() => {
          push({
            pathname: ScreenNames.VerifyOTP.path,
            params: {
              ...constructVerificationTypeObject(
                VerificationTypes.registration,
                "",
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
        <TextComponent color={whiteColor.default}>Sign up</TextComponent>
      </Button>

      <View
        style={{
          gap: 6
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 3
          }}
        >
          <TextComponent>Are you a new user?</TextComponent>
          <Link href={ScreenNames.Login.path}>
            <TextComponent color={primaryColor.default}>Login</TextComponent>
          </Link>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 3
          }}
        >
          <TextComponent>By signing up, you agree to our </TextComponent>
          <Link href={""}>
            <TextComponent color={primaryColor.default}>
              Privacy policy
            </TextComponent>
          </Link>
          <TextComponent>and our</TextComponent>
          <Link href={""}>
            <TextComponent color={primaryColor.default}>
              Terms and conditions
            </TextComponent>
          </Link>
        </View>
      </View>
    </AuthLayout>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
