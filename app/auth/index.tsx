import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TextComponent from "@/components/_general/TextComponent";
import InputField from "@/components/_general/form/InputField";
import Button from "@/components/_general/Button";
import { whiteColor } from "@/assets/colors";
import AuthLayout from "@/components/_layouts/AuthLayout";
import { Link, router } from "expo-router";
import { ScreenNames } from "@/utils/_variables";
import { primaryColor } from "../../assets/colors";

const Login = () => {
  const { push } = router;
  return (
    <AuthLayout
      title="Welcome back"
      description="Please input your details to login"
    >
      <InputField placeholder="Your email address" />
      <InputField secureTextEntry placeholder="Your password" />
      <View
        style={{
          alignItems: "flex-end"
        }}
      >
        <Link href={ScreenNames.ForgotPassword.path}>
          <TextComponent color={primaryColor.default}>
            Forgot password?
          </TextComponent>
        </Link>
      </View>
      <Button
        action={() => {
          push(ScreenNames.Dashboard.path);
        }}
        type="primary"
        style={{
          alignItems: "center"
        }}
      >
        <TextComponent color={whiteColor.default}>Login</TextComponent>
      </Button>

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
        <Link href={ScreenNames.Register.path}>
          <TextComponent color={primaryColor.default}>Sign up</TextComponent>
        </Link>
      </View>
    </AuthLayout>
  );
};

export default Login;

const styles = StyleSheet.create({});
