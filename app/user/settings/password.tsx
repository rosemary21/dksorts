import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import LoggedInContainer from "@/components/_layouts/LoggedInContainer";
import InputField from "@/components/_general/form/InputField";
import Button from "@/components/_general/Button";
import TextComponent from "@/components/_general/TextComponent";
import { whiteColor } from "../../../assets/colors";
import { router } from "expo-router";
import { ChangePasswordBodyType } from "@/api/index.d";
import { showToast, validateValues } from "@/utils/functions";
import { passwordRegExp } from "@/utils/regex";
import { processRequest } from "@/api/functions";
import { changePasswordApi } from "@/api/url";
import {
  generalError,
  ScreenNames,
  VerificationResponseType
} from "@/utils/_variables";

const ChangePassword = () => {
  const { back, push } = router;

  const initialValue: ChangePasswordBodyType = {
    newPassword: "",
    oldPassword: "",
    confirmPassword: ""
  };
  const [changePasswordForm, setChangePasswordForm] = useState(initialValue);
  const [changePasswordFormErr, setChangePasswordFormErr] =
    useState(initialValue);
  const [loading, setLoading] = useState(false);
  const processForm = useCallback(() => {
    const errors = validateValues(changePasswordForm, {
      newPassword: {
        required: {
          value: true,
          message: "Please provide your new password"
        },
        regex: {
          value: passwordRegExp,
          message:
            "Please your password must contain at least one uppercase letter, lowercase letter, one special character, one number and must be a minimum of 8 characters"
        }
      },
      oldPassword: {
        required: {
          value: true,
          message: "Please provide your old password"
        }
      },
      confirmPassword: {
        required: {
          value: true,
          message: "Please repeat your password"
        }
      }
    });
    if (errors) {
      setChangePasswordFormErr((prevState) => ({
        ...prevState,
        ...errors
      }));
    } else {
      const { newPassword, confirmPassword } = changePasswordForm;
      if (newPassword !== confirmPassword) {
        setChangePasswordFormErr((prevState) => ({
          ...prevState,
          confirmPassword: "Password doesn't match"
        }));
      }

      if (newPassword === confirmPassword) {
        setLoading(true);
        processRequest(changePasswordApi, changePasswordForm)
          .then((res) => {
            back();
            push({
              pathname: ScreenNames.VerificationResponse.path,
              params: {
                description: "Profile details updated successfully",
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
  }, [changePasswordForm]);
  return (
    <LoggedInContainer
      hideNav
      contentContainerStyle={{
        gap: 20
      }}
    >
      <InputField
        value={changePasswordForm.oldPassword}
        error={changePasswordFormErr.oldPassword}
        onChangeText={(oldPassword) => {
          setChangePasswordForm((prevState) => ({
            ...prevState,
            oldPassword
          }));
          setChangePasswordFormErr((prevState) => ({
            ...prevState,
            oldPassword: ""
          }));
        }}
        label="Old Password"
        secureTextEntry
        placeholder="Input old password"
      />
      <InputField
        value={changePasswordForm.newPassword}
        error={changePasswordFormErr.newPassword}
        onChangeText={(newPassword) => {
          setChangePasswordForm((prevState) => ({
            ...prevState,
            newPassword
          }));
          setChangePasswordFormErr((prevState) => ({
            ...prevState,
            newPassword: ""
          }));
        }}
        label="New Password"
        secureTextEntry
        placeholder="Input new password"
      />
      <InputField
        value={changePasswordForm.confirmPassword}
        error={changePasswordFormErr.confirmPassword}
        onChangeText={(confirmPassword) => {
          setChangePasswordForm((prevState) => ({
            ...prevState,
            confirmPassword
          }));
          setChangePasswordFormErr((prevState) => ({
            ...prevState,
            confirmPassword: ""
          }));
        }}
        label="Repeat Password"
        secureTextEntry
        placeholder="Repeat new password"
      />

      <Button
        loading={loading}
        action={processForm}
        type="primary"
        style={{
          alignItems: "center"
        }}
      >
        <TextComponent color={whiteColor.default}>Change</TextComponent>
      </Button>
    </LoggedInContainer>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({});
