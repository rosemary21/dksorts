import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LoggedInContainer from "@/components/_layouts/LoggedInContainer";
import TextComponent from "@/components/_general/TextComponent";
import { Poppins } from "@/assets/fonts";
import DashboardBalance from "@/components/screen/dashboard/DashboardBalance";
import DashboardActions from "@/components/screen/dashboard/DashboardActions";

const Dashboard = () => {
  return (
    <LoggedInContainer
      hideHeader
      contentContainerStyle={{
        gap: 20
      }}
    >
      <DashboardBalance />
      <DashboardActions />
    </LoggedInContainer>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});
