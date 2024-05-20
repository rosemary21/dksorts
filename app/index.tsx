import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
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
import {
  GettingStartedOneImage,
  GettingStartedThreeImage,
  GettingStartedTwoImage
} from "@/assets/images";
import { Redirect, router, useNavigation } from "expo-router";
import { useUserContext } from "@/context";
import ImageComponent from "@/components/screen/getting-started/AnimatedImage";
import AnimatedText from "@/components/screen/getting-started/AnimatedText";

const images = [
  GettingStartedOneImage,
  GettingStartedTwoImage,
  GettingStartedThreeImage
];

const text = [
  "Spend more call time with your partner",
  "24/7 online availability",
  "Availability to make other payment"
];

const GettingStarted = () => {
  const iconSize = 25,
    backgroundColor = "#fee7e7",
    iconColor = whiteColor.default;
  const { push } = router;
  const { reset } = useNavigation();
  const { token } = useUserContext();
  const [currentIndex, setCurrentIndex] = useState(0);

  // useEffect(() => {
  //   if (token) {
  //     // reset({
  //     //   index: 0,
  //     //   routes: [{ name: ScreenNames.Dashboard.path as never }]
  //     // });
  //     push(ScreenNames.Dashboard.path);
  //   }
  // }, [token]);

  if (token) {
    return <Redirect href={ScreenNames.Dashboard.path} />;
  }

  return (
    <Container
      style={{
        justifyContent: "flex-end"
        // backgroundColor: blackColor.opacity200
      }}
    >
      {images.map((image, index) => (
        <ImageComponent
          key={index}
          source={image}
          index={index}
          currentIndex={currentIndex}
        />
      ))}
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
            justifyContent: "flex-end",
            paddingLeft: 100,
            width: "100%",
            overflow: "hidden"
          }}
        >
          <AnimatedText totalIndex={images.length} currentIndex={currentIndex}>
            {text.map((text, index) => (
              <View
                key={index}
                style={{
                  width: "33%",
                  flexShrink: 0,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingRight: windowWidth * 0.15
                }}
              >
                <TextComponent
                  key={index}
                  style={{
                    width: "85%"
                  }}
                  fontSize={windowWidth * 0.06}
                >
                  {text}
                </TextComponent>
              </View>
            ))}
          </AnimatedText>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 10
            }}
          >
            {currentIndex > 0 && (
              <Button
                action={() => {
                  setCurrentIndex((prevState) => prevState - 1);
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
                <ArrowLeft
                  {...defaultIconProps}
                  size={iconSize}
                  color={iconColor}
                />
              </Button>
            )}
            <Button
              action={() => {
                if (currentIndex >= images.length - 1) {
                  push(ScreenNames.Login.path);
                } else {
                  setCurrentIndex((prevState) => prevState + 1);
                }
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
              <ArrowRight
                {...defaultIconProps}
                size={iconSize}
                color={iconColor}
              />
            </Button>
          </View>
        </View>
      </View>
    </Container>
  );
};

export default GettingStarted;

const styles = StyleSheet.create({});
