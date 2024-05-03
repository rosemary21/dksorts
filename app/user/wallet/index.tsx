import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LoggedInContainer from "@/components/_layouts/LoggedInContainer";
import WalletBalance from "@/components/screen/wallet/WalletBalance";
import TransactionList from "@/components/screen/_general/TransactionList";
import WalletStatistic from "@/components/screen/wallet/WalletStatistic";

const Wallet = () => {
  return (
    <LoggedInContainer
      contentContainerStyle={{
        gap: 20
      }}
    >
      <WalletBalance />
      <WalletStatistic />
      <TransactionList
        title="All transactions"
        showBorder
        style={{
          gap: 0,
          marginTop: 20
        }}
      />
    </LoggedInContainer>
  );
};

export default Wallet;

const styles = StyleSheet.create({});
