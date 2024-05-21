import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import AuthLayout from "@/components/_layouts/AuthLayout";
import InputField from "@/components/_general/form/InputField";
import Button from "@/components/_general/Button";
import { blackColor, primaryColor, whiteColor } from "@/assets/colors";
import TextComponent from "@/components/_general/TextComponent";
import { Link, router } from "expo-router";
import {
  deviceDetails,
  generalError,
  screenHeight,
  ScreenNames,
  screenWidth,
  VerificationTypes
} from "@/utils/_variables";
import {
  constructVerificationTypeObject,
  showToast,
  validateValues
} from "@/utils/functions";
import { LoginResponseType, RegisterBodyType } from "@/api/index.d";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  emailRegExp,
  letterRegExp,
  passwordRegExp,
  phoneNumberRegExp
} from "@/utils/regex";
import { processRequest } from "@/api/functions";
import { signupApi } from "@/api/url";
import DatePicker from "react-native-modern-datepicker";
import moment from "moment";
import useUser from "@/hooks/useUser";
import useToast from "@/hooks/useToast";

const SignUp = () => {
  const { push } = router;
  const initialValue: RegisterBodyType = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    referred: "",
    longitude: "",
    dateOfBirth: "",
    latitude: "",
    password: "",
    confirmPassword: "",
    deviceId: deviceDetails.osInternalBuildId || "",
    mobileVersion: "",
    mobileOs: deviceDetails.osName || "",
    mobileOsVer: deviceDetails.osVersion || "",
    deviceName: deviceDetails.name || "",
    mobileVersionId: deviceDetails.osBuildId || ""
  };
  const [registerForm, setRegisterForm] = useState(initialValue);
  const [registerFormErr, setRegisterFormErr] = useState(initialValue);
  const { makeUseWithToken } = useUser();
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);
  const { error } = useToast();
  const processForm = useCallback(() => {
    const errors = validateValues(registerForm, {
      firstName: {
        required: {
          value: true,
          message: "Please provide your first name"
        },
        regex: {
          value: letterRegExp,
          message: "Please input a valid name"
        }
      },
      lastName: {
        required: {
          value: true,
          message: "Please provide your last name"
        },
        regex: {
          value: letterRegExp,
          message: "Please input a valid name"
        }
      },
      phoneNumber: {
        required: {
          value: true,
          message: "Please provide your phone number"
        },
        regex: {
          value: phoneNumberRegExp,
          message: "Please input a phone number"
        }
      },
      email: {
        required: {
          value: true,
          message: "Please provide your email"
        },
        regex: {
          value: emailRegExp,
          message: "Please input a valid email address"
        }
      },
      dateOfBirth: {
        required: {
          value: true,
          message: "Please provide your date of birth"
        }
      },
      password: {
        required: {
          value: true,
          message: "Please provide your password"
        },
        regex: {
          value: passwordRegExp,
          message:
            "Please your password must contain at least one uppercase letter, lowercase letter, one special character, one number and must be a minimum of 8 characters"
        }
      },
      confirmPassword: {
        required: {
          value: true,
          message: "Please provide your repeat your password"
        }
      }
    });

    if (errors) {
      setRegisterFormErr((prevState) => ({
        ...prevState,
        ...errors
      }));
    } else {
      const { password, confirmPassword } = registerForm;
      if (password !== confirmPassword) {
        setRegisterFormErr((prevState) => ({
          ...prevState,
          confirmPassword: "Please input a matching password"
        }));
      } else {
        setLoading(true);
        processRequest(signupApi, registerForm)
          .then((res) => {
            const response = res?.response as LoginResponseType;
            const token = response.data?.token;

            if (token) {
              makeUseWithToken(token);
              push({
                pathname: ScreenNames.VerifyOTP.path,
                params: {
                  ...constructVerificationTypeObject(
                    VerificationTypes.registration,
                    "",
                    ""
                  )
                }
              });
            } else {
              error("Token not found");
            }
          })
          .catch((err) => {
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
    }
  }, [registerForm]);
  useEffect(() => {
    const validDate = moment(selectedDate).format("DD/MM/YYYY");

    if (registerForm.dateOfBirth !== validDate) {
      setRegisterForm((prevState) => ({
        ...prevState,
        dateOfBirth: validDate
      }));
    }
  }, [selectedDate, registerForm.dateOfBirth]);
  return (
    <>
      <AuthLayout
        title="Hello user!"
        description="All we need is a little information from you to create an account for you"
        contentContainerStyle={{
          paddingBottom: 30
        }}
      >
        <InputField
          placeholder="Your first name"
          value={registerForm.firstName}
          error={registerFormErr.firstName}
          onChangeText={(firstName) => {
            setRegisterForm((prevState) => ({
              ...prevState,
              firstName
            }));

            setRegisterFormErr((prevState) => ({
              ...prevState,
              firstName: ""
            }));
          }}
        />
        <InputField
          placeholder="Your last name"
          value={registerForm.lastName}
          error={registerFormErr.lastName}
          onChangeText={(lastName) => {
            setRegisterForm((prevState) => ({
              ...prevState,
              lastName
            }));

            setRegisterFormErr((prevState) => ({
              ...prevState,
              lastName: ""
            }));
          }}
        />
        <InputField
          keyboardType="email-address"
          inputMode="email"
          placeholder="Your email address"
          value={registerForm.email}
          error={registerFormErr.email}
          onChangeText={(email) => {
            setRegisterForm((prevState) => ({
              ...prevState,
              email
            }));

            setRegisterFormErr((prevState) => ({
              ...prevState,
              email: ""
            }));
          }}
        />
        <InputField
          keyboardType="phone-pad"
          inputMode="tel"
          placeholder="Your mobile number"
          value={registerForm.phoneNumber}
          error={registerFormErr.phoneNumber}
          onChangeText={(phoneNumber) => {
            setRegisterForm((prevState) => ({
              ...prevState,
              phoneNumber
            }));

            setRegisterFormErr((prevState) => ({
              ...prevState,
              phoneNumber: ""
            }));
          }}
        />

        <View
          style={{
            gap: 6
          }}
        >
          <TouchableOpacity
            style={{
              paddingVertical: 25,
              borderWidth: 1,
              borderColor: blackColor.opacity200,
              borderRadius: 10,
              paddingHorizontal: 14
            }}
            onPress={() => {
              setOpenDate(true);
            }}
          >
            <TextComponent>{registerForm.dateOfBirth}</TextComponent>
          </TouchableOpacity>
        </View>

        <InputField
          secureTextEntry
          placeholder="Your password"
          value={registerForm.password}
          error={registerFormErr.password}
          onChangeText={(password) => {
            setRegisterForm((prevState) => ({
              ...prevState,
              password
            }));

            setRegisterFormErr((prevState) => ({
              ...prevState,
              password: ""
            }));
          }}
        />
        <InputField
          secureTextEntry
          placeholder="Repeat password"
          value={registerForm.confirmPassword}
          error={registerFormErr.confirmPassword}
          onChangeText={(confirmPassword) => {
            setRegisterForm((prevState) => ({
              ...prevState,
              confirmPassword
            }));

            setRegisterFormErr((prevState) => ({
              ...prevState,
              confirmPassword: ""
            }));
          }}
        />
        <Button
          loading={loading}
          action={processForm}
          type="primary"
          style={{
            alignItems: "center"
          }}
        >
          <TextComponent color={whiteColor.default}>Sign up</TextComponent>
        </Button>

        <View
          style={{
            gap: 6
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 3
            }}
          >
            <TextComponent>Are you a new user?</TextComponent>
            <Link href={ScreenNames.Login.path}>
              <TextComponent color={primaryColor.default}>Login</TextComponent>
            </Link>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 3
            }}
          >
            <TextComponent>By signing up, you agree to our </TextComponent>
            <Link href={""}>
              <TextComponent color={primaryColor.default}>
                Privacy policy
              </TextComponent>
            </Link>
            <TextComponent>and our</TextComponent>
            <Link href={""}>
              <TextComponent color={primaryColor.default}>
                Terms and conditions
              </TextComponent>
            </Link>
          </View>
        </View>
      </AuthLayout>
      {openDate && (
        <View
          style={{
            width: screenWidth,
            height: screenHeight,
            backgroundColor: blackColor.opacity300,
            top: 0,
            left: 0,
            position: "absolute",
            padding: 50,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setOpenDate(false);
            }}
            style={{
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,
              position: "absolute"
            }}
          ></TouchableOpacity>
          <DatePicker
            selected={moment(selectedDate).format("YYYY/MM/DD")}
            onSelectedChange={(date) => {
              const availableDate = new Date(date.replaceAll("/", "-")),
                formatedAvailableDate =
                  moment(availableDate).format("YYYY/MM/DD"),
                formatedSelectedDate =
                  moment(selectedDate).format("YYYY/MM/DD");
              if (formatedAvailableDate !== formatedSelectedDate) {
                setSelectedDate(availableDate);
                setOpenDate(false);
              }
            }}
            mode="calendar"
            options={{
              mainColor: primaryColor.default
            }}
            style={{
              borderRadius: 20
            }}
          />
        </View>
      )}
    </>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
