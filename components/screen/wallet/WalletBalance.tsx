import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { WalletBackground } from "@/assets/images";
import { blackColor, primaryColor, whiteColor } from "@/assets/colors";
import TextComponent from "@/components/_general/TextComponent";
import { Poppins } from "@/assets/fonts";
import { Copy } from "iconsax-react-native";
import { defaultIconProps, ScreenNames } from "@/utils/_variables";
import useUser from "@/hooks/useUser";
import LottieView from "lottie-react-native";
import { BalanceLoader } from "@/assets/lotties";
import { Link } from "expo-router";
import { copyToClipboard } from "@/utils/functions";
import useToast from "@/hooks/useToast";

const WalletBalance = () => {
  const { userDetails } = useUser();
  const { show } = useToast();
  return (
    <View
      style={{
        borderRadius: 15,
        overflow: "hidden"
      }}
    >
      <Image
        source={WalletBackground}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          resizeMode: "cover",
          top: 0,
          left: 0,
          opacity: 0.7
        }}
      />
      <View
        style={{
          gap: 20,
          padding: 20,
          paddingVertical: 30,
          backgroundColor: whiteColor.opacity300
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
              gap: 2
            }}
          >
            <TextComponent
              style={{
                opacity: 0.6
              }}
            >
              Wallet balance
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
              <View
                style={{
                  alignItems: "center",
                  flexDirection: "row"
                }}
              >
                <TextComponent>₦</TextComponent>
                <TextComponent
                  fontSize={30}
                  fontFamily={Poppins.semiBold.default}
                >
                  {userDetails?.balance}
                </TextComponent>
              </View>
            )}
          </View>

          {userDetails && userDetails.accountNonLocked && (
            <TouchableOpacity
              onPress={() => {
                copyToClipboard(userDetails.walletAccount);
                show("Account number copied to clipboard");
              }}
            >
              <Copy {...defaultIconProps} size={25} />
            </TouchableOpacity>
          )}
        </View>

        {userDetails &&
          (!userDetails?.accountNonLocked ? (
            <Link
              href={ScreenNames.GenerateWallet.path}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <TextComponent
                color={primaryColor.default}
                style={{
                  textDecorationColor: primaryColor.default,
                  textDecorationLine: "underline",
                  textDecorationStyle: "solid",
                  marginTop: 20
                }}
              >
                Click to generate wallet
              </TextComponent>
            </Link>
          ) : (
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
          ))}
      </View>
    </View>
  );
};

export default WalletBalance;

const styles = StyleSheet.create({});
