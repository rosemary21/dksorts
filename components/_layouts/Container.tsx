import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ContainerType } from "@/utils/types";
import { SafeAreaView } from "react-native-safe-area-context";

const Container: React.FC<ContainerType> = ({
  children,
  safeView,
  style,
  ...props
}) => {
  return safeView ? (
    <SafeAreaView
      style={{
        flex: 1,
        ...style,
      }}
      {...props}
    >
      {children}
    </SafeAreaView>
  ) : (
    <View
      style={{
        flex: 1,
        ...style,
      }}
      {...props}
    >
      {children}
    </View>
  );
};

export default Container;

const styles = StyleSheet.create({});
