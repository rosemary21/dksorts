import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ScreenNames, padding } from "@/utils/_variables";
import TextComponent from "./TextComponent";
import { primaryColor, whiteColor } from "@/assets/colors";
import { greeting } from "@/utils/functions";
import { useNavigation } from "@react-navigation/native";
import ProfileImage from "../screen/_general/ProfileImage";

const LoggedInHeader: React.FC<{ headerText?: string }> = ({ headerText }) => {
  const { navigate } = useNavigation();
  return (
    <View
      style={{
        paddingHorizontal: padding,
        paddingVertical: 20,
        alignItems: "center",
        gap: 20,
        flexDirection: "row",
        justifyContent: "space-between"
      }}
    >
      <TextComponent>{headerText || greeting()}</TextComponent>

      <TouchableOpacity
        onPress={() => {
          navigate(ScreenNames.Account.path as never);
        }}
        style={{
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <View
          style={{
            paddingVertical: 5,
            backgroundColor: whiteColor.opacity50,
            paddingHorizontal: 15,
            borderTopLeftRadius: 100,
            borderBottomLeftRadius: 100
          }}
        >
          <TextComponent>Duyil</TextComponent>
        </View>
        <ProfileImage size={40} />
      </TouchableOpacity>
    </View>
  );
};

export default LoggedInHeader;

const styles = StyleSheet.create({});
