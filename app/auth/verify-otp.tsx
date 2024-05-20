import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import AuthLayout from "@/components/_layouts/AuthLayout";
import InputField from "@/components/_general/form/InputField";
import TextComponent from "@/components/_general/TextComponent";
import { greenColor, primaryColor, whiteColor } from "@/assets/colors";
import {
  defaultIconProps,
  generalError,
  ScreenNames,
  VerificationTypes
} from "@/utils/_variables";
import Button from "@/components/_general/Button";
import { ArrowRight, Verify } from "iconsax-react-native";
import { processRequest } from "@/api/functions";
import { sendOTPApi, verifyEmailApi, verifyOTPApi } from "@/api/url";
import { RequestOTPBodyType } from "@/api/index.d";
import { showToast } from "@/utils/functions";
import { useFormContext } from "@/context";
import LottieView from "lottie-react-native";
import { BalanceLoader } from "@/assets/lotties";
import useUser from "@/hooks/useUser";
import { numberRegExp } from "@/utils/regex";

const OTPVerification = () => {
  const {
    verificationType,
    email,
    phone,
    hideEmail,
    shouldGoBack,
    nextScreenName
  } = useLocalSearchParams();
  const { fetchUserDetails } = useUser();
  const { setOTP } = useFormContext();
  const [emailCodeSent, setEmailCodeSent] = useState(false);
  const [emailCodeVerified, setEmailCodeVerified] = useState(false);
  const [emailCode, setEmailCode] = useState("");
  const [phoneCodeSent, setPhoneCodeSent] = useState(false);
  const [phoneCodeVerified, setPhoneCodeVerified] = useState(false);
  const [phoneCode, setPhoneCode] = useState("");
  const [codeSending, setCodeSending] = useState(false);
  const [loading, setLoading] = useState(false);
  const { push, back } = router;
  const initialValue: RequestOTPBodyType = {
    otpId: "",
    otpType: "R",
    notificationType: "M",
    sendSource: ""
  };
  let pathname = ScreenNames.Login.path;

  switch (verificationType) {
    case VerificationTypes.forgotPassword:
      pathname = ScreenNames.ChangePassword.path;

      initialValue.otpType = "F";
      break;
    case VerificationTypes.registration:
      pathname = ScreenNames.NINVerification.path;
      initialValue.otpType = "R";
      break;
    case VerificationTypes.changeEmail:
      pathname = ScreenNames.Account.path;
      break;
    case VerificationTypes.changePhoneNumber:
      pathname = ScreenNames.Account.path;
      break;
    default:
      break;
  }

  const sendCode = (type: "phone" | "email") => {
    const data: RequestOTPBodyType = {
      ...initialValue,
      otpId: (type === "phone" ? phone : email) as string,
      sendSource: (type === "phone" ? phone : email) as string
    };
    setCodeSending(true);
    processRequest(sendOTPApi, data)
      .then((res) => {
        if (type === "phone") {
          setPhoneCodeSent(true);
        } else {
          setEmailCodeSent(true);
        }
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
        setCodeSending(false);
      });
  };

  const authenticateCode = (type: "phone" | "email") => {
    setCodeSending(true);
    processRequest(verifyOTPApi, {
      otp: type === "phone" ? phoneCode : emailCode,
      otpId: (type === "phone" ? phone : email) as string
    })
      .then(() => {
        if (type === "phone") {
          setPhoneCodeVerified(true);
        } else {
          setEmailCodeVerified(true);
        }
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
        setCodeSending(false);
      });
  };
  const processOTP = useCallback(async () => {
    if (verificationType === VerificationTypes.registration) {
      try {
        setLoading(true);
        const verifyEmail = processRequest(verifyEmailApi, {
          emailAddress: email as string,
          otp: emailCode,
          phoneNumber: phone as string
        });
        const verifyPhone = processRequest(verifyEmailApi, {
          emailAddress: email as string,
          otp: phoneCode,
          phoneNumber: phone as string
        });

        const promises = await Promise.all([verifyEmail, verifyPhone]);

        if (promises) {
          fetchUserDetails(() => {
            back();

            if (!shouldGoBack) {
              push((nextScreenName as string) || pathname);
            }
          });
        }
      } catch (error: any) {
        setLoading(false);
        let err = "";

        if (error?.statusText || error?.response?.data) {
          err = error?.response?.data?.resp?.message ?? error?.statusText;
        }

        push({
          pathname: ScreenNames.ErrorModal.path,
          params: {
            error: err
          }
        });
        showToast(err || generalError);
      }
    } else {
      let otp = "";
      if (verificationType === VerificationTypes.changeEmail) {
        otp = emailCode;
      } else {
        otp = phoneCode;
      }
      setOTP(otp);
    }
  }, [
    phone,
    nextScreenName,
    email,
    phoneCode,
    emailCode,
    verificationType,
    shouldGoBack,
    setOTP
  ]);
  return (
    <AuthLayout
      title="Verification"
      description="Please verify your account to proceed"
    >
      {!hideEmail && (
        <InputField
          editable={emailCodeSent || emailCodeVerified ? false : true}
          onChangeText={(code) => {
            if (numberRegExp.test(code) && code.length < 5) {
              setEmailCode(code);
            }
          }}
          label={`Email (${email})`}
          inputMode="numeric"
          keyboardType="phone-pad"
          placeholder={emailCodeSent ? "Input OTP" : "Click send code"}
          rightIcon={
            !emailCodeVerified ? (
              !codeSending ? (
                <TouchableOpacity
                  onPress={() => {
                    if (!codeSending && !emailCodeVerified) {
                      if (!emailCodeSent) {
                        sendCode("email");
                      } else {
                        if (emailCode.length > 0) {
                          authenticateCode("email");
                        } else {
                          sendCode("email");
                        }
                      }
                    }
                  }}
                >
                  <TextComponent
                    color={
                      emailCodeSent && emailCode.length > 0
                        ? greenColor.default
                        : primaryColor.default
                    }
                  >
                    {emailCodeSent
                      ? emailCode.length > 0
                        ? "Verify Code"
                        : "Resend Code (30s)"
                      : "Send Code"}
                  </TextComponent>
                </TouchableOpacity>
              ) : (
                <View
                  style={{
                    width: 60,
                    height: 20,
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden"
                  }}
                >
                  <LottieView
                    source={BalanceLoader}
                    autoPlay
                    loop
                    style={{
                      width: 250,
                      height: 250
                    }}
                  />
                </View>
              )
            ) : (
              <Verify variant="Bold" color={greenColor.default} />
            )
          }
        />
      )}
      {(verificationType === VerificationTypes.registration || phone) && (
        <InputField
          editable={phoneCodeSent || phoneCodeVerified}
          onChangeText={(code) => {
            if (numberRegExp.test(code) && code.length < 5) {
              setPhoneCode(code);
            }
          }}
          label={`Phone (${phone})`}
          inputMode="numeric"
          keyboardType="phone-pad"
          value={phoneCode}
          placeholder={phoneCodeSent ? "Input OTP" : "Click send code"}
          rightIcon={
            !phoneCodeVerified ? (
              !codeSending ? (
                <TouchableOpacity
                  onPress={() => {
                    if (!codeSending && !phoneCodeVerified) {
                      if (!emailCodeSent) {
                        sendCode("phone");
                      } else {
                        if (emailCode.length > 0) {
                          authenticateCode("phone");
                        } else {
                          sendCode("phone");
                        }
                      }
                    }
                  }}
                >
                  <TextComponent
                    color={
                      phoneCodeSent && phoneCode.length > 0
                        ? greenColor.default
                        : primaryColor.default
                    }
                  >
                    {phoneCodeSent
                      ? phoneCode.length > 0
                        ? "Verify Code"
                        : "Resend Code (30s)"
                      : "Send Code"}
                  </TextComponent>
                </TouchableOpacity>
              ) : (
                <View
                  style={{
                    width: 60,
                    height: 20,
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden"
                  }}
                >
                  <LottieView
                    source={BalanceLoader}
                    autoPlay
                    loop
                    style={{
                      width: 250,
                      height: 250
                    }}
                  />
                </View>
              )
            ) : (
              <Verify variant="Bold" color={greenColor.default} />
            )
          }
        />
      )}
      {((verificationType === VerificationTypes.registration &&
        phoneCodeVerified &&
        emailCodeVerified) ||
        (verificationType !== VerificationTypes.registration &&
          (emailCodeVerified || phoneCodeVerified))) && (
        <Button
          loading={loading}
          action={processOTP}
          type="primary"
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
            gap: 3
          }}
        >
          <TextComponent color={whiteColor.default}>Continue</TextComponent>
          <ArrowRight {...defaultIconProps} color={whiteColor.default} />
        </Button>
      )}
    </AuthLayout>
  );
};

export default OTPVerification;

const styles = StyleSheet.create({});
