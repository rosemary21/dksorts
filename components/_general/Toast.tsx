// Toast.js
import {
  blackColor,
  greenColor,
  redColor,
  secondaryColor,
  whiteColor
} from "@/assets/colors";
import useToastContext from "@/context/ToastContext";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming
} from "react-native-reanimated";
import TextComponent from "./TextComponent";

const Toast = () => {
  const { message, type, setToast } = useToastContext();
  const translateY = useSharedValue(100);
  const [background, setBackground] = useState("#333");
  const [textColor, setTextColor] = useState("white");
  const [activeTimeout, setActiveTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const hideToast = useCallback(() => {
    translateY.value = withTiming(100, { duration: 0 });
    setTimeout(() => {
      setToast();
    }, 300);
  }, []);

  useEffect(() => {
    if (type === "error") {
      setBackground(redColor.default);
      setTextColor(whiteColor.default);
    }
    if (!type || type === "default") {
      setBackground("#333");
      setTextColor(whiteColor.default);
    }
    if (type === "success") {
      setBackground(greenColor.default);
      setTextColor(whiteColor.default);
    }
    if (type === "warning") {
      setBackground(secondaryColor.default);
      setTextColor(blackColor.default);
    }
  }, [type]);

  useEffect(() => {
    if (message && message.length > 0) {
      translateY.value = withTiming(100, { duration: 0 });
      setTimeout(() => {
        translateY.value = withTiming(0, { duration: 300 });
      }, 50);
    }
  }, [message]);

  //   useEffect(() => {
  //     setToast({
  //       message: "Just setting toast"
  //     });

  //     setTimeout(() => {
  //       setToast({
  //         message: "Just setting success",
  //         type: "success"
  //       });
  //     }, 1000);

  //     setTimeout(() => {
  //       setToast({
  //         message: "Just setting error",
  //         type: "error"
  //       });
  //     }, 2000);
  //     setTimeout(() => {
  //       setToast({
  //         message: "Just setting warning",
  //         type: "warning"
  //       });
  //     }, 3000);
  //     setTimeout(() => {
  //       setToast({
  //         message: "Just setting default",
  //         type: "default"
  //       });
  //     }, 4000);
  //   }, []);

  useEffect(() => {
    if (message) {
      const presentTimeout = setTimeout(() => {
        hideToast();
        setActiveTimeout(null);
      }, 3000);
      setActiveTimeout((prevTimeout) => {
        if (prevTimeout) {
          clearTimeout(prevTimeout);
        }

        return presentTimeout;
      });
    }
  }, [message]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }]
    };
  });

  return (
    <Animated.View style={[styles.toast, animatedStyle]}>
      <TouchableOpacity
        onPress={hideToast}
        style={{
          backgroundColor: background,
          padding: 16,
          borderRadius: 4,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
          elevation: 5
        }}
      >
        <TextComponent textAlign="center" color={textColor}>
          {message}
        </TextComponent>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    bottom: 0,
    padding: 16,
    width: "100%",
    alignItems: "center"
  }
});

export default Toast;
