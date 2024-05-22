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
import { useFormContext } from "@/context";
import useUser from "@/hooks/useUser";
import { numberRegExp } from "@/utils/regex";
import { changePhoneNumberApi, resetPinApi } from "@/api/url";
import { processRequest } from "@/api/functions";

const ChangePhoneNumber = () => {
  const { push, back } = router;
  const { otp, setOTP } = useFormContext();
  const pathname = usePathname();
  const [pin, setPin] = useState("");
  const { userDetails, fetchUserDetails } = useUser();
  const [pinErr, setPinErr] = useState("");
  const [loading, setLoading] = useState(false);
  const processForm = useCallback(() => {
    const errors = validateValues(
      { pin },
      {
        pin: {
          required: {
            value: true,
            message: "Please provide your pin"
          },
          regex: {
            value: numberRegExp,
            message: "Please input a valid pin"
          }
        }
      }
    );

    if (errors) {
      setPinErr(errors?.pin);
    } else {
      if (otp) {
        setLoading(true);
        processRequest(resetPinApi, {
          newPin: pin,
          otp
        })
          .then(() => {
            back();
            push({
              pathname: ScreenNames.VerificationResponse.path,
              params: {
                description: "Pin reset successfully",
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
            setOTP("");
            setLoading(false);
          });
      } else {
        push({
          pathname: ScreenNames.VerifyOTP.path,
          params: {
            ...constructVerificationTypeObject(
              VerificationTypes.changePhoneNumber,
              undefined,
              userDetails?.phoneNumber
            ),
            shouldGoBack: "true"
          }
        });
      }
    }
  }, [pin, otp]);

  useEffect(() => {
    if (pathname === ScreenNames.ResetPin.path && otp) {
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
        value={pin}
        error={pinErr}
        onChangeText={(pin) => {
          if (numberRegExp.test(pin) && pin.length < 5) {
            setPin(pin);
          }
          setPinErr("");

          if (pin.length < 1) {
            setPin("");
          }
        }}
        secureTextEntry
        label="New pin"
        inputMode="numeric"
        keyboardType="phone-pad"
        placeholder="Input new pin"
      />

      <Button
        action={processForm}
        loading={loading}
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

export default ChangePhoneNumber;

const styles = StyleSheet.create({});
