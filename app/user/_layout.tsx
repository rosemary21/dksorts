import { whiteColor } from "@/assets/colors";
import { useFormContext, useUserContext } from "@/context";
import useUser from "@/hooks/useUser";
import {
  modalScreenOptions,
  ScreenNames,
  VerificationTypes
} from "@/utils/_variables";
import { constructVerificationTypeObject } from "@/utils/functions";
import { Redirect, router, Slot, Stack, usePathname } from "expo-router";
import { useEffect } from "react";
import { StatusBar } from "react-native";

export default function GeneralLayout() {
  const { token } = useUserContext();
  const { setEmailAddress } = useFormContext();
  const { fetchUserDetails, userDetails } = useUser();
  const { push } = router;
  const pathName = usePathname();

  useEffect(() => {
    if (token) {
      fetchUserDetails();
    }
  }, [token]);

  useEffect(() => {
    if (userDetails) {
      if (
        pathName === ScreenNames.Dashboard.path ||
        pathName === ScreenNames.Payments.path
      ) {
        if (
          userDetails?.emailVerificationStatus &&
          userDetails?.phoneNumberStatus
        ) {
          if (!userDetails?.bvnStatus) {
            push(ScreenNames.GenerateWallet.path);
          }
        } else {
          push({
            pathname: ScreenNames.VerifyOTP.path,
            params: {
              ...constructVerificationTypeObject(
                VerificationTypes.registration,
                !userDetails?.emailVerificationStatus ? userDetails.email : "",

                !userDetails?.phoneNumberStatus ? userDetails.phoneNumber : ""
              ),
              shouldGoBack: "true"
            }
          });
        }
      }
    }
  }, [userDetails, pathName]);

  if (!token) {
    return <Redirect href={ScreenNames.Login.path} />;
  }

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={"transparent"}
        translucent
      />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: whiteColor.default
          }
        }}
      >
        <Stack.Screen
          name="request-pin"
          options={{
            animation: "fade_from_bottom",
            ...modalScreenOptions
          }}
        />
        <Stack.Screen
          name="payment/waec/generate"
          options={{
            animation: "fade_from_bottom",
            ...modalScreenOptions
          }}
        />
        <Stack.Screen
          name="wallet/generate"
          options={{
            animation: "fade_from_bottom",
            ...modalScreenOptions
          }}
        />
        {/* <Slot /> */}
      </Stack>
    </>
  );
}
