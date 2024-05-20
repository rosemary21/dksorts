import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import LoggedInContainer from "@/components/_layouts/LoggedInContainer";
import TextComponent from "@/components/_general/TextComponent";
import { Poppins } from "@/assets/fonts";
import DashboardBalance from "@/components/screen/dashboard/DashboardBalance";
import DashboardActions from "@/components/screen/dashboard/DashboardActions";
import TransactionList from "@/components/screen/_general/TransactionList";
import { whiteColor } from "@/assets/colors";
import { DashboardBackground } from "@/assets/images";
import AddFundsCard from "@/components/screen/dashboard/AddFundsCard";

const Dashboard = () => {
  return (
    <LoggedInContainer
      // hideHeader
      headerText="Good evening"
      headerTextStyle={{
        fontFamily: Poppins.bold.default
      }}
      contentContainerStyle={{
        gap: 20
      }}
    >
      <View
        style={{
          borderRadius: 15,
          overflow: "hidden"
        }}
      >
        <Image
          source={DashboardBackground}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            resizeMode: "cover",
            opacity: 0.5
          }}
        />

        <View
          style={{
            gap: 20,
            padding: 20,
            paddingTop: 0,
            backgroundColor: whiteColor.opacity300
          }}
        >
          <DashboardBalance />
          <DashboardActions />
        </View>
      </View>

      <AddFundsCard />
      <TransactionList
        max={5}
        showBorder
        style={
          {
            // marginTop: 20
          }
        }
        title="Recent Transactions"
      />
    </LoggedInContainer>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});
