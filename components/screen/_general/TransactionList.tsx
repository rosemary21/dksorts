import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import TransactionCard from "./TransactionCard";
import TextComponent from "@/components/_general/TextComponent";

const TransactionList: React.FC<{
  style?: ViewStyle;
  title?: string;
  showViewMore?: boolean;
  max?: number;
  invertColor?: boolean;
}> = ({ style, title, showViewMore, max, invertColor }) => {
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
          gap: 30
        }}
      >
        {new Array(20)
          .fill(0)
          .slice(0, max)
          .map((_, index) => (
            <TransactionCard invertColor={invertColor} key={index} />
          ))}
      </View>
    </View>
  );
};

export default TransactionList;

const styles = StyleSheet.create({});
