import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import ModalLayout from "@/components/_layouts/ModalLayout";
import TextComponent from "@/components/_general/TextComponent";
import { backspaceText } from "@/utils/functions";
import {
  defaultIconProps,
  padding,
  pinKeys,
  windowHeight,
  windowWidth
} from "@/utils/_variables";
import CustomButton from "@/components/_general/CustomButton";
import { router } from "expo-router";
import { blackColor, primaryColor } from "@/assets/colors";

const RequestPin = () => {
  const [pin, setPin] = useState("");
  const { back } = router;

  useEffect(() => {
    if (pin.length === 4) {
      setPin("");
      back();
    }
  }, [pin]);

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
