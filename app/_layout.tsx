import { whiteColor } from "@/assets/colors";
import AppContainer from "@/components/_layouts/AppContainer";
import Providers from "@/components/_layouts/Providers";
import ScreenStacks from "@/components/_layouts/ScreenStacks";
import { SplashScreen } from "expo-router";
import { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";

SplashScreen.preventAutoHideAsync();

export default function GeneralLayout() {
  const [appLoaded, setAppLoaded] = useState(false);

  useEffect(() => {
    setAppLoaded(true);
    // SplashScreen.hideAsync();
  }, []);
  return (
    <>
      <RootSiblingParent>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={"transparent"}
          translucent
        />
        {appLoaded && (
          <Providers>
            <AppContainer>
              <ScreenStacks />
            </AppContainer>
          </Providers>
        )}
      </RootSiblingParent>
    </>
  );
}
