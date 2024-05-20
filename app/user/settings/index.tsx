import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import LoggedInContainer from "@/components/_layouts/LoggedInContainer";
import {
  defaultIconProps,
  padding,
  settingsRoutes,
  windowWidth
} from "@/utils/_variables";
import TextComponent from "@/components/_general/TextComponent";
import { blackColor, primaryColor, whiteColor } from "../../../assets/colors";
import {
  ArrowRight,
  Edit,
  EyeSlash,
  Logout,
  PenTool
} from "iconsax-react-native";
import ProfileImage from "@/components/screen/_general/ProfileImage";
import { Poppins } from "@/assets/fonts";
import { router } from "expo-router";
import { setHeaderAuthorization } from "@/api";
import { deleteUserToken } from "@/localServices/function";
import { useUserContext } from "@/context";
import useUser from "@/hooks/useUser";

const Settings = () => {
  const { push } = router;
  const { logoutUser, userDetails } = useUser();
  return (
    <LoggedInContainer
      hideHeader
      contentContainerStyle={{
        gap: 20
      }}
    >
      <View
        style={{
          alignItems: "center",
          gap: 6,
          paddingVertical: 30
        }}
      >
        <View>
          <ProfileImage size={100} />
          <TouchableOpacity
            style={{
              backgroundColor: primaryColor.default,
              height: 30,
              width: 30,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 9000,
              position: "absolute",
              bottom: 0,
              right: 0
            }}
          >
            <Edit {...defaultIconProps} color={whiteColor.default} />
          </TouchableOpacity>
        </View>

        <View>
          <TextComponent
            fontFamily={Poppins.semiBold.default}
            textAlign="center"
          >
            {userDetails?.firstName} {userDetails?.lastName}
          </TextComponent>
          <TextComponent
            style={{
              opacity: 0.6
            }}
            textAlign="center"
          >
            {userDetails?.email}
          </TextComponent>
          <TextComponent
            style={{
              opacity: 0.6
            }}
            textAlign="center"
          >
            {userDetails?.phoneNumber}
          </TextComponent>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 10
        }}
      >
        {settingsRoutes.map(({ path, Icon, label }, index) => (
          <TouchableOpacity
            onPress={() => {
              push(path);
            }}
            key={path}
            style={{
              padding: 20,
              backgroundColor: "#E6E6E6",
              borderRadius: 15,
              width: (windowWidth - padding * 2 - 10) * 0.5,
              gap: 30
            }}
          >
            {Icon && <Icon {...defaultIconProps} size={20} />}

            <TextComponent fontFamily={Poppins.semiBold.default}>
              {label}
            </TextComponent>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={{
            padding: 20,
            backgroundColor: "#E6E6E6",
            borderRadius: 15,
            width: (windowWidth - padding * 2 - 10) * 0.5,
            gap: 30
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <EyeSlash {...defaultIconProps} size={20} />

            <View
              style={{
                transform: [{ rotate: "-45deg" }],
                position: "absolute",
                top: -10,
                right: -10
              }}
            >
              <ArrowRight
                {...defaultIconProps}
                size={20}
                color={blackColor.opacity500}
              />
            </View>
          </View>

          <TextComponent fontFamily={Poppins.semiBold.default}>
            Privacy Policy
          </TextComponent>
        </TouchableOpacity>
      </View>
      <View
        style={{
          alignItems: "center",
          marginTop: 20
        }}
      >
        <TouchableOpacity
          onPress={logoutUser}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 2
          }}
        >
          <Logout {...defaultIconProps} color={primaryColor.default} />
          <TextComponent color={primaryColor.default}>Logout</TextComponent>
        </TouchableOpacity>
      </View>
    </LoggedInContainer>
  );
};

export default Settings;

const styles = StyleSheet.create({});
