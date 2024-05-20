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
import { phoneNumberRegExp2 } from "@/utils/regex";
import { changePhoneNumberApi } from "@/api/url";
import { processRequest } from "@/api/functions";

const ChangePhoneNumber = () => {
  const { push, back } = router;
  const { otp } = useFormContext();
  const pathname = usePathname();
  const [phoneNumber, setPhoneNumber] = useState("");
  const { userDetails } = useUser();
  const [phoneNumberErr, setPhoneNumberErr] = useState("");
  const [loading, setLoading] = useState(false);
  const processForm = useCallback(() => {
    const errors = validateValues(
      { phoneNumber },
      {
        phoneNumber: {
          required: {
            value: true,
            message: "Please provide your mobile number"
          },
          regex: {
            value: phoneNumberRegExp2,
            message: "Please input a valid mobile number"
          }
        }
      }
    );

    if (errors) {
      setPhoneNumberErr(errors?.phoneNumber);
    } else {
      if (otp) {
        setLoading(true);
        processRequest(changePhoneNumberApi, {
          phoneNumber: phoneNumber,
          otp
        })
          .then(() => {
            back();
            push({
              pathname: ScreenNames.VerificationResponse.path,
              params: {
                description: "phoneNumber added successfully",
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
      } else {
        push({
          pathname: ScreenNames.VerifyOTP.path,
          params: {
            ...constructVerificationTypeObject(
              VerificationTypes.changePhoneNumber,
              userDetails?.phoneNumber
            ),
            shouldGoBack: "true"
          }
        });
      }
    }
  }, [phoneNumber, otp]);

  useEffect(() => {
    if (pathname === ScreenNames.ChangePhoneNumber.path && otp) {
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
        value={phoneNumber}
        error={phoneNumberErr}
        onChangeText={setPhoneNumber}
        label="Phone number"
        inputMode="tel"
        keyboardType="phone-pad"
        placeholder="Input phone number"
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
