import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { navRoutes, padding } from "@/utils/_variables";
import { blackColor } from "@/assets/colors";
import NavButton from "./NavButton";

const Nav = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        justifyContent: "space-between",
        paddingHorizontal: padding,
        paddingVertical: 30
      }}
    >
      {navRoutes.map((screenName, index) => (
        <NavButton {...screenName} key={index} />
      ))}
    </View>
  );
};

export default Nav;

const styles = StyleSheet.create({});
