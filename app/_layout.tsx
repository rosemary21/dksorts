import AppContainer from "@/components/_layouts/AppContainer";
import Providers from "@/components/_layouts/Providers";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function GeneralLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Providers>
        <AppContainer>
          <Slot />
        </AppContainer>
      </Providers>
    </>
  );
}
