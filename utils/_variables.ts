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
  TableDocument,
  Scanner,
  Sms
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
  settings = "settings",
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
      path: "/user/payment",
      Icon: CardPos,
      label: "Payments",
      activeNames: ["/user/payment"],
      showIn: [nav]
    },
    Wallet: {
      path: "/user/wallet",
      Icon: Wallet,
      ActiveIcon: Wallet1,
      label: "Wallet",
      activeNames: ["/user/wallet"],
      showIn: [nav]
    },
    Account: {
      path: "/user/settings",
      Icon: UserOctagon,
      label: "Account",
      activeNames: ["/user/settings"],
      showIn: [nav]
    },
    ProfileInformation: {
      path: "/user/settings/account",
      Icon: User,
      label: "Profile Information",
      activeNames: ["/user/settings/account"],
      showIn: [settings]
    },
    ChangeEmail: {
      path: "/user/settings/email",
      Icon: Sms,
      label: "Change Email",
      activeNames: ["/user/settings/email"],
      showIn: [settings]
    },
    ChangePhoneNumber: {
      path: "/user/settings/phone-number",
      Icon: Mobile,
      label: "Change Phone Number",
      activeNames: ["/user/settings/phone-number"],
      showIn: [settings]
    },
    ChangePin: {
      path: "/user/settings/pin",
      Icon: Lock,
      label: "Change Pin",
      activeNames: ["/user/settings/pin"],
      showIn: [settings]
    },
    ResetPassword: {
      path: "/user/settings/password",
      Icon: ShieldSecurity,
      label: "Reset Password",
      activeNames: ["/user/settings/password"],
      showIn: [settings]
    },
    BuyData: {
      path: "/user/payment/data",
      Icon: Wifi,
      label: "Purchase data",
      activeNames: ["BuyData"],
      showIn: []
    },
    BuyAirtime: {
      path: "/user/payment/airtime",
      Icon: CallOutgoing,
      label: "Purchase airtime",
      activeNames: ["BuyAirtime"],
      showIn: []
    },
    ElectricityPayment: {
      path: "/user/payment/electricity",
      Icon: LampCharge,
      label: "Electricity bills payment",
      activeNames: ["ElectricityPayment"],
      showIn: []
    },
    CableSubscription: {
      path: "/user/payment/cable",
      Icon: Brodcast,
      label: "Cable / TV subscription",
      activeNames: ["CableSubscription"],
      showIn: []
    },
    WaecPin: {
      path: "/user/payment/waec",
      Icon: Scanner,
      label: "Cable / TV subscription",
      activeNames: ["CableSubscription"],
      showIn: []
    },
    ViewDataPlans: {
      path: "/user/payments/data-plans",
      Icon: TableDocument,
      label: "Data plans",
      activeNames: ["ViewDataPlans"],
      showIn: []
    }
  },
  VerificationTypes = {
    forgotPassword: "forgot-password",
    registration: "registration",
    changeEmail: "change-email",
    changePhoneNumber: "change-phone-number"
  },
  VerificationResponseType = {
    success: "Success",
    failed: "Failed"
  },
  DashboardAction: {
    [path: string]: DashboardActionType;
  } = {
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
    Data: {
      path: ScreenNames.BuyData.path,
      title: "Data",
      text: "Stay connected always by buying data at cheapest rate",
      Icon: ScreenNames.BuyData.Icon as React.FC<IconProps>,
      isSpecial: true
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
  ),
  settingsRoutes = allScreenNames.filter((screenName) =>
    screenName.showIn.includes(settings)
  );

export { windowHeight, windowWidth, screenWidth, screenHeight };
