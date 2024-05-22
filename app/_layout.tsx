import { whiteColor } from "@/assets/colors";
import AppContainer from "@/components/_layouts/AppContainer";
import Providers from "@/components/_layouts/Providers";
import ScreenStacks from "@/components/_layouts/ScreenStacks";
import { StatusBar } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";

export default function GeneralLayout() {
  return (
    <RootSiblingParent>
      <StatusBar barStyle="dark-content" />
      <Providers>
        <AppContainer>
          <ScreenStacks />
        </AppContainer>
      </Providers>
    </RootSiblingParent>
  );
}
