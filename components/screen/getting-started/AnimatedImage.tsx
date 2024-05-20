import React, { useEffect } from "react";
import { Image, ImageSourcePropType, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle
} from "react-native-reanimated";

const ImageComponent: React.FC<{
  source: ImageSourcePropType;
  index: number;
  currentIndex: number;
}> = ({ source, index, currentIndex }) => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = currentIndex === index ? 1 : 0;
  }, [currentIndex]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(opacity.value, { duration: 500 })
  }));

  return (
    <Animated.View style={[styles.imageContainer, animatedStyle]}>
      <Image source={source} style={styles.image} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    height: "100%",
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0
  },
  image: {
    resizeMode: "contain",
    width: "100%",
    height: "100%"
  }
});

export default ImageComponent;
