import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Image from "@/components/_general/Image";
import { useUserContext } from "@/context";
import { AvatarImage } from "@/assets/images";
import { ProfileImageType } from "@/utils/types";

const ProfileImage: React.FC<ProfileImageType> = ({ size, style }) => {
  const { userDetails } = useUserContext();
  return (
    <Image
      style={{
        ...style
      }}
      type="round"
      url={userDetails?.profile_image}
      width={size}
      innerPadding={0}
      imageStyle={{
        borderRadius: 9000
      }}
      height={size}
      image={AvatarImage}
    />
  );
};

export default ProfileImage;

const styles = StyleSheet.create({});
