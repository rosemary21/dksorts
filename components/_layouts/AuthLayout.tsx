import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import Container from "./Container";
import { padding, windowWidth } from "@/utils/_variables";
import { SafeAreaView } from "react-native-safe-area-context";
import TextComponent from "../_general/TextComponent";
import ScrollComponent from "./ScrollComponent";
import { secondaryColor } from "@/assets/colors";

const AuthLayout: React.FC<{
  title: string;
  description?: string;
  children: React.ReactNode;
  contentContainerStyle?: ViewStyle;
}> = ({ title, description, children, contentContainerStyle }) => {
  const iconSize = 25,
    backgroundColor = secondaryColor.default;
  return (
    <Container
      style={{
        gap: 20
      }}
    >
      <View
        style={{
          alignItems: "flex-end"
        }}
      >
        <View
          style={{
            gap: 1,
            paddingHorizontal: 30,
            paddingVertical: 30,
            borderBottomLeftRadius: 9000,
            backgroundColor: backgroundColor,
            minHeight: windowWidth * 0.35,
            alignItems: "center",
            justifyContent: "center",
            width: "100%"
          }}
        >
          <SafeAreaView
            style={{
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <TextComponent fontSize={windowWidth * 0.06}>{title}</TextComponent>
            {description && (
              <TextComponent
                textAlign="center"
                style={{
                  opacity: 0.6,
                  maxWidth: "60%"
                }}
              >
                {description}
              </TextComponent>
            )}
          </SafeAreaView>
        </View>
        <View
          style={{
            width: 70,
            height: 50,
            borderBottomLeftRadius: 900,
            backgroundColor: backgroundColor
          }}
        ></View>
      </View>

      <View
        style={{
          flex: 1,
          paddingHorizontal: padding
        }}
      >
        <ScrollComponent
          style={{
            minHeight: 0,
            gap: 20,
            ...contentContainerStyle
          }}
        >
          {children}
        </ScrollComponent>
      </View>
    </Container>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({});
