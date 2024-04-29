import { StyleSheet, Text, View, Image as RNImage } from "react-native";
import React, { useState } from "react";
import { imageDimensions } from "@/utils/_variables";
import { whiteColor } from "@/assets/colors";
import { BrokenImageIcon, PictureIcon } from "@/assets/icons";
import { ImageType } from "@/utils/types";

const Image: React.FC<ImageType> = ({
  width = 50,
  type = "square",
  height = 50,
  borderRadius = 15,
  url,
  image,
  fullDimension,
  imageStyle,
  innerPadding = 10,
  style
}) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [loadErr, setLoadErr] = useState(false);
  const size = height > width ? width * 0.7 : height * 0.7;
  return (
    <View
      style={{
        backgroundColor: whiteColor.default,
        ...style,
        overflow: "hidden",
        borderRadius: type === imageDimensions.round ? 90000 : borderRadius,
        width,
        height
      }}
    >
      <View
        style={{
          width: "100%",
          height: "100%",
          padding: fullDimension ? 0 : innerPadding
        }}
      >
        <RNImage
          src={url}
          source={image}
          onError={() => {
            setLoadErr(true);
          }}
          onLoad={() => {
            setImageLoading(false);
          }}
          style={{
            width: "100%",
            height: "100%",
            ...imageStyle
          }}
        />
      </View>

      {(imageLoading || loadErr) && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {loadErr ? (
            <PictureIcon size={size} />
          ) : (
            <BrokenImageIcon size={size} />
          )}
        </View>
      )}
    </View>
  );
};

export default Image;

const styles = StyleSheet.create({});
