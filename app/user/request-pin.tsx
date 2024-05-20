import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import ModalLayout from "@/components/_layouts/ModalLayout";
import TextComponent from "@/components/_general/TextComponent";
import { backspaceText, showToast } from "@/utils/functions";
import {
  defaultIconProps,
  generalError,
  padding,
  pinKeys,
  ScreenNames,
  windowHeight,
  windowWidth
} from "@/utils/_variables";
import CustomButton from "@/components/_general/CustomButton";
import { router, useLocalSearchParams } from "expo-router";
import { blackColor, primaryColor } from "@/assets/colors";
import { useFormContext } from "@/context";
import useUser from "@/hooks/useUser";
import { processRequest } from "@/api/functions";
import { validatePinApi } from "@/api/url";

const RequestPin = () => {
  const [pin, setPin] = useState("");
  const { setPin: savePin } = useFormContext();
  const { userDetails } = useUser();
  const { back, push } = router;

  useEffect(() => {
    if (pin.length === 4) {
      processRequest(validatePinApi, { pin })
        .then((res) => {
          back();
          savePin(pin);
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
          setPin("");
        });
    }
  }, [pin]);

  useEffect(() => {
    if (!userDetails?.pinStatus) {
      push(ScreenNames.CreatePin.path);
    }
  }, [userDetails]);

  return (
    <ModalLayout
      title="Enter transaction pin"
      contentContainerStyle={{
        gap: 50
      }}
    >
      <TouchableOpacity
        style={{
          gap: ((windowWidth - padding * 2) * 0.2) / 3,
          flexDirection: "row",
          justifyContent: "center"
        }}
      >
        <View
          style={{
            ...styles.boxStyle
          }}
        >
          <TextComponent>{pin.slice(0, 1)}</TextComponent>
        </View>
        <View
          style={{
            ...styles.boxStyle
          }}
        >
          <TextComponent>{pin.slice(1, 2)}</TextComponent>
        </View>
        <View
          style={{
            ...styles.boxStyle
          }}
        >
          <TextComponent>{pin.slice(2, 3)}</TextComponent>
        </View>
        <View
          style={{
            ...styles.boxStyle
          }}
        >
          <TextComponent>{pin.slice(3, 4)}</TextComponent>
        </View>
      </TouchableOpacity>
      <View
        style={{
          minHeight: windowHeight * 0.5 - 100
        }}
      >
        {pinKeys.map((keyArr, index) => (
          <View
            key={index}
            style={{
              flex: 1 / 4,
              width: "100%",
              flexDirection: "row"
            }}
          >
            {keyArr.map(({ key, type, Icon, action }, index) =>
              key.length > 0 || Icon ? (
                <View
                  key={index}
                  style={{
                    flex: 1 / 3,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <CustomButton
                    hasBackground
                    onPress={(value) => {
                      if (action != "backspace") {
                        if (pin.length < 4) {
                          setPin((prevState) => `${prevState}${value}`);
                        }
                      } else {
                        const newPin = backspaceText(pin);
                        setPin(newPin);
                      }
                    }}
                    style={{}}
                    key={index}
                    letter={
                      type === "icon" && Icon ? (
                        <Icon {...defaultIconProps} />
                      ) : (
                        key
                      )
                    }
                  />
                </View>
              ) : (
                <TouchableOpacity
                  onPress={back}
                  style={{
                    flex: 1 / 3,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                  key={index}
                >
                  <TextComponent>Cancel</TextComponent>
                </TouchableOpacity>
              )
            )}
          </View>
        ))}
      </View>
    </ModalLayout>
  );
};

export default RequestPin;

const styles = StyleSheet.create({
  boxStyle: {
    width: ((windowWidth - padding * 2) * 0.8) / 4,
    height: ((windowWidth - padding * 2) * 0.8) / 4,
    maxWidth: 40,
    maxHeight: 40,
    backgroundColor: blackColor.opacity50,
    borderRadius: 10,
    // borderWidth: 1,
    // borderColor: primaryColor.default,
    alignItems: "center",
    justifyContent: "center"
  }
});
