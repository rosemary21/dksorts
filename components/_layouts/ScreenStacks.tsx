import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect } from "react";
import { ScreenStackType } from "@/utils/types";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useActionContext } from "@/context";
import { ScreenNames } from "@/utils/_variables";
import { defaultColor, whiteColor } from "@/assets/colors";
import GettingStarted from "@/screens/GettingStarted";
import Login from "../../screens/Login";
import Registration from "../../screens/Registration";
import Dashboard from "../../screens/Dashboard";
import Payments from "@/screens/Payments";
import Wallet from "../../screens/Wallet";
import Account from "../../screens/Account";
import ProfileInformation from "@/screens/ProfileInformation";
import ChangePin from "@/screens/ChangePin";
import ChangePassword from "../../screens/ChangePassword";
import CableSubscription from "../../screens/CableSubscription";
import BuyData from "../../screens/BuyData";
import BuyAirtime from "../../screens/BuyAirtime";
import ElectricityPayment from "@/screens/ElectricityPayment";

const Stack = createNativeStackNavigator<any>();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: defaultColor.default
  }
};

const ScreenStacks: React.FC<ScreenStackType> = ({ fontLoaded }) => {
  const { getColorScheme } = useActionContext();
  const showAppScreens = useCallback(async () => {
    if (fontLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontLoaded]);

  useEffect(() => {
    getColorScheme();
  }, []);

  useEffect(() => {
    if (fontLoaded) {
      showAppScreens();
    }
  }, [fontLoaded]);

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator initialRouteName={ScreenNames.Login.name}>
        {/*screens that shows when user isn't loggedin yet */}
        <Stack.Group
          screenOptions={{
            animation: "slide_from_right",
            headerShown: false,
            gestureEnabled: true
          }}
        >
          <Stack.Screen name={ScreenNames.Login.name} component={Login} />
          <Stack.Screen
            name={ScreenNames.Registration.name}
            component={Registration}
          />
        </Stack.Group>
        <Stack.Group
          screenOptions={{
            animation: "fade",
            headerShown: false,
            gestureEnabled: true
          }}
        >
          <Stack.Screen
            name={ScreenNames.Dashboard.name}
            component={Dashboard}
          />
          <Stack.Screen name={ScreenNames.Payments.name} component={Payments} />
          <Stack.Screen name={ScreenNames.Wallet.name} component={Wallet} />
          <Stack.Screen name={ScreenNames.Account.name} component={Account} />
        </Stack.Group>
        <Stack.Group
          screenOptions={{
            animation: "slide_from_right",
            headerShown: false,
            gestureEnabled: true
          }}
        >
          <Stack.Screen
            name={ScreenNames.ProfileInformation.name}
            component={ProfileInformation}
          />
          <Stack.Screen
            name={ScreenNames.ChangePin.name}
            component={ChangePin}
          />
          <Stack.Screen
            name={ScreenNames.ChangePassword.name}
            component={ChangePassword}
          />
          <Stack.Screen
            name={ScreenNames.CableSubscription.name}
            component={CableSubscription}
          />
          <Stack.Screen
            name={ScreenNames.BuyAirtime.name}
            component={BuyAirtime}
          />
          <Stack.Screen
            name={ScreenNames.ElectricityPayment.name}
            component={ElectricityPayment}
          />
          <Stack.Screen name={ScreenNames.BuyData.name} component={BuyData} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ScreenStacks;

const styles = StyleSheet.create({});
