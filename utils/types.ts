import { PoppinsProps } from "@/assets/fonts";
import { IconProps } from "iconsax-react-native";
import {
  ColorValue,
  ImageSourcePropType,
  ImageStyle,
  ScrollViewProps,
  TextInputProps,
  TextStyle,
  TouchableOpacityProps,
  ViewProps,
  ViewStyle
} from "react-native";
import { SelectListProps } from "react-native-dropdown-select-list";
import { SvgProps, TextProps } from "react-native-svg";

export type FontFamiliesType = PoppinsProps;

export type VibrationTypes = "long" | "short" | "medium";

export type ImageDimensionType = "round" | "square";

export interface ButtonType extends TouchableOpacityProps {
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  action?: () => void;
  loaderType?: "loader-one" | "loader-two" | "loader-three";
  style?: ViewStyle;
  type?: "primary" | "secondary" | "default" | "transparent";
}

export interface ColorType {
  default: string;
  opacity10: string;
  opacity20: string;
  opacity30: string;
  opacity40: string;
  opacity50: string;
  opacity60: string;
  opacity70: string;
  opacity80: string;
  opacity90: string;
  opacity100: string;
  opacity200: string;
  opacity300: string;
  opacity400: string;
  opacity500: string;
  opacity600: string;
  opacity700: string;
  opacity800: string;
  opacity900: string;
}

export interface ScrollComponentType extends ScrollViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
  showScrollIndicator?: boolean;
}

export interface StarsType {
  total?: number;
  active?: number;
  color?: ColorValue;
  starSize?: number;
  horizontal?: boolean;
}

export interface TextComponentType extends TextProps {
  children: React.ReactNode;
  textAlign?: "left" | "right" | "center";
  fontSize?: number;
  color?: ColorValue;
  fontFamily?: FontFamiliesType;
  style?: TextStyle;
}
export interface ContainerType extends ViewProps {
  children: React.ReactNode;
  safeView?: boolean;
  style?: ViewStyle;
}

export interface ProviderType {
  children: React.ReactNode;
}

export interface CheckBoxType {
  size?: number;
  checked: boolean;
  onChange: (value: boolean) => void;
  style?: ViewStyle;
  oneWay?: boolean;
  label?: string;
  labelStyle?: TextStyle;
  labelProps?: TextComponentType;
  borderColor?: ColorValue;
  checkBoxColor?: ColorValue;
  checkBoxActiveBackground?: ColorValue;
  checkBoxUnActiveBackground?: ColorValue;
}

export interface InputFieldType extends TextInputProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: string | boolean;
  leftIconAction?: () => void;
  rightIconAction?: () => void;
  secureTextEntry?: boolean;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  inputParentStyle?: ViewStyle;
  errorStyle?: TextStyle;
  label?: string;
  labelStyle?: TextStyle;
  rightIconStyle?: ViewStyle;
  leftIconStyle?: ViewStyle;
  iconStyle?: ViewStyle;
  iconSize?: number;
  preventKeyBoardAutoHide?: boolean;
  inputBorderColor?: string;
  placeholderTextColor?: string;
}

export interface IconType extends SvgProps {
  size?: number;
  color?: ColorValue;
}

export interface ImageType {
  width?: number;
  type?: ImageDimensionType;
  height?: number;
  borderRadius?: number;
  url?: string;
  image: ImageSourcePropType;
  fullDimension?: boolean;
  imageStyle?: ImageStyle;
  innerPadding?: number;
  style?: ViewStyle;
}

export interface ProfileImageType {
  size?: number;
  style?: ViewStyle;
}

export interface ScreenStackType {
  fontLoaded: boolean;
}
export interface ScreenNamesType {
  path: string;
  Icon: React.FC<IconProps> | undefined;
  ActiveIcon?: React.FC<IconProps> | undefined;
  label: string;
  activeNames: string[];
  showIn: string[];
}

export interface ActionProviderTypes {
  children: React.ReactNode;
}
export interface FormProviderTypes {
  children: React.ReactNode;
}

export interface NavigationProviderTypes {
  children: React.ReactNode;
}
export interface ToastProviderTypes {
  children: React.ReactNode;
}
export interface UserProviderTypes {
  children: React.ReactNode;
}
export interface SelectBoxOptionType {
  value: string;
  key: string;
  disable?: boolean;
}

export interface DashboardActionType {
  title: string;
  text: string;
  code: string;
  action?: () => void;
  Icon: React.FC<IconProps>;
  style?: ViewStyle;
  path: string;
  isSpecial?: boolean;
}

export interface SelectBoxType extends SelectListProps {
  onChange: (value: string) => void;
  data: SelectBoxOptionType[];
  style?: ViewStyle;
  label?: string;
  labelStyle?: TextStyle;
  error?: string | boolean;
  errorStyle?: TextStyle;
  inputParentStyle?: ViewStyle;
  inputStyles?: TextStyle;
  inputBorderColor?: ColorValue;
}
