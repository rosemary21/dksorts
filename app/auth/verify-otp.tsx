import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import AuthLayout from "@/components/_layouts/AuthLayout";
import InputField from "@/components/_general/form/InputField";
import TextComponent from "@/components/_general/TextComponent";
import { greenColor, primaryColor, whiteColor } from "@/assets/colors";
import {
  defaultIconProps,
  generalError,
  ScreenNames,
  VerificationResponseType,
  VerificationTypes
} from "@/utils/_variables";
import Button from "@/components/_general/Button";
import { ArrowRight, Verify } from "iconsax-react-native";
import { processRequest } from "@/api/functions";
import {
  sendOTPApi,
  verifyEmailApi,
  verifyOTPApi,
  verifyPhoneNumberApi
} from "@/api/url";
import { RequestOTPBodyType } from "@/api/index.d";
import { showToast } from "@/utils/functions";
import { useFormContext } from "@/context";
import LottieView from "lottie-react-native";
import { BalanceLoader } from "@/assets/lotties";
import useUser from "@/hooks/useUser";
import { numberRegExp } from "@/utils/regex";
import useToast from "@/hooks/useToast";

const OTPVerification = () => {
  const {
    verificationType,
    email,
    phone,
    hideEmail,
    shouldGoBack,
    nextScreenName
  } = useLocalSearchParams();
  const { fetchUserDetails, userDetails } = useUser();
  const { setOTP } = useFormContext();
  const [emailCodeSent, setEmailCodeSent] = useState(false);
  const [emailCodeVerified, setEmailCodeVerified] = useState(false);
  const [emailCode, setEmailCode] = useState("");
  const [phoneCodeSent, setPhoneCodeSent] = useState(false);
  const [phoneCodeVerified, setPhoneCodeVerified] = useState(false);
  const [phoneCode, setPhoneCode] = useState("");
  const [codeSending, setCodeSending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [codeType, setCodeType] = useState<"phone" | "email" | null>();
  const { error, show } = useToast();

  const { push, back } = router;
  const initialValue: RequestOTPBodyType = {
    otpId: "",
    otpType: "R",
    notificationType: "M",
    sendSource: ""
  };
  let pathname = ScreenNames.Login.path;
  const emailRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);

  const focusOnEmail = () => {
    const input = emailRef.current;

    if (input) {
      input?.focus;
    }
  };
  const focusOnPhone = () => {
    const input = phoneRef.current;

    if (input) {
      input?.focus;
    }
  };

  // push({
  //               pathname: ScreenNames.VerificationResponse.path,
  //               params: {
  //                 nextScreenName: shouldGoBack
  //                   ? undefined
  //                   : nextScreenName || ScreenNames.Login.path,
  //                 description: "NIN Saved successfully",
  //                 type: VerificationResponseType.success
  //               }
  //             });

  switch (verificationType) {
    case VerificationTypes.forgotPassword:
      pathname = ScreenNames.ChangePassword.path;
      break;
    case VerificationTypes.registration:
      pathname = ScreenNames.VerificationResponse.path;
      break;
    case VerificationTypes.changeEmail:
      pathname = ScreenNames.Account.path;
      break;
    case VerificationTypes.changePhoneNumber:
      pathname = ScreenNames.Account.path;
      break;
    case VerificationTypes.resetPin:
      pathname = "";
      break;
    default:
      break;
  }

  const sendCode = (type: "phone" | "email") => {
    const data: RequestOTPBodyType = {
      ...initialValue,
      otpId: (type === "phone" ? phone : email) as string,
      sendSource: (type === "phone" ? phone : email) as string,
      notificationType: type === "phone" ? "S" : "M"
    };
    setCodeType(type);
    processRequest(sendOTPApi, data)
      .then((res) => {
        show(
          `OTP sent to your ${
            type === "phone" ? "phone number" : "email"
          } successfully`
        );
        if (type === "phone") {
          setPhoneCodeSent(true);
          setTimeout(() => {
            focusOnPhone();
          }, 500);
        } else {
          setEmailCodeSent(true);
          setTimeout(() => {
            focusOnEmail();
          }, 500);
        }
      })
      .catch((err) => {
        error(
          err?.response?.data?.resp?.message ?? err?.statusText ?? generalError
        );
      })
      .finally(() => {
        setCodeType(null);
      });
  };

  const authenticateCode = (type: "phone" | "email") => {
    setCodeType(type);
    processRequest(verifyOTPApi, {
      otp: type === "phone" ? phoneCode : emailCode,
      otpId: (type === "phone" ? phone : email) as string
    })
      .then(() => {
        show(
          `${
            type === "phone" ? "Phone number" : "Email"
          } OTP Verified successfully`
        );
        if (type === "phone") {
          setPhoneCodeVerified(true);
        } else {
          setEmailCodeVerified(true);
        }
      })
      .catch((err) => {
        if (type === "phone") {
          setPhoneCode("");
        } else {
          setEmailCode("");
        }
        error(
          err?.response?.data?.resp?.message ?? err?.statusText ?? generalError
        );
      })
      .finally(() => {
        setCodeType(null);
      });
  };
  const processOTP = useCallback(async () => {
    if (verificationType === VerificationTypes.registration) {
      try {
        setLoading(true);
        const verifyEmail = email
          ? processRequest(verifyEmailApi, {
              emailAddress: email as string,
              otp: emailCode,
              phoneNumber: (phone ?? userDetails?.phoneNumber) as string
            })
          : undefined;

        const verifyPhone = processRequest(verifyPhoneNumberApi, {
          emailAddress: (email ?? userDetails?.email) as string,
          otp: phoneCode,
          phoneNumber: phone as string
        });

        const [verifiedEmail, verifiedPhoneNumber] = await Promise.all(
          [verifyEmail, verifyPhone].filter((promise) => promise)
        );
        console.log(verifiedEmail, verifiedPhoneNumber);
        if (
          (phone && email && verifiedEmail && verifiedPhoneNumber) ||
          (phone && verifiedEmail) ||
          (email && verifiedEmail)
        ) {
          fetchUserDetails(() => {
            back();

            if (!shouldGoBack) {
              push({
                pathname: (nextScreenName as string) || pathname,
                params: {
                  nextScreenName: shouldGoBack
                    ? undefined
                    : nextScreenName || ScreenNames.Login.path,
                  description: "OTP Verified successfully",
                  type: VerificationResponseType.success
                }
              });
            }
          });
        }
      } catch (erro: any) {
        setLoading(false);
        let err = "";

        if (erro?.statusText || erro?.response?.data) {
          err = erro?.response?.data?.resp?.message ?? erro?.statusText;
        }

        error(err ?? generalError);
      }
    } else {
      let otp = "";
      if (verificationType === VerificationTypes.changeEmail) {
        otp = emailCode;
      } else {
        otp = phoneCode;
      }
      setOTP(otp);

      back();
      if (!shouldGoBack && (pathname.length > 0 || nextScreenName)) {
        push((nextScreenName as string) || pathname);
      }
    }
  }, [
    phone,
    nextScreenName,
    email,
    phoneCode,
    emailCode,
    verificationType,
    shouldGoBack,
    userDetails,
    setOTP
  ]);
  return (
    <AuthLayout
      title="Verification"
      description="Please verify your account to proceed"
    >
      {email && (
        <InputField
          value={emailCode}
          ref={emailRef}
          editable={!emailCodeSent || emailCodeVerified ? false : true}
          onChangeText={(code) => {
            if (code.length > 0 && numberRegExp.test(code) && code.length < 7) {
              setEmailCode(code);
            }

            if (code.length < 1) {
              setEmailCode("");
            }
          }}
          label={`Email (${email})`}
          inputMode="numeric"
          keyboardType="phone-pad"
          placeholder={emailCodeSent ? "Input OTP" : "Click send code"}
          rightIcon={
            !emailCodeVerified ? (
              codeType !== "email" ? (
                <TouchableOpacity
                  onPress={() => {
                    if (!codeType && !emailCodeVerified) {
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
                        : "Resend code"
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
      {phone && (
        <InputField
          ref={phoneRef}
          editable={!phoneCodeSent || phoneCodeVerified ? false : true}
          onChangeText={(code) => {
            if (code.length > 0 && numberRegExp.test(code) && code.length < 7) {
              setPhoneCode(code);
            }
            if (code.length < 1) {
              setPhoneCode("");
            }
          }}
          label={`Phone (${phone})`}
          inputMode="numeric"
          keyboardType="phone-pad"
          value={phoneCode}
          placeholder={phoneCodeSent ? "Input OTP" : "Click send code"}
          rightIcon={
            !phoneCodeVerified ? (
              codeType !== "phone" ? (
                <TouchableOpacity
                  onPress={() => {
                    if (!codeType && !phoneCodeVerified) {
                      if (!phoneCodeSent) {
                        sendCode("phone");
                      } else {
                        if (phoneCode.length > 0) {
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
                        : "Resend code"
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
      {((phone && email && phoneCodeVerified && emailCodeVerified) ||
        (phone && !email && phoneCodeVerified) ||
        (email && !phone && emailCodeVerified)) && (
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
