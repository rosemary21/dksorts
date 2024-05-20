import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import AuthLayout from "@/components/_layouts/AuthLayout";
import InputField from "@/components/_general/form/InputField";
import { router, useLocalSearchParams } from "expo-router";
import Button from "@/components/_general/Button";
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
import TextComponent from "@/components/_general/TextComponent";
import { whiteColor } from "@/assets/colors";
import { processRequest } from "@/api/functions";
import { useFormContext } from "@/context";
import { verifyNINApi } from "@/api/url";
import { numberRegExp } from "@/utils/regex";
import useUser from "@/hooks/useUser";

const NINVerification = () => {
  const { push, back } = router;
  const { shouldGoBack, nextScreenName } = useLocalSearchParams();
  const { emailAddress } = useFormContext();
  const [nin, setNin] = useState("");
  const { fetchUserDetails } = useUser();
  const [ninErr, setNinErr] = useState("");
  const [loading, setLoading] = useState(false);

  const processNIN = useCallback(() => {
    const errors = validateValues(
      { nin },
      {
        nin: {
          required: {
            value: true,
            message: "Please provide your NIN"
          },
          regex: {
            value: numberRegExp,
            message: "Please input a valid NIN"
          },
          minLength: {
            value: 11,
            message: "Please input a valid NIN"
          }
        }
      }
    );

    if (errors) {
      setNinErr(errors?.nin);
    } else {
      setLoading(true);
      processRequest(verifyNINApi, {
        emailAddress: emailAddress as string,
        number_nin: nin
      })
        .then((res) => {
          fetchUserDetails(() => {
            back();
            push({
              pathname: ScreenNames.VerificationResponse.path,
              params: {
                nextScreenName: shouldGoBack
                  ? undefined
                  : nextScreenName || ScreenNames.Login.path,
                description: "NIN Saved successfully",
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
          setLoading(false);
        });
    }
  }, [nin, emailAddress, shouldGoBack]);
  return (
    <AuthLayout
      title="NIN Verification"
      description="Please input your NIN to continue using this app"
    >
      <InputField
        value={nin}
        onChangeText={(pin) => {
          if (numberRegExp.test(pin) && pin.length < 12) {
            setNin(nin);
            setNinErr("");
          }
        }}
        error={ninErr}
        inputMode="numeric"
        keyboardType="phone-pad"
        placeholder="Your NIN number here"
      />

      <Button
        loading={loading}
        action={processNIN}
        type="primary"
        style={{
          alignItems: "center"
        }}
      >
        <TextComponent color={whiteColor.default}>Verify</TextComponent>
      </Button>
    </AuthLayout>
  );
};

export default NINVerification;

const styles = StyleSheet.create({});
