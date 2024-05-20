import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { primaryColor, secondaryColor } from "@/assets/colors";
import TextComponent from "@/components/_general/TextComponent";
import { whiteColor } from "../../../assets/colors";
import { Poppins } from "@/assets/fonts";
import { Copy } from "iconsax-react-native";
import { defaultIconProps, ScreenNames } from "@/utils/_variables";
import useUser from "@/hooks/useUser";
import LottieView from "lottie-react-native";
import { Link } from "expo-router";
import { copyToClipboard } from "@/utils/functions";

const AddFundsCard = () => {
  const { userDetails } = useUser();
  return (
    userDetails &&
    (!userDetails?.isAccountNonLocked ? (
      <View
        style={{
          padding: 20,
          backgroundColor: "#E6E6E6",
          borderRadius: 15,
          alignItems: "center",
          gap: 6
        }}
      >
        <TextComponent textAlign="center" fontFamily={Poppins.medium.default}>
          Ops!
        </TextComponent>
        <TextComponent
          textAlign="center"
          style={{
            opacity: 0.6
          }}
        >
          You have no wallet at the moment, click on generate wallet to get your
          wallet
        </TextComponent>
        <Link href={ScreenNames.GenerateWallet.path}>
          <TextComponent
            color={primaryColor.default}
            style={{
              textDecorationColor: primaryColor.default,
              textDecorationLine: "underline",
              textDecorationStyle: "solid",
              marginTop: 20
            }}
          >
            Generate wallet
          </TextComponent>
        </Link>
      </View>
    ) : (
      <View
        style={{
          gap: 10
        }}
      >
        <View
          style={{
            padding: 20,
            borderRadius: 15,
            backgroundColor: "#E6E6E6",
            gap: 30,
            alignItems: "flex-start"
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "space-between",
              width: "100%"
            }}
          >
            <View
              style={{
                paddingVertical: 3,
                paddingHorizontal: 10,
                backgroundColor: whiteColor.default,
                borderRadius: 9000
              }}
            >
              <TextComponent fontSize={12} color={primaryColor.default}>
                Add funds
              </TextComponent>
            </View>

            {userDetails && userDetails.isAccountNonLocked && (
              <TouchableOpacity
                onPress={() => {
                  copyToClipboard(userDetails.walletAccount);
                }}
              >
                <Copy {...defaultIconProps} size={25} />
              </TouchableOpacity>
            )}
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "space-between",
              width: "100%"
            }}
          >
            <View
              style={{
                gap: 2
              }}
            >
              <TextComponent>{userDetails.bankName}</TextComponent>
              <TextComponent fontSize={20} fontFamily={Poppins.bold.default}>
                {userDetails.walletAccount}
              </TextComponent>
            </View>

            <TextComponent>{userDetails.accountName}</TextComponent>
          </View>
        </View>
        <TextComponent
          style={{
            opacity: 0.6
          }}
        >
          Make a bank transfer to the above account to fund your wallet
        </TextComponent>
      </View>
    ))
  );
};

export default AddFundsCard;

const styles = StyleSheet.create({});
