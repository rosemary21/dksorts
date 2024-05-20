import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ArrowLeft2 } from "iconsax-react-native";
import {
  defaultIconProps,
  generalError,
  padding,
  pinKeys,
  screenHeight,
  ScreenNames,
  screenWidth,
  VerificationResponseType,
  windowHeight,
  windowWidth
} from "@/utils/_variables";
import { SafeAreaView } from "react-native-safe-area-context";
import { blackColor, primaryColor } from "@/assets/colors";
import TextComponent from "@/components/_general/TextComponent";
import CustomButton from "@/components/_general/CustomButton";
import { backspaceText, showToast, Vibrate } from "@/utils/functions";
import { Poppins } from "@/assets/fonts";
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from "react-native-reanimated";
import { router, useFocusEffect } from "expo-router";
import LottieView from "lottie-react-native";
import { ApiLoadingLottieAnimation, BalanceLoader } from "@/assets/lotties";
import { processRequest } from "@/api/functions";
import { setPinApi } from "@/api/url";
import useUser from "@/hooks/useUser";

const CreatePin = () => {
  const { back, push } = router;
  const [pin, setPin] = useState("");
  const [repeatPin, setRepeatPin] = useState("");
  const [loading, setLoading] = useState(false);
  const { fetchUserDetails, userDetails } = useUser();

  const processForm = useCallback(() => {
    setLoading(true);
    processRequest(setPinApi, { pin })
      .then((res) => {
        fetchUserDetails();
        back();
        push({
          pathname: ScreenNames.VerificationResponse.path,
          params: {
            description: `Pin set successfully`,
            type: VerificationResponseType.success
          }
        });
      })
      .catch((err) => {
        push({
          pathname: ScreenNames.ErrorModal.path,
          params: {
            error: err?.response?.data?.resp?.message ?? err?.statusText
          }
        });
        showToast(err?.statusText || generalError);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [pin, userDetails]);

  const shakeValue = useSharedValue(0);
  const startShake = () => {
    Vibrate("short");
    shakeValue.value = 0;

    shakeValue.value = withTiming(
      1,
      { duration: 200, easing: Easing.linear },
      () => {
        shakeValue.value = withSpring(0, { damping: 2, stiffness: 10 }, () => {
          shakeValue.value = 0;
        });
      }
    );
  };

  const animatedStyle = useAnimatedStyle(() => {
    const shakeTranslateX = interpolate(
      shakeValue.value,
      [0, 0.2, 0.4, 0.6, 0.8, 1],
      [0, -10, 10, -10, 10, 0],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ translateX: shakeTranslateX }]
    };
  });

  useFocusEffect(() => {
    shakeValue.value = 0;
  });

  useEffect(() => {
    if (pin.length === 4 && (!repeatPin || repeatPin.length !== 4)) {
      setRepeatPin(pin);
      setPin("");
    }

    if (repeatPin.length === 4 && pin.length === 4) {
      if (pin !== repeatPin) {
        startShake();
        setPin("");
      } else {
        processForm();
      }
    }
  }, [pin, repeatPin]);

  return (
    <>
      <View
        style={{
          flex: 1,
          gap: 10,
          paddingHorizontal: padding,
          paddingTop: windowHeight * 0.1
        }}
      >
        <SafeAreaView
          style={{
            paddingVertical: 30
          }}
        >
          {/* <TouchableOpacity>
          <ArrowLeft2 {...defaultIconProps} size={30} />
        </TouchableOpacity> */}
        </SafeAreaView>

        <TextComponent textAlign="center" fontFamily={Poppins.semiBold.default}>
          {repeatPin ? "Repeat Pin" : "Create Pin"}
        </TextComponent>

        <Animated.View
          style={[
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: windowWidth * 0.08
            },
            animatedStyle
          ]}
        >
          <TextComponent
            fontFamily={Poppins.black.default}
            textAlign="center"
            fontSize={40}
            color={pin.length > 0 ? primaryColor.default : undefined}
          >
            *
          </TextComponent>
          <TextComponent
            fontFamily={Poppins.black.default}
            textAlign="center"
            fontSize={40}
            color={pin.length > 1 ? primaryColor.default : undefined}
          >
            *
          </TextComponent>
          <TextComponent
            fontFamily={Poppins.black.default}
            textAlign="center"
            fontSize={40}
            color={pin.length > 2 ? primaryColor.default : undefined}
          >
            *
          </TextComponent>
          <TextComponent
            fontFamily={Poppins.black.default}
            textAlign="center"
            fontSize={40}
            color={pin.length > 3 ? primaryColor.default : undefined}
          >
            *
          </TextComponent>
        </Animated.View>

        <View
          style={{
            flex: 1,
            width: "100%"
          }}
        >
          {pinKeys.map((keyArr, index) => (
            <View
              key={index}
              style={{
                flex: 1 / 4,
                width: "100%",
                flexDirection: "row"
              }}
            >
              {keyArr.map(({ key, type, Icon, action }, index) =>
                key.length > 0 || Icon ? (
                  <View
                    key={index}
                    style={{
                      flex: 1 / 3,
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <CustomButton
                      hasBackground
                      onPress={(value) => {
                        if (action != "backspace") {
                          if (pin.length < 4) {
                            setPin((prevState) => `${prevState}${value}`);
                          }
                        } else {
                          const newPin = backspaceText(pin);
                          setPin(newPin);
                        }
                      }}
                      style={{
                        height: windowWidth * 0.1,
                        width: windowWidth * 0.1
                      }}
                      key={index}
                      letter={
                        type === "icon" && Icon ? (
                          <Icon {...defaultIconProps} />
                        ) : (
                          key
                        )
                      }
                    />
                  </View>
                ) : (
                  <View
                    style={{
                      flex: 1 / 3,
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                    key={index}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        setPin("");
                        setRepeatPin("");
                      }}
                    >
                      <TextComponent>Clear</TextComponent>
                    </TouchableOpacity>
                  </View>
                )
              )}
            </View>
          ))}
        </View>
      </View>
      {loading && (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            position: "absolute",
            backgroundColor: blackColor.opacity200,
            width: screenWidth,
            height: screenHeight,
            top: 0,
            left: 0
          }}
        >
          <LottieView
            source={ApiLoadingLottieAnimation}
            autoPlay
            loop
            style={{
              width: 100,
              height: 100
            }}
          />
        </View>
      )}
    </>
  );
};

export default CreatePin;

const styles = StyleSheet.create({
  boxStyle: {
    width: ((windowWidth - padding * 2) * 0.8) / 4,
    height: ((windowWidth - padding * 2) * 0.8) / 4,
    maxWidth: 40,
    maxHeight: 40,
    backgroundColor: blackColor.opacity50,
    borderRadius: 10,
    // borderWidth: 1,
    // borderColor: primaryColor.default,
    alignItems: "center",
    justifyContent: "center"
  }
});
