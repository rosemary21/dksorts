import { Dimensions, Platform } from "react-native";
import * as Device from "expo-device";
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
  Sms,
  Key
} from "iconsax-react-native";
import { Delete } from "lucide-react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("screen");
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
export const padding = 25,
  totalPaddingHorizontal = padding * 2,
  iconSize = 16,
  defaultIconProps = {
    size: iconSize,
    color: blackColor.default
  },
  generalError = "Unable to determine error. Please try again!",
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
  deviceDetails = {
    brand: Device.brand,
    name: Device.deviceName,
    type: Device.deviceType,
    yearClass: Device.deviceYearClass,
    manufacturer: Device.manufacturer,
    modelName: Device.modelName,
    osBuildId: Device.osBuildId,
    osInternalBuildId: Device.osInternalBuildId,
    osName: Device.osName,
    osVersion: Device.osVersion
  },
  ExternalUrls = {
    privacyPolicy: "http://dkerulative.com.ng/privacy",
    termsCondition: "http://dkerulative.com.ng/terms"
  },
  modalScreenOptions = {
    animation: "fade_from_bottom",
    presentation: "transparentModal",
    contentStyle: {
      backgroundColor: "transparent"
    }
  } as any,
  ScreenNames: {
    [path: string]: ScreenNamesType;
  } = {
    GettingStarted: {
      path: "index",
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
    ErrorModal: {
      path: "/error-modal",
      Icon: undefined,
      label: "Error modal",
      activeNames: ["/error-modal"],
      showIn: []
    },
    Dashboard: {
      path: "user",
      Icon: Home,
      label: "Dashboard",
      activeNames: ["/user/"],
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
      label: "Voucher",
      activeNames: ["/user/wallet"],
      showIn: [nav]
    },
    GenerateWallet: {
      path: "/user/wallet/generate",
      Icon: Wallet,
      ActiveIcon: Wallet1,
      label: "Generate wallet",
      activeNames: ["/user/wallet/generate"],
      showIn: []
    },
    CreatePin: {
      path: "/user/wallet/create-pin",
      Icon: Wallet,
      ActiveIcon: Wallet1,
      label: "Create pin",
      activeNames: ["/user/wallet/create-pin"],
      showIn: []
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
    ResetPin: {
      path: "/user/settings/reset-pin",
      Icon: Key,
      label: "Reset Pin",
      activeNames: ["/user/settings/reset-pin"],
      showIn: [settings]
    },
    RequestPin: {
      path: "/user/request-pin",
      Icon: Lock,
      label: "Request Pin",
      activeNames: ["/user/request-pin"],
      showIn: []
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
      activeNames: ["/user/payment/data"],
      showIn: []
    },
    BuyAirtime: {
      path: "/user/payment/airtime",
      Icon: CallOutgoing,
      label: "Purchase airtime",
      activeNames: ["/user/payment/airtime"],
      showIn: []
    },
    ElectricityPayment: {
      path: "/user/payment/electricity",
      Icon: LampCharge,
      label: "Electricity bills payment",
      activeNames: ["/user/payment/electricity"],
      showIn: []
    },
    CableSubscription: {
      path: "/user/payment/cable",
      Icon: Brodcast,
      label: "Cable / TV subscription",
      activeNames: ["/user/payment/cable"],
      showIn: []
    },
    WaecPin: {
      path: "/user/payment/waec",
      Icon: Scanner,
      label: "WAEC Pin",
      activeNames: ["/user/payment/waec"],
      showIn: []
    },
    GenerateWaecPin: {
      path: "/user/payment/waec/generate",
      Icon: Scanner,
      label: "Generate Waec Pin",
      activeNames: ["/user/payment/waec/generate"],
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
    changePhoneNumber: "change-phone-number",
    resetPin: "reset-pin"
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
      code: "AIRTIME",
      text: "Get airtime to spend more times with your loved ones",
      Icon: ScreenNames.BuyAirtime.Icon as React.FC<IconProps>,
      isSpecial: false
    },
    Electricity: {
      path: ScreenNames.ElectricityPayment.path,
      title: "Electricity",
      code: "UTILITYBILLS",
      text: "Ensure consistent power supply for your appliances",
      Icon: ScreenNames.ElectricityPayment.Icon as React.FC<IconProps>,
      isSpecial: false
    },
    Data: {
      path: ScreenNames.BuyData.path,
      title: "Data",
      code: "MOBILEDATA",
      text: "Stay connected always by buying data at cheapest rate",
      Icon: ScreenNames.BuyData.Icon as React.FC<IconProps>,
      isSpecial: true
    },
    TVSubscription: {
      path: ScreenNames.CableSubscription.path,
      title: "TV",
      code: "CABLEBILLS",
      text: "Ensure consistent power supply for your appliances",
      Icon: ScreenNames.CableSubscription.Icon as React.FC<IconProps>,
      isSpecial: false
    }
    // WaecPin: {
    //   path: ScreenNames.WaecPin.path,
    //   title: "WAEC Pin",
    //   text: "Ensure consistent power supply for your appliances",
    //   Icon: ScreenNames.WaecPin.Icon as React.FC<IconProps>,
    //   isSpecial: false
    // }
  },
  pinKeys = [
    [
      { key: "1", showIn: [], type: "letter" },
      { key: "2", showIn: [], type: "letter" },
      { key: "3", showIn: [], type: "letter" }
    ],
    [
      { key: "4", showIn: [], type: "letter" },
      { key: "5", showIn: [], type: "letter" },
      { key: "6", showIn: [], type: "letter" }
    ],
    [
      { key: "7", showIn: [], type: "letter" },
      { key: "8", showIn: [], type: "letter" },
      { key: "9", showIn: [], type: "letter" }
    ],
    [
      { key: "", showIn: [], type: "letter" },
      { key: "0", showIn: [], type: "letter" },
      {
        key: "",
        Icon: Delete,
        showIn: [],
        type: "icon",
        action: "backspace"
      }
    ]
  ],
  allScreenNames = convertObjectToArray(ScreenNames),
  allDashboardActions = convertObjectToArray(DashboardAction),
  navRoutes = allScreenNames.filter((screenName) =>
    screenName.showIn.includes(nav)
  ),
  settingsRoutes = allScreenNames.filter((screenName) =>
    screenName.showIn.includes(settings)
  );

export { windowHeight, windowWidth, screenWidth, screenHeight };
