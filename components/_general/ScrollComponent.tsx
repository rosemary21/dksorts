import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScrollComponentType } from "@/utils/types";

const ScrollComponent: React.FC<ScrollComponentType> = ({
  children,
  style,
  showScrollIndicator,
  ...props
}) => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={showScrollIndicator || false}
      showsVerticalScrollIndicator={showScrollIndicator || false}
      contentContainerStyle={{
        minHeight: "100%",
        ...style
      }}
      {...props}
    >
      {children}
    </ScrollView>
  );
};

export default ScrollComponent;

const styles = StyleSheet.create({});
