import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import LoggedInContainer from "@/components/_layouts/LoggedInContainer";
import InputField from "@/components/_general/form/InputField";
import Button from "@/components/_general/Button";
import TextComponent from "@/components/_general/TextComponent";
import { whiteColor } from "../../../assets/colors";
import { router } from "expo-router";
import { ChangePinBodyType } from "@/api/index.d";
import { processRequest } from "@/api/functions";
import { changePinApi } from "@/api/url";
import { showToast, validateValues } from "@/utils/functions";
import { numberRegExp } from "@/utils/regex";
import {
  generalError,
  ScreenNames,
  VerificationResponseType
} from "@/utils/_variables";

const ChangePin = () => {
  const { back, push } = router;
  const initialValue: ChangePinBodyType & { repeatNewPin: string } = {
    newPin: "",
    oldPin: "",
    repeatNewPin: ""
  };
  const [changePinForm, setChangePinForm] = useState(initialValue);
  const [changePinFormErr, setChangePinFormErr] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const processForm = useCallback(() => {
    const errors = validateValues(changePinForm, {
      newPin: {
        required: {
          value: true,
          message: "Please provide your new pin"
        },
        regex: {
          value: numberRegExp,
          message: "Your pin must be only number"
        }
      },
      oldPin: {
        required: {
          value: true,
          message: "Please provide your old pin"
        },
        regex: {
          value: numberRegExp,
          message: "Your pin must be only number"
        }
      },
      repeatNewPin: {
        required: {
          value: true,
          message: "Please repeat your pin"
        }
      }
    });
    if (errors) {
      setChangePinFormErr((prevState) => ({
        ...prevState,
        ...errors
      }));
    } else {
      const { newPin, repeatNewPin } = changePinForm;
      const { repeatNewPin: _, ...pinForm } = changePinForm;
      if (newPin !== repeatNewPin) {
        setChangePinFormErr((prevState) => ({
          ...prevState,
          repeatNewPin: "Pin doesn't match"
        }));
      }

      if (newPin === repeatNewPin) {
        setLoading(true);
        processRequest(changePinApi, pinForm)
          .then((res) => {
            back();
            push({
              pathname: ScreenNames.VerificationResponse.path,
              params: {
                description: "Profile details updated successfully",
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
      }
    }
  }, [changePinForm]);
  return (
    <LoggedInContainer
      hideNav
      contentContainerStyle={{
        gap: 20
      }}
    >
      <InputField
        value={changePinForm.oldPin}
        error={changePinFormErr.oldPin}
        onChangeText={(oldPin) => {
          if (numberRegExp.test(oldPin) && oldPin.length < 5) {
            setChangePinForm((prevState) => ({
              ...prevState,
              oldPin
            }));
            setChangePinFormErr((prevState) => ({
              ...prevState,
              oldPin: ""
            }));
          }
        }}
        label="Old Pin"
        secureTextEntry
        placeholder="Input old pin"
      />
      <InputField
        value={changePinForm.newPin}
        error={changePinFormErr.newPin}
        onChangeText={(newPin) => {
          if (numberRegExp.test(newPin) && newPin.length < 5) {
            setChangePinForm((prevState) => ({
              ...prevState,
              newPin
            }));
            setChangePinFormErr((prevState) => ({
              ...prevState,
              newPin: ""
            }));
          }
        }}
        label="New Pin"
        secureTextEntry
        placeholder="Input new pin"
      />
      <InputField
        value={changePinForm.repeatNewPin}
        error={changePinFormErr.repeatNewPin}
        onChangeText={(repeatNewPin) => {
          if (numberRegExp.test(repeatNewPin) && repeatNewPin.length < 5) {
            setChangePinForm((prevState) => ({
              ...prevState,
              repeatNewPin
            }));
            setChangePinFormErr((prevState) => ({
              ...prevState,
              repeatNewPin: ""
            }));
          }
        }}
        label="Repeat Pin"
        secureTextEntry
        placeholder="Repeat new pin"
      />

      <Button
        loading={loading}
        action={processForm}
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

export default ChangePin;

const styles = StyleSheet.create({});
