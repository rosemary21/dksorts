import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { SelectBoxType } from "@/utils/types";
import TextComponent from "../TextComponent";
import { blackColor, redColor, whiteColor } from "@/assets/colors";

const SelectBox: React.FC<SelectBoxType> = ({
  data,
  onChange,
  style,
  label,
  labelStyle,
  error,
  errorStyle,
  inputParentStyle,
  inputStyles,
  inputBorderColor,
  boxStyles,
  ...props
}) => {
  const [selected, setSelected] = useState("");
  const inputPadding = 15;

  useEffect(() => {
    if (onChange && typeof onChange === "function") {
      onChange(selected);
    }
  }, [selected]);
  return (
    <View
      style={{
        gap: 10,
        ...style
      }}
    >
      {label && (
        <TextComponent
          style={{
            ...labelStyle
          }}
        >
          {label}
        </TextComponent>
      )}
      <SelectList
        {...props}
        boxStyles={{
          borderWidth: 1,
          borderColor: error
            ? redColor.opacity400
            : inputBorderColor || whiteColor.opacity200,
          alignItems: "center",
          paddingVertical: 0,
          ...boxStyles
        }}
        inputStyles={{
          fontSize: 15,
          borderRadius: 10,
          paddingVertical: 25,
          // paddingLeft:  inputPadding,
          // paddingRight: inputPadding,
          flex: 1,
          color: whiteColor.default
        }}
        setSelected={(val: string) => setSelected(val)}
        data={data || []}
        save="value"
        dropdownTextStyles={{
          color: whiteColor.default
        }}
      />
      {error && typeof error !== "boolean" && (
        <TextComponent
          style={{
            color: redColor.opacity600,
            ...errorStyle
          }}
        >
          {error}
        </TextComponent>
      )}
    </View>
  );
};

export default SelectBox;

const styles = StyleSheet.create({});
