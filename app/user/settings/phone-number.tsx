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
import { numberRegExp, phoneNumberRegExp2 } from "@/utils/regex";
import { changePhoneNumberApi } from "@/api/url";
import { processRequest } from "@/api/functions";
import useToast from "@/hooks/useToast";

const ChangePhoneNumber = () => {
  const { push, back } = router;
  const { otp, setOTP } = useFormContext();
  const pathname = usePathname();
  const [phoneNumber, setPhoneNumber] = useState("");
  const { userDetails, fetchUserDetails } = useUser();
  const { logoutUser } = useUser();
  const { show } = useToast();
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
          },
          minLength: {
            value: 11,
            message: "Please input a valid mobile number"
          },
          maxLength: {
            value: 11,
            message: "Please input a valid mobile number"
          }
        }
      }
    );

    if (errors) {
      setPhoneNumberErr(errors?.phoneNumber);
    } else {
      if (otp) {
        console.log({
          phoneNumber,
          otp
        });
        setLoading(true);
        processRequest(changePhoneNumberApi, {
          phoneNumber,
          otp
        })
          .then(() => {
            logoutUser();
            show("Please login again with your new phone number to continue");
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
              phoneNumber
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
        onChangeText={(phoneNumber) => {
          if (numberRegExp.test(phoneNumber) && phoneNumber.length < 12) {
            setPhoneNumber(phoneNumber);
          }
          setPhoneNumberErr("");

          if (phoneNumber.length < 1) {
            setPhoneNumber("");
          }
        }}
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
