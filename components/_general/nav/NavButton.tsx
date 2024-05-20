import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ScreenNamesType } from "@/utils/types";
import { useNavigation, useRoute } from "@react-navigation/native";
import TextComponent from "../TextComponent";
import { defaultIconProps } from "@/utils/_variables";
import { blackColor, primaryColor, whiteColor } from "@/assets/colors";
import { router, usePathname } from "expo-router";

const NavButton: React.FC<ScreenNamesType> = ({
  ActiveIcon,
  Icon,
  path,
  label,
  activeNames
}) => {
  const pathname = usePathname();
  const { push } = router;

  let isActive = pathname === path;
  const activeIconSize = 30;

  if (!isActive) {
    isActive = activeNames.includes(pathname);
  }
  return (
    <TouchableOpacity
      onPress={() => {
        if (!isActive) {
          push(path);
        }
      }}
      style={{
        alignItems: "center",
        gap: 6
      }}
    >
      {Icon && (
        <>
          {isActive ? (
            ActiveIcon ? (
              <ActiveIcon
                {...defaultIconProps}
                size={activeIconSize}
                color={primaryColor.default}
                variant="Bold"
              />
            ) : (
              <Icon
                {...defaultIconProps}
                size={activeIconSize}
                color={primaryColor.default}
                variant="Bold"
              />
            )
          ) : (
            <Icon
              {...defaultIconProps}
              color={blackColor.default}
              variant="Linear"
            />
          )}
        </>
      )}
      <TextComponent
        color={isActive ? whiteColor.default : blackColor.opacity600}
        fontSize={12}
        textAlign="center"
        style={{
          flex: 1
        }}
      >
        {label}
      </TextComponent>
    </TouchableOpacity>
  );
};

export default NavButton;

const styles = StyleSheet.create({});
