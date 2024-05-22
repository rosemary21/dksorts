import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import ModalLayout from "@/components/_layouts/ModalLayout";
import Button from "@/components/_general/Button";
import TextComponent from "@/components/_general/TextComponent";
import { blackColor, primaryColor, redColor } from "@/assets/colors";
import { whiteColor } from "../../../assets/colors";
import { Poppins } from "@/assets/fonts";
import InputField from "@/components/_general/form/InputField";
import { router } from "expo-router";
import { showToast, validateValues } from "@/utils/functions";
import { numberRegExp } from "@/utils/regex";
import { processRequest } from "@/api/functions";
import { getBVNApi, verifyBVNApi } from "@/api/url";
import DatePicker from "react-native-modern-datepicker";
import {
  generalError,
  screenHeight,
  ScreenNames,
  screenWidth,
  VerificationResponseType,
  windowWidth
} from "@/utils/_variables";
import useUser from "@/hooks/useUser";
import moment from "moment";
import useToast from "@/hooks/useToast";
import { BVNDataType, GetBVNResponseType } from "@/api/index.d";

const GenerateWallet = () => {
  const { back, push } = router;
  const [bvn, setBvn] = useState("");
  const [dob, setDob] = useState("");
  const [dobErr, setDobErr] = useState("");
  const [bvnErr, setBvnErr] = useState("");
  const [bvnPhoneNumber, setBvnPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpErr, setOtpErr] = useState("");
  const { fetchUserDetails, userDetails } = useUser();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);
  const { error } = useToast();

  const processForm = useCallback(() => {
    const errors = validateValues(
      { bvn },
      {
        bvn: {
          required: {
            value: true,
            message: "Please provide your BVN"
          },
          regex: {
            value: numberRegExp,
            message: "Please input a valid BVN"
          },
          minLength: {
            value: 11,
            message: "Please input a valid BVN"
          }
        }
      }
    );
    const todaysDate = moment(new Date()).format("DD-MMM-YYYY");

    if (todaysDate === dob) {
      setDobErr("Please input a valid date of birth");
    }

    if (errors) {
      setBvnErr(errors.bvn);
    }

    if (!errors && todaysDate !== dob) {
      setLoading(true);
      processRequest(getBVNApi, { bvn })
        .then((res) => {
          const response = res?.response as GetBVNResponseType & BVNDataType;
          const bvnPhoneNumber = response?.data?.data?.phoneNumber;
          const bvnDOB = response?.data?.data?.dateOfBirth;

          if (bvnDOB !== dob) {
            error("Invalid BVN information");
          } else {
            setBvnPhoneNumber(bvnPhoneNumber);
          }
        })
        .catch((err) => {
          error(err?.response?.data?.resp?.message ?? err?.statusText);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [bvn, userDetails, dob]);

  const processOTP = useCallback(() => {
    const verifyBvnBodyType = {
      bvn,
      bvnPhoneNumber,
      dob,
      otp
    };

    if (otp.length === 6) {
      setLoading(true);
      processRequest(verifyBVNApi, verifyBvnBodyType)
        .then((res) => {
          fetchUserDetails(() => {
            back();
            push({
              pathname: ScreenNames.VerificationResponse.path,
              params: {
                nextScreenName: !userDetails?.pinStatus
                  ? ScreenNames.CreatePin.path
                  : undefined,
                description: `BVN added successfully`,
                type: VerificationResponseType.success
              }
            });
          });
        })
        .catch((err) => {
          error(err?.response?.data?.resp?.message ?? err?.statusText);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    if (otp.length !== 6) {
      setOtpErr("Please input valid OTP");
    }
  }, [bvnPhoneNumber, otp, bvn, dob, userDetails]);
  useEffect(() => {
    const validDate = moment(selectedDate).format("DD-MMM-YYYY");

    if (dob !== validDate) {
      setDob(validDate);
      setDobErr("");
    }
  }, [selectedDate, dob]);
  return (
    <>
      <ModalLayout
        removeAutoClose
        hideHeader
        style={{
          alignItems: "center",
          justifyContent: "center"
        }}
        contentContainerStyle={{
          width: "90%",
          borderRadius: 30,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          gap: 30
        }}
      >
        <TextComponent
          fontFamily={
            bvnPhoneNumber ? Poppins.medium.default : Poppins.semiBold.default
          }
        >
          {bvnPhoneNumber
            ? "Input the code sent to the phone number attached to your BVN to continue"
            : "Input your BVN to continue"}
        </TextComponent>

        {bvnPhoneNumber.length < 1 && (
          <>
            <InputField
              keyboardType="phone-pad"
              inputMode="numeric"
              value={bvn}
              onChangeText={(bvn) => {
                if (
                  bvn.length > 0 &&
                  numberRegExp.test(bvn) &&
                  bvn.length < 12
                ) {
                  setBvn(bvn);
                }
                setBvnErr("");

                if (bvn.length < 1) {
                  setBvn("");
                }
              }}
              error={bvnErr}
              placeholder="Your BVN"
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
                  borderColor: dobErr
                    ? redColor.opacity600
                    : blackColor.opacity200,
                  borderRadius: 10,
                  paddingHorizontal: 14
                }}
                onPress={() => {
                  setOpenDate(true);
                }}
              >
                <TextComponent
                  style={{
                    opacity: 0.6
                  }}
                  fontSize={12}
                >
                  Click to change (DOB: {dob})
                </TextComponent>
              </TouchableOpacity>
              {dobErr && (
                <TextComponent
                  style={{
                    color: redColor.opacity600
                  }}
                >
                  {dobErr}
                </TextComponent>
              )}
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 20
              }}
            >
              <Button
                action={back}
                type="transparent"
                style={{
                  ...styles.buttonStyle,
                  backgroundColor: blackColor.opacity100
                }}
              >
                <TextComponent textAlign="center">Cancel</TextComponent>
              </Button>
              <Button
                loading={loading}
                action={processForm}
                type="primary"
                style={{
                  ...styles.buttonStyle
                }}
              >
                <TextComponent color={whiteColor.default} textAlign="center">
                  Save
                </TextComponent>
              </Button>
            </View>
          </>
        )}

        {bvnPhoneNumber.length > 0 && (
          <>
            <InputField
              value={otp}
              error={otpErr}
              placeholder="Input OTP"
              keyboardType="phone-pad"
              inputMode="numeric"
              onChangeText={(code) => {
                if (
                  code.length > 0 &&
                  numberRegExp.test(code) &&
                  code.length < 7
                ) {
                  setOtp(code);
                }

                if (code.length < 1) {
                  setOtp("");
                }
              }}
              editable={!loading}
            />
            <Button type="primary" loading={loading} action={processOTP}>
              <TextComponent color={whiteColor.default} textAlign="center">
                Verify
              </TextComponent>
            </Button>
          </>
        )}
      </ModalLayout>

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

export default GenerateWallet;

const styles = StyleSheet.create({
  buttonStyle: {
    width: (windowWidth * 0.9 - 30 * 2) * 0.45,
    paddingVertical: 15,
    borderRadius: 10
  }
});
