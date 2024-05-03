import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { allDashboardActions, defaultIconProps } from "@/utils/_variables";
import TextComponent from "@/components/_general/TextComponent";
import { blackColor, primaryColor } from "@/assets/colors";
import { Poppins } from "@/assets/fonts";
import { router } from "expo-router";

const DashboardActions = () => {
  const specialIndex = Math.round(allDashboardActions.length / 2);
  const { push } = router;
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        justifyContent: "space-between"
      }}
    >
      {allDashboardActions.map(({ path, Icon, title }, index) => (
        <TouchableOpacity
          onPress={() => {
            push(path);
          }}
          key={path}
          style={{ alignItems: "center", gap: 5 }}
        >
          {Icon && (
            <Icon
              {...defaultIconProps}
              size={20}
              color={
                index + 1 === specialIndex
                  ? primaryColor.default
                  : blackColor.default
              }
            />
          )}
          <TextComponent
            fontFamily={
              index + 1 === specialIndex ? Poppins.bold.default : undefined
            }
            color={
              index + 1 === specialIndex ? primaryColor.default : undefined
            }
            style={{
              opacity: 0.6
            }}
          >
            {title}
          </TextComponent>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default DashboardActions;

const styles = StyleSheet.create({});
