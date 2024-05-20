import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import AuthLayout from "@/components/_layouts/AuthLayout";
import InputField from "@/components/_general/form/InputField";
import Button from "@/components/_general/Button";
import {
  generalError,
  ScreenNames,
  VerificationResponseType
} from "@/utils/_variables";
import TextComponent from "@/components/_general/TextComponent";
import { whiteColor } from "@/assets/colors";
import { router } from "expo-router";
import { useFormContext } from "@/context";
import { showToast, validateValues } from "@/utils/functions";
import { passwordRegExp } from "@/utils/regex";
import { processRequest } from "@/api/functions";
import { resetPasswordApi } from "@/api/url";

const ChangePassword = () => {
  const { push, back } = router;
  const { otp, phoneNumber, setOTP, setPhoneNumber } = useFormContext();
  const initialValue = {
    newPassword: "",
    repeatNewPassword: "",
    phoneNumber: phoneNumber as string,
    otp: otp as string
  };
  const [resetPasswordForm, setResetPasswordForm] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const [resetPasswordFormErr, setResetPasswordFormErr] =
    useState(initialValue);

  const processForm = useCallback(() => {
    const errors = validateValues(resetPasswordForm, {
      newPassword: {
        required: {
          value: true,
          message: "Please input your password"
        },
        regex: {
          value: passwordRegExp,
          message:
            "Please your password must contain at least one uppercase letter, lowercase letter, one special character, one number and must be a minimum of 8 characters"
        }
      },
      repeatNewPassword: {
        required: {
          value: true,
          message: "Please repeat your password"
        }
      }
    });

    if (errors) {
      setResetPasswordFormErr((prevState) => ({
        ...prevState,
        ...errors
      }));
    } else {
      const { repeatNewPassword, newPassword } = resetPasswordForm;
      const { repeatNewPassword: _, ...data } = resetPasswordForm;

      if (repeatNewPassword !== newPassword) {
        setResetPasswordFormErr((prevState) => ({
          ...prevState,
          repeatNewPassword: "Password doesn't match"
        }));
      } else {
        setLoading(true);
        processRequest(resetPasswordApi, data)
          .then((res) => {
            setOTP("");
            setPhoneNumber("");
            back();
            push({
              pathname: ScreenNames.VerificationResponse.path,
              params: {
                nextScreenName: ScreenNames.Login.path,
                description: "Password change successfully",
                type: VerificationResponseType.success
              }
            });
          })
          .catch((err) => {
            push({
              pathname: ScreenNames.ErrorModal.path,
              params: {
                error: err?.response?.data?.resp?.message ?? err?.statusText
              }
            });
            showToast(err?.statusText || generalError);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  }, [resetPasswordForm]);
  return (
    <AuthLayout
      title="Change password"
      description="Please provide a more simple password this time around"
    >
      <InputField
        value={resetPasswordForm.newPassword}
        error={resetPasswordFormErr.newPassword}
        onChangeText={(newPassword) => {
          setResetPasswordForm((prevState) => ({
            ...prevState,
            newPassword
          }));
          setResetPasswordFormErr((prevState) => ({
            ...prevState,
            newPassword: ""
          }));
        }}
        secureTextEntry
        placeholder="New password"
      />
      <InputField
        value={resetPasswordForm.repeatNewPassword}
        error={resetPasswordFormErr.repeatNewPassword}
        onChangeText={(repeatNewPassword) => {
          setResetPasswordForm((prevState) => ({
            ...prevState,
            repeatNewPassword
          }));
          setResetPasswordFormErr((prevState) => ({
            ...prevState,
            repeatNewPassword: ""
          }));
        }}
        secureTextEntry
        placeholder="Repeat new password"
      />
      <Button
        action={processForm}
        loading={loading}
        type="primary"
        style={{
          alignItems: "center"
        }}
      >
        <TextComponent color={whiteColor.default}>Save password</TextComponent>
      </Button>
    </AuthLayout>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({});
