import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Container from "@/components/_layouts/Container";
import TextComponent from "@/components/_general/TextComponent";
import {
  defaultIconProps,
  padding,
  ScreenNames,
  screenWidth,
  windowWidth
} from "@/utils/_variables";
import { blackColor, primaryColor, whiteColor } from "@/assets/colors";
import Button from "@/components/_general/Button";
import { ArrowLeft, ArrowRight } from "iconsax-react-native";
import { GettingStartedOneImage } from "@/assets/images";
import { router } from "expo-router";

const GettingStarted = () => {
  const iconSize = 25,
    backgroundColor = "#fee7e7";
  const { push } = router;
  return (
    <Container
      style={{
        justifyContent: "flex-end"
        // backgroundColor: blackColor.opacity200
      }}
    >
      <View
        style={{
          height: "100%",
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0
        }}
      >
        <Image
          style={{
            resizeMode: "contain",
            width: "100%",
            height: "100%"
          }}
          source={GettingStartedOneImage}
        />
      </View>
      <View
        style={{
          alignItems: "flex-end"
        }}
      >
        <View
          style={{
            width: 100,
            height: 100,
            borderTopLeftRadius: 900,
            backgroundColor: backgroundColor
          }}
        ></View>
        <View
          style={{
            gap: 6,
            paddingHorizontal: 30,
            paddingVertical: 30,
            borderTopLeftRadius: 9000,
            backgroundColor: backgroundColor,
            height: windowWidth * 0.5,
            alignItems: "flex-end",
            justifyContent: "flex-end",
            paddingLeft: 100,
            width: "100%"
          }}
        >
          <TextComponent fontSize={windowWidth * 0.07}>
            Spend more time with your partner
          </TextComponent>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10
            }}
          >
            <Button
              type="primary"
              style={{
                width: 50,
                height: 50,
                borderRadius: 9000,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <ArrowLeft {...defaultIconProps} size={iconSize} />
            </Button>
            <Button
              action={() => {
                push(ScreenNames.Login.path);
              }}
              type="primary"
              style={{
                width: 50,
                height: 50,
                borderRadius: 9000,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <ArrowRight {...defaultIconProps} size={iconSize} />
            </Button>
          </View>
        </View>
      </View>
    </Container>
  );
};

export default GettingStarted;

const styles = StyleSheet.create({});
