import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { allDashboardActions, defaultIconProps } from "@/utils/_variables";
import TextComponent from "@/components/_general/TextComponent";

const DashboardActions = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        justifyContent: "space-between"
      }}
    >
      {allDashboardActions.map(({ path, Icon, title }) => (
        <TouchableOpacity key={path} style={{ alignItems: "center", gap: 5 }}>
          {Icon && <Icon {...defaultIconProps} size={20} />}
          <TextComponent
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
