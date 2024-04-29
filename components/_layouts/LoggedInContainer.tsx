import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";
import React, { useEffect, useState } from "react";
import Container from "./Container";
import ScrollComponent from "../_general/ScrollComponent";
import Nav from "../_general/nav/Nav";
import {
  allScreenNames,
  defaultIconProps,
  nav,
  padding
} from "@/utils/_variables";
import { ArrowLeft2 } from "iconsax-react-native";
import { secondaryColor, whiteColor } from "@/assets/colors";
import TextComponent from "../_general/TextComponent";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ScreenNamesType } from "@/utils/types";
import LoggedInHeader from "../_general/LoggedInHeader";
import { usePathname, useRouter } from "expo-router";

const Header: React.FC<{ headerText: string; hideBackArrow?: boolean }> = ({
  headerText,
  hideBackArrow
}) => {
  const { goBack } = useNavigation();
  return (
    <View
      style={{
        paddingHorizontal: padding,
        paddingVertical: 20,
        alignItems: "center",
        gap: 20,
        flexDirection: "row"
      }}
    >
      {!hideBackArrow && (
        <TouchableOpacity onPress={goBack}>
          <ArrowLeft2 {...defaultIconProps} size={20} />
        </TouchableOpacity>
      )}

      <TextComponent
        textAlign="center"
        style={{
          flex: 1
        }}
      >
        {headerText || "Screen"}
      </TextComponent>
      {!hideBackArrow && <View></View>}
    </View>
  );
};

const LoggedInContainer: React.FC<{
  hideHeader?: boolean;
  hideNav?: boolean;
  header?: React.ReactNode;
  headerText?: string;
  hideBackArrow?: boolean;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  children: React.ReactNode;
  unScrollable?: boolean;
  unSafeView?: boolean;
}> = ({
  hideHeader,
  hideNav,
  header,
  headerText,
  hideBackArrow,
  style,
  contentContainerStyle,
  children,
  unScrollable,
  unSafeView
}) => {
  const [activeScreen, setActiveScreen] = useState<ScreenNamesType | null>(
      null
    ),
    pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      const screen = allScreenNames.find((scr) => scr.path === pathname);
      setActiveScreen(screen || null);
    }
  }, [pathname]);
  return (
    <Container
      safeView={!unSafeView}
      style={{
        ...style
      }}
    >
      <View
        style={{
          flex: 1,

          backgroundColor: secondaryColor.opacity400
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: whiteColor.default,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30
          }}
        >
          {header
            ? header
            : !hideHeader &&
              (activeScreen?.showIn?.includes(nav) ? (
                <LoggedInHeader headerText={headerText} />
              ) : (
                <Header
                  headerText={headerText || activeScreen?.label || "Screen"}
                  hideBackArrow={hideBackArrow}
                />
              ))}
          <View
            style={{
              flex: 1
            }}
          >
            {unScrollable ? (
              <View
                style={{
                  ...styles.contentContainerStyle,
                  ...contentContainerStyle
                }}
              >
                {children}
              </View>
            ) : (
              <ScrollComponent
                style={{
                  minHeight: 0,
                  ...styles.contentContainerStyle,
                  ...contentContainerStyle
                }}
              >
                {children}
              </ScrollComponent>
            )}
          </View>
        </View>
        {!hideNav && <Nav />}
      </View>
    </Container>
  );
};

export default LoggedInContainer;

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: padding,
    paddingVertical: 20
  }
});
