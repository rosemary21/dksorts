import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View
} from "react-native";
import React from "react";
import { ScreenNames, padding } from "@/utils/_variables";
import TextComponent from "./TextComponent";
import { primaryColor, whiteColor } from "@/assets/colors";
import { greeting } from "@/utils/functions";
import { useNavigation } from "@react-navigation/native";
import ProfileImage from "../screen/_general/ProfileImage";
import useUser from "@/hooks/useUser";
import LottieView from "lottie-react-native";
import { BalanceLoader } from "@/assets/lotties";
import { router } from "expo-router";

const LoggedInHeader: React.FC<{
  headerText?: string;
  headerTextStyle?: TextStyle;
}> = ({ headerText, headerTextStyle }) => {
  const { push } = router;
  const { userDetails } = useUser();
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
      <TextComponent
        style={{
          ...headerTextStyle
        }}
      >
        {headerText || greeting()}
      </TextComponent>

      {!userDetails ? (
        <View
          style={{
            width: 100,
            height: 30,
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden"
          }}
        >
          <LottieView
            source={BalanceLoader}
            autoPlay
            loop
            style={{
              width: 250,
              height: 250
            }}
          />
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => {
            push(ScreenNames.Account.path);
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
            <TextComponent>{userDetails.firstName}</TextComponent>
          </View>
          <ProfileImage size={40} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default LoggedInHeader;

const styles = StyleSheet.create({});
