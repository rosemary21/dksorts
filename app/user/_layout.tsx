import { whiteColor } from "@/assets/colors";
import { modalScreenOptions } from "@/utils/_variables";
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
        {/* <Slot /> */}
      </Stack>
    </>
  );
}
