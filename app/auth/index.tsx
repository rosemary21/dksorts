import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import TextComponent from "@/components/_general/TextComponent";
import InputField from "@/components/_general/form/InputField";
import Button from "@/components/_general/Button";
import { whiteColor } from "@/assets/colors";
import AuthLayout from "@/components/_layouts/AuthLayout";
import { Link, router } from "expo-router";
import { deviceDetails, generalError, ScreenNames } from "@/utils/_variables";
import { primaryColor } from "../../assets/colors";
import { LoginBodyType } from "@/api/index.d";
import { processRequest } from "@/api/functions";
import { loginApi } from "@/api/url";
import { showToast, validateValues } from "@/utils/functions";
import { phoneNumberRegExp } from "@/utils/regex";
import { saveUserToken } from "@/localServices/function";
import { useUserContext } from "@/context";
import { setHeaderAuthorization } from "@/api";

const Login = () => {
  const { push } = router;
  const initialFormValue: LoginBodyType = {
    deviceId: deviceDetails.osInternalBuildId || deviceDetails.osBuildId || "",
    deviceName: deviceDetails.name || "",
    password: "",
    phoneNumber: ""
  };
  const { setToken } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(initialFormValue);
  const [loginFormErr, setLoginFormErr] = useState(initialFormValue);
  const loginUser = useCallback(() => {
    const errors = validateValues(loginForm, {
      phoneNumber: {
        required: {
          value: true,
          message: "Please provide your mobile number"
        },
        regex: {
          value: phoneNumberRegExp,
          message: "Please input a valid number that starts with country code"
        }
      },
      password: {
        required: {
          value: true,
          message: "Please provide your password"
        }
      }
    });

    if (errors) {
      setLoginFormErr((prevState) => ({
        ...prevState,
        ...errors
      }));
    } else {
      setLoading(true);
      processRequest(loginApi, loginForm)
        .then((res) => {
          console.log(res);
          const token = res?.response?.data?.token;

          if (token) {
            saveUserToken(token);
            setToken(token);
            setHeaderAuthorization(token);
            showToast("Login successful");
          } else {
            push({
              pathname: ScreenNames.ErrorModal.path,
              params: {
                error: "Token not found"
              }
            });
            showToast("An unknown error occurred when login in");
          }

          // push(ScreenNames.Dashboard.path);
        })
        .catch((err) => {
          console.log(err);
          push({
            pathname: ScreenNames.ErrorModal.path,
            params: {
              error: err?.statusText
            }
          });
          showToast(err?.statusText || generalError);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [loginForm]);
  return (
    <AuthLayout
      title="Welcome back"
      description="Please input your details to login"
    >
      <InputField
        onChangeText={(phoneNumber) => {
          setLoginForm((prevState) => ({
            ...prevState,
            phoneNumber
          }));
          setLoginFormErr((prevState) => ({
            ...prevState,
            phoneNumber: ""
          }));
        }}
        error={loginFormErr.phoneNumber}
        value={loginForm.phoneNumber}
        inputMode="tel"
        keyboardType="phone-pad"
        placeholder="Your phone number"
      />
      <InputField
        onChangeText={(password) => {
          setLoginForm((prevState) => ({
            ...prevState,
            password
          }));
          setLoginFormErr((prevState) => ({
            ...prevState,
            password: ""
          }));
        }}
        error={loginFormErr.password}
        value={loginForm.password}
        secureTextEntry
        placeholder="Your password"
      />
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
        loading={loading}
        action={loginUser}
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
