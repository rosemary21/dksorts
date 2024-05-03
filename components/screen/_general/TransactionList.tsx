import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import TransactionCard from "./TransactionCard";
import TextComponent from "@/components/_general/TextComponent";
import { blackColor } from "@/assets/colors";

const TransactionList: React.FC<{
  style?: ViewStyle;
  title?: string;
  showViewMore?: boolean;
  max?: number;
  invertColor?: boolean;
  showBorder?: boolean;
}> = ({ style, title, showViewMore, max, invertColor, showBorder }) => {
  return (
    <View
      style={{
        gap: 30,
        ...style
      }}
    >
      {title && <TextComponent>{title}</TextComponent>}
      <View
        style={{
          gap: showBorder ? 0 : 30
        }}
      >
        {new Array(20)
          .fill(0)
          .slice(0, max)
          .map((_, index) => (
            <TransactionCard
              style={{
                borderBottomWidth: showBorder && index + 1 !== 20 ? 1 : 0,
                borderColor: blackColor.opacity100,
                paddingVertical: showBorder ? 30 : 0
              }}
              invertColor={invertColor}
              key={index}
            />
          ))}
      </View>
    </View>
  );
};

export default TransactionList;

const styles = StyleSheet.create({});
