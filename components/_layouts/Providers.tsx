import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ProviderType } from "@/utils/types";
import {
  ActionProvider,
  FormProvider,
  NavigationProvider,
  UserProvider
} from "@/context";
import { PaperProvider } from "react-native-paper";

const Providers: React.FC<ProviderType> = ({ children }) => {
  return (
    <PaperProvider>
      <FormProvider>
        <ActionProvider>
          <UserProvider>
            <NavigationProvider>{children}</NavigationProvider>
          </UserProvider>
        </ActionProvider>
      </FormProvider>
    </PaperProvider>
  );
};

export default Providers;

const styles = StyleSheet.create({});
