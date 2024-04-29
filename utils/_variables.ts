import { Dimensions } from "react-native";
import {
  DashboardActionType,
  ImageDimensionType,
  ScreenNamesType
} from "./types";
import { blackColor, whiteColor } from "@/assets/colors";
import { convertObjectToArray } from "./functions";
import {
  CardPos,
  Home,
  Wallet,
  Wallet1,
  UserOctagon,
  Wifi,
  Mobile,
  CallOutgoing,
  LampCharge,
  User,
  ShieldSecurity,
  Lock,
  IconProps,
  Brodcast,
  TableDocument
} from "iconsax-react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("screen");
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
export const padding = 25,
  totalPaddingHorizontal = padding * 2,
  iconSize = 16,
  defaultIconProps = {
    size: iconSize,
    color: blackColor.default
  },
  nav = "nav",
  buttonTypes = {
    primary: "primary",
    secondary: "secondary",
    default: "default",
    transparent: "transparent"
  },
  colorSchemes = {
    dark: "dark",
    light: "light"
  },
  imageDimensions: { round: ImageDimensionType; square: ImageDimensionType } = {
    round: "round",
    square: "square"
  },
  ScreenNames: {
    [path: string]: ScreenNamesType;
  } = {
    GettingStarted: {
      path: "/",
      Icon: undefined,
      label: "Getting started",
      activeNames: ["/"],
      showIn: []
    },
    Login: {
      path: "/auth/",
      Icon: undefined,
      label: "Login",
      activeNames: ["/auth"],
      showIn: []
    },
    Register: {
      path: "/auth/signup",
      Icon: undefined,
      label: "Register",
      activeNames: ["/auth/signup"],
      showIn: []
    },
    ForgotPassword: {
      path: "/auth/forgot-password",
      Icon: undefined,
      label: "Forgot Password",
      activeNames: ["/auth/forgot-password"],
      showIn: []
    },
    VerifyOTP: {
      path: "/auth/verify-otp",
      Icon: undefined,
      label: "Verify OTP",
      activeNames: ["/auth/verify-otp"],
      showIn: []
    },
    NINVerification: {
      path: "/auth/nin-verification",
      Icon: undefined,
      label: "NIN Verification",
      activeNames: ["/auth/nin-verification"],
      showIn: []
    },
    ChangePassword: {
      path: "/auth/change-password",
      Icon: undefined,
      label: "Change password",
      activeNames: ["/auth/change-password"],
      showIn: []
    },
    VerificationResponse: {
      path: "/verification-response",
      Icon: undefined,
      label: "Verification response",
      activeNames: ["/verification-response"],
      showIn: []
    },
    Dashboard: {
      path: "/user",
      Icon: Home,
      label: "Dashboard",
      activeNames: ["/user"],
      showIn: [nav]
    },
    Payments: {
      path: "Payments",
      Icon: CardPos,
      label: "Payments & Purchases",
      activeNames: ["Payments"],
      showIn: [nav]
    },
    Wallet: {
      path: "Wallet",
      Icon: Wallet,
      ActiveIcon: Wallet1,
      label: "Wallet",
      activeNames: ["Wallet"],
      showIn: [nav]
    },
    Account: {
      path: "Account",
      Icon: UserOctagon,
      label: "Account",
      activeNames: ["Account"],
      showIn: [nav]
    },
    ProfileInformation: {
      path: "ProfileInformation",
      Icon: User,
      label: "Profile Information",
      activeNames: ["ProfileInformation"],
      showIn: []
    },
    ChangePin: {
      path: "ChangePin",
      Icon: Lock,
      label: "Change Pin",
      activeNames: ["ChangePin"],
      showIn: []
    },
    BuyData: {
      path: "BuyData",
      Icon: Wifi,
      label: "Purchase data",
      activeNames: ["BuyData"],
      showIn: []
    },
    BuyAirtime: {
      path: "BuyAirtime",
      Icon: CallOutgoing,
      label: "Purchase airtime",
      activeNames: ["BuyAirtime"],
      showIn: []
    },
    ElectricityPayment: {
      path: "ElectricityPayment",
      Icon: LampCharge,
      label: "Electricity bills payment",
      activeNames: ["ElectricityPayment"],
      showIn: []
    },
    CableSubscription: {
      path: "CableSubscription",
      Icon: Brodcast,
      label: "Cable / TV subscription",
      activeNames: ["CableSubscription"],
      showIn: []
    },
    WaecPin: {
      path: "CableSubscription",
      Icon: Brodcast,
      label: "Cable / TV subscription",
      activeNames: ["CableSubscription"],
      showIn: []
    },
    ViewDataPlans: {
      path: "ViewDataPlans",
      Icon: TableDocument,
      label: "Data plans",
      activeNames: ["ViewDataPlans"],
      showIn: []
    }
  },
  VerificationTypes = {
    forgotPassword: "forgot-password",
    registration: "registration"
  },
  VerificationResponseType = {
    success: "Success",
    failed: "Failed"
  },
  DashboardAction: {
    [path: string]: DashboardActionType;
  } = {
    Data: {
      path: ScreenNames.BuyData.path,
      title: "Data",
      text: "Stay connected always by buying data at cheapest rate",
      Icon: ScreenNames.BuyData.Icon as React.FC<IconProps>,
      isSpecial: true
    },
    Airtime: {
      path: ScreenNames.BuyAirtime.path,
      title: "Airtime",
      text: "Get airtime to spend more times with your loved ones",
      Icon: ScreenNames.BuyAirtime.Icon as React.FC<IconProps>,
      isSpecial: false
    },
    Electricity: {
      path: ScreenNames.ElectricityPayment.path,
      title: "Electricity",
      text: "Ensure consistent power supply for your appliances",
      Icon: ScreenNames.ElectricityPayment.Icon as React.FC<IconProps>,
      isSpecial: false
    },
    TVSubscription: {
      path: ScreenNames.CableSubscription.path,
      title: "TV",
      text: "Ensure consistent power supply for your appliances",
      Icon: ScreenNames.CableSubscription.Icon as React.FC<IconProps>,
      isSpecial: false
    },
    WaecPin: {
      path: ScreenNames.WaecPin.path,
      title: "WAEC Pin",
      text: "Ensure consistent power supply for your appliances",
      Icon: ScreenNames.WaecPin.Icon as React.FC<IconProps>,
      isSpecial: false
    }
  },
  allScreenNames = convertObjectToArray(ScreenNames),
  allDashboardActions = convertObjectToArray(DashboardAction),
  navRoutes = allScreenNames.filter((screenName) =>
    screenName.showIn.includes(nav)
  );

export { windowHeight, windowWidth, screenWidth, screenHeight };
