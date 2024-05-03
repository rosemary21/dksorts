import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import LoggedInContainer from "@/components/_layouts/LoggedInContainer";
import { allDashboardActions, defaultIconProps } from "@/utils/_variables";
import { blackColor, primaryColor } from "@/assets/colors";
import TextComponent from "@/components/_general/TextComponent";
import { Poppins } from "@/assets/fonts";
import { ArrowRight2 } from "iconsax-react-native";
import { router } from "expo-router";

const Payments = () => {
  const { push } = router;
  return (
    <LoggedInContainer
      headerText="Make payments"
      contentContainerStyle={{
        paddingVertical: 0
      }}
    >
      {allDashboardActions.map(({ path, Icon, title, text }, index) => (
        <TouchableOpacity
          onPress={() => {
            push(path);
          }}
          key={path}
          style={{
            paddingVertical: 20,
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            borderBottomWidth: index + 1 !== allDashboardActions.length ? 1 : 0,
            borderColor: blackColor.opacity100
          }}
        >
          {Icon && (
            <View
              style={{
                width: 50,
                height: 50,
                backgroundColor: primaryColor.opacity50,
                borderRadius: 9000,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Icon {...defaultIconProps} size={25} />
            </View>
          )}

          <View style={{ gap: 2, flex: 1 }}>
            <TextComponent fontFamily={Poppins.semiBold.default}>
              {title}
            </TextComponent>
            <TextComponent
              style={{
                opacity: 0.6
              }}
            >
              {text}
            </TextComponent>
          </View>

          <ArrowRight2 {...defaultIconProps} size={20} />
        </TouchableOpacity>
      ))}
    </LoggedInContainer>
  );
};

export default Payments;

const styles = StyleSheet.create({});
