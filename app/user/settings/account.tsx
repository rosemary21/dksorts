import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import LoggedInContainer from "@/components/_layouts/LoggedInContainer";
import InputField from "@/components/_general/form/InputField";
import Button from "@/components/_general/Button";
import TextComponent from "@/components/_general/TextComponent";
import { whiteColor } from "../../../assets/colors";
import { router } from "expo-router";
import { ChangeProfileDetailsBodyType } from "@/api/index.d";
import { showToast, validateValues } from "@/utils/functions";
import { letterRegExp } from "@/utils/regex";
import { processRequest } from "@/api/functions";
import { changeProfileApi } from "@/api/url";
import {
  generalError,
  ScreenNames,
  VerificationResponseType
} from "@/utils/_variables";
import useUser from "@/hooks/useUser";

const ProfileInformation = () => {
  const { back } = router;
  let initialValue: ChangeProfileDetailsBodyType = {
    firstName: "",
    lastName: ""
  };

  const { push } = router;
  const [loading, setLoading] = useState(false);
  const [changeProfileForm, setChangeProfileForm] = useState(initialValue);
  const [changeProfileFormErr, setChangeProfileFormErr] =
    useState(initialValue);
  const { fetchUserDetails, userDetails } = useUser();
  const processForm = useCallback(() => {
    const errors = validateValues(changeProfileForm, {
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
      }
    });
    if (errors) {
      setChangeProfileFormErr((prevState) => ({
        ...prevState,
        ...errors
      }));
    } else {
      setLoading(true);
      processRequest(changeProfileApi, changeProfileForm)
        .then((res) => {
          back();
          push({
            pathname: ScreenNames.VerificationResponse.path,
            params: {
              description: "Profile details updated successfully",
              type: VerificationResponseType.success
            }
          });
          fetchUserDetails();
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
  }, [changeProfileForm]);
  return (
    <LoggedInContainer
      hideNav
      contentContainerStyle={{
        gap: 20
      }}
    >
      <InputField
        value={changeProfileForm?.firstName}
        error={changeProfileFormErr.firstName}
        onChangeText={(firstName) => {
          setChangeProfileForm((prevState) => ({
            ...prevState,
            firstName
          }));
          setChangeProfileFormErr((prevState) => ({
            ...prevState,
            firstName: ""
          }));
        }}
        label="First name"
        placeholder="Your full name"
      />
      <InputField
        value={changeProfileForm?.lastName}
        error={changeProfileFormErr.lastName}
        onChangeText={(lastName) => {
          setChangeProfileForm((prevState) => ({
            ...prevState,
            lastName
          }));
          setChangeProfileFormErr((prevState) => ({
            ...prevState,
            lastName: ""
          }));
        }}
        label="Last name"
        placeholder="Your full name"
      />

      <Button
        loading={loading}
        action={processForm}
        type="primary"
        style={{
          alignItems: "center"
        }}
      >
        <TextComponent color={whiteColor.default}>Save</TextComponent>
      </Button>
    </LoggedInContainer>
  );
};

export default ProfileInformation;

const styles = StyleSheet.create({});
