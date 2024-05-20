import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import ModalLayout from "@/components/_layouts/ModalLayout";
import Button from "@/components/_general/Button";
import TextComponent from "@/components/_general/TextComponent";
import { blackColor } from "@/assets/colors";
import { whiteColor } from "../../../assets/colors";
import { Poppins } from "@/assets/fonts";
import InputField from "@/components/_general/form/InputField";
import { router } from "expo-router";
import { showToast, validateValues } from "@/utils/functions";
import { numberRegExp } from "@/utils/regex";
import { processRequest } from "@/api/functions";
import { addBVNApi } from "@/api/url";
import {
  generalError,
  ScreenNames,
  VerificationResponseType
} from "@/utils/_variables";
import useUser from "@/hooks/useUser";

const GenerateWallet = () => {
  const { back, push } = router;
  const [bvn, setBvn] = useState("");
  const [bvnErr, setBvnErr] = useState("");
  const [loading, setLoading] = useState(false);
  const { fetchUserDetails, userDetails } = useUser();

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

    if (errors) {
      setBvnErr(errors.bvn);
    } else {
      setLoading(true);
      processRequest(addBVNApi, { bvn })
        .then((res) => {
          fetchUserDetails();
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
  }, [bvn, userDetails]);
  return (
    <ModalLayout
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
      <TextComponent fontFamily={Poppins.semiBold.default}>
        Input your BVN to continue
      </TextComponent>

      <InputField
        value={bvn}
        onChangeText={setBvn}
        error={bvnErr}
        placeholder="Your BVN"
      />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
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
    </ModalLayout>
  );
};

export default GenerateWallet;

const styles = StyleSheet.create({
  buttonStyle: {
    flex: 1 / 2
  }
});
