import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import TransactionCard from "./TransactionCard";
import TextComponent from "@/components/_general/TextComponent";
import { blackColor } from "@/assets/colors";
import useUser from "@/hooks/useUser";
import LottieView from "lottie-react-native";
import { ApiLoadingLottieAnimation } from "@/assets/lotties";

const TransactionList: React.FC<{
  style?: ViewStyle;
  title?: string;
  showViewMore?: boolean;
  max?: number;
  invertColor?: boolean;
  showBorder?: boolean;
}> = ({ style, title, showViewMore, max, invertColor, showBorder }) => {
  const { transactions, userDetails } = useUser();
  return (
    <View
      style={{
        gap: 30,
        ...style
      }}
    >
      {title && <TextComponent>{title}</TextComponent>}

      {transactions ? (
        <View
          style={{
            gap: showBorder ? 0 : 30
          }}
        >
          {transactions
            .slice(0, max)
            .map(({ amount, type, timeTransaction }, index) => (
              <TransactionCard
                description={type}
                amount={amount}
                timeTransaction={timeTransaction}
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
      ) : (
        <View
          style={{
            width: "100%",
            minHeight: 400,
            alignItems: "center",
            justifyContent: "center",
            gap: 6
          }}
        >
          <LottieView
            source={ApiLoadingLottieAnimation}
            autoPlay
            loop
            style={{
              width: 100,
              height: 100
            }}
          />
          <TextComponent>
            Please wait while we fetch your transaction list...
          </TextComponent>
        </View>
      )}
    </View>
  );
};

export default TransactionList;

const styles = StyleSheet.create({});
