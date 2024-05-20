import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import { blackColor, primaryColor, whiteColor } from "@/assets/colors";
import TextComponent from "@/components/_general/TextComponent";
import { Poppins } from "@/assets/fonts";
import moment from "moment";

const TransactionCard: React.FC<{
  invertColor?: boolean;
  style?: ViewStyle;
  description: string;
  amount: number;
  timeTransaction: Date;
}> = ({ invertColor, style, description, amount, timeTransaction }) => {
  const purchasedDate = new Date(timeTransaction);
  const purchasedYear = moment(purchasedDate).format("YYYY");
  const purchasedMonth = moment(purchasedDate).format("M");
  const purchasedDay = moment(purchasedDate).format("D");
  const purchasedHour = moment(purchasedDate).format("HH");
  const purchasedMin = moment(purchasedDate).format("mm");
  const date = new Date();
  const todayYear = moment(date).format("YYYY");
  const todayMonth = moment(date).format("M");
  const today = moment(date).format("D");
  const presentHour = moment(date).format("HH");
  const presentMinute = moment(date).format("mm");
  let purchaseTime = `${purchasedHour}:${purchasedMin}`;

  const isToday =
    todayYear === purchasedYear &&
    todayMonth === purchasedMonth &&
    today === purchasedDay;

  const elapsedHour = parseInt(presentHour) - parseInt(purchasedHour);

  if (elapsedHour <= 1) {
    const oneHourToSecs = 3600;
  }
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
        ...style
      }}
    >
      <View
        style={{
          width: 50,
          height: 50,
          backgroundColor: invertColor
            ? whiteColor.opacity100
            : primaryColor.opacity100,
          borderRadius: 1000
        }}
      ></View>

      <View
        style={{
          flex: 1
        }}
      >
        <TextComponent
          color={invertColor ? whiteColor.default : blackColor.default}
          fontFamily={Poppins.semiBold.default}
        >
          {description}
        </TextComponent>
        <TextComponent
          color={invertColor ? whiteColor.opacity400 : blackColor.opacity400}
        >
          {isToday
            ? "Today"
            : `${purchasedDay}/${purchasedMonth}/${purchasedYear}`}
          , {purchaseTime}
        </TextComponent>
      </View>

      <TextComponent
        color={invertColor ? whiteColor.default : blackColor.default}
        fontFamily={Poppins.bold.default}
        fontSize={20}
      >
        ₦{amount}
      </TextComponent>
    </View>
  );
};

export default TransactionCard;

const styles = StyleSheet.create({});
