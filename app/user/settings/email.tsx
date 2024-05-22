import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import LoggedInContainer from "@/components/_layouts/LoggedInContainer";
import InputField from "@/components/_general/form/InputField";
import Button from "@/components/_general/Button";
import TextComponent from "@/components/_general/TextComponent";
import { whiteColor } from "../../../assets/colors";
import { router, usePathname } from "expo-router";
import {
  generalError,
  ScreenNames,
  VerificationResponseType,
  VerificationTypes
} from "@/utils/_variables";
import {
  constructVerificationTypeObject,
  showToast,
  validateValues
} from "@/utils/functions";
import { emailRegExp } from "@/utils/regex";
import { processRequest } from "@/api/functions";
import { changeEmailApi } from "@/api/url";
import { useFormContext } from "@/context";
import useUser from "@/hooks/useUser";

const ChangeEmail = () => {
  const { push, back } = router;
  const { otp, setOTP } = useFormContext();
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const { userDetails, fetchUserDetails } = useUser();
  const [emailErr, setEmailErr] = useState("");
  const [loading, setLoading] = useState(false);
  const processForm = useCallback(() => {
    const errors = validateValues(
      { email },
      {
        email: {
          required: {
            value: true,
            message: "Please provide your email"
          },
          regex: {
            value: emailRegExp,
            message: "Please input a valid email address"
          }
        }
      }
    );

    if (errors) {
      setEmailErr(errors?.email);
    } else {
      if (otp) {
        setLoading(true);
        processRequest(changeEmailApi, {
          emailAddress: email,
          otp
        })
          .then(() => {
            fetchUserDetails(() => {
              back();
              push({
                pathname: ScreenNames.VerificationResponse.path,
                params: {
                  description: "Email added successfully",
                  type: VerificationResponseType.success
                }
              });
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
            setOTP("");
            setLoading(false);
          });
      } else {
        push({
          pathname: ScreenNames.VerifyOTP.path,
          params: {
            ...constructVerificationTypeObject(
              VerificationTypes.changeEmail,
              userDetails?.email
            ),
            shouldGoBack: "true"
          }
        });
      }
    }
  }, [email, otp]);

  useEffect(() => {
    if (pathname === ScreenNames.ChangeEmail.path && otp) {
      processForm();
    }
  }, [otp, pathname]);
  return (
    <LoggedInContainer
      hideNav
      contentContainerStyle={{
        gap: 20
      }}
    >
      <InputField
        value={email}
        error={emailErr}
        onChangeText={(email) => {
          setEmail(email);
          setEmailErr("");
        }}
        label="Email"
        keyboardType="email-address"
        inputMode="email"
        placeholder="Input email"
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

export default ChangeEmail;

const styles = StyleSheet.create({});
