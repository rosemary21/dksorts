import TextComponent from "@/components/_general/TextComponent";
import { windowWidth } from "@/utils/_variables";
import React, { useEffect } from "react";
import { Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle
} from "react-native-reanimated";

const AnimatedText: React.FC<{
  children: React.ReactNode;
  currentIndex: number;
  totalIndex: number;
}> = ({ children, currentIndex, totalIndex }) => {
  const translateX = useSharedValue(0);

  useEffect(() => {
    translateX.value = -windowWidth * currentIndex;
  }, [currentIndex]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(translateX.value, { duration: 500 }) }]
  }));

  return (
    <Animated.View
      style={[
        { ...styles.textContainer, width: (totalIndex ?? 1) * windowWidth },
        animatedStyle
      ]}
    >
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: "row",
    alignItems: "center"
  }
});

export default AnimatedText;
