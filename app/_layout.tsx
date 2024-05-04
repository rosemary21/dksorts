import { whiteColor } from "@/assets/colors";
import AppContainer from "@/components/_layouts/AppContainer";
import Providers from "@/components/_layouts/Providers";
import { screenHeight, screenWidth } from "@/utils/_variables";
import { Slot, Stack, Navigator } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

export default function GeneralLayout() {
  return (
    <>
      <StatusBar style="dark" backgroundColor="transparent" />
      <Providers>
        <AppContainer>
          <View
            style={{
              backgroundColor: whiteColor.default,
              width: screenWidth,
              height: screenHeight
            }}
          >
            <Stack
              screenOptions={{
                headerShown: false,
                animation: "slide_from_right",
                contentStyle: {
                  backgroundColor: whiteColor.default
                }
              }}
            >
              {/* <Slot /> */}
            </Stack>
          </View>
        </AppContainer>
      </Providers>
    </>
  );
}
