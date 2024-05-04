import { whiteColor } from "@/assets/colors";
import { Slot, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function GeneralLayout() {
  return (
    <>
      <StatusBar style="dark" backgroundColor={whiteColor.default} />
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
            presentation: "transparentModal",
            animation: "fade_from_bottom"
          }}
        />
        <Stack.Screen
          name="payment/waec/generate"
          options={{
            presentation: "transparentModal",
            animation: "fade_from_bottom"
          }}
        />
        {/* <Slot /> */}
      </Stack>
    </>
  );
}
