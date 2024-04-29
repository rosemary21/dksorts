import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { primaryColor } from "@/assets/colors";
import { CheckIcon } from "@/assets/icons";
import { CheckBoxType } from "@/utils/types";
import TextComponent from "../TextComponent";

const Checkbox: React.FC<CheckBoxType> = ({
  size = 20,
  checked = false,
  onChange = (value: boolean) => {},
  oneWay,
  style,
  label,
  labelStyle,
  labelProps,
  borderColor = primaryColor.default,
  checkBoxColor,
  checkBoxActiveBackground = "transparent",
  checkBoxUnActiveBackground = "transparent",
}) => {
  const [check, setCheck] = useState<boolean>(checked || false);
  useEffect(() => {
    if (oneWay) {
      setCheck(checked);
    }
  }, [checked]);

  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        ...style,
      }}
      onPress={() => {
        if (!oneWay) {
          setCheck((prevState) => !prevState);
          onChange(check);
        }
      }}
    >
      <View
        style={{
          width: size,
          height: size,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 5,
          borderWidth: 1,
          borderColor,
          backgroundColor: checked
            ? checkBoxActiveBackground
            : checkBoxUnActiveBackground,
        }}
      >
        {checked ? (
          <CheckIcon size={size * 0.9} color={checkBoxColor || borderColor} />
        ) : null}
      </View>
      {label && (
        <TextComponent
          {...labelProps}
          style={{
            ...labelStyle,
          }}
        >
          {label}
        </TextComponent>
      )}
    </TouchableOpacity>
  );
};

export default Checkbox;

const styles = StyleSheet.create({});
