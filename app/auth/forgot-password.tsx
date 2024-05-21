import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View
} from "react-native";
import React, { useCallback, useState } from "react";
import AuthLayout from "@/components/_layouts/AuthLayout";
import InputField from "@/components/_general/form/InputField";
import Button from "@/components/_general/Button";
import TextComponent from "@/components/_general/TextComponent";
import { primaryColor, whiteColor } from "@/assets/colors";
import {
  generalError,
  ScreenNames,
  VerificationTypes
} from "@/utils/_variables";
import { Link, router } from "expo-router";
import {
  constructVerificationTypeObject,
  validateValues
} from "@/utils/functions";
import { useFormContext } from "@/context";
import { numberRegExp } from "@/utils/regex";
import { processRequest } from "@/api/functions";
import { checkPhoneNumberApi } from "@/api/url";
import useToast from "@/hooks/useToast";

const ForgotPassword = () => {
  const { push } = router;
  const { setPhoneNumber } = useFormContext();
  const [phone, setPhone] = useState("");
  const [phoneErr, setPhoneErr] = useState("");
  const [loading, setLoading] = useState(false);
  const { error } = useToast();

  const checkNumber = useCallback(() => {
    const errors = validateValues(
      { phone },
      {
        phone: {
          required: {
            value: true,
            message: "Please provide your mobile number"
          },
          regex: {
            value: numberRegExp,
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
      setPhoneErr(errors.phone);
    }

    if (!errors) {
      setLoading(true);
      processRequest(checkPhoneNumberApi, { phoneNumber: phone })
        .then(() => {
          setPhoneNumber(phone);
          setPhone("");
          push({
            pathname: ScreenNames.VerifyOTP.path,
            params: {
              ...constructVerificationTypeObject(
                VerificationTypes.forgotPassword,
                undefined,
                phone
              )
            }
          });
        })
        .catch((err) => {
          console.log(err);
          error(
            err?.response?.data?.resp?.message ??
              err?.statusText ??
              generalError
          );
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [phone]);
  return (
    <AuthLayout
      title="Forgot password"
      description="Forgot your password? Don't fret, because we got you covered. Input your mobile number below to reset your password"
    >
      <InputField
        onChangeText={setPhone}
        value={phone}
        error={phoneErr}
        placeholder="Your mobile number"
        inputMode="tel"
        keyboardType="phone-pad"
      />

      <Button
        action={checkNumber}
        loading={loading}
        type="primary"
        style={{
          alignItems: "center"
        }}
      >
        <TextComponent color={whiteColor.default}>Continue</TextComponent>
      </Button>

      <View
        style={{
          alignItems: "center",
          gap: 3,
          flexDirection: "row",
          justifyContent: "center",
          flexWrap: "wrap"
        }}
      >
        <TextComponent>Remember password?</TextComponent>
        <Link href={ScreenNames.Login.path}>
          <TextComponent color={primaryColor.default}>Login</TextComponent>
        </Link>
      </View>
    </AuthLayout>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({});
