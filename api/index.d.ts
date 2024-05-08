import { AxiosError, AxiosResponse } from "axios";
import Login from "../screens/login/Login";

export type OTPType = "R" | "F";
export type NotificationType = "M" | "S";

export interface GeneralResponseType {
  code: string;
  message: string;
}
export interface LoginBodyType {
  phoneNumber: string;
  password: string;
  deviceId: string;
  deviceName: string;
}
export interface RegisterBodyType {
  phoneNumber: string;
  email: string;
  referred?: string;
  longitude?: string;
  dateOfBirth: string;
  latitude?: string;
  password: string;
  confirmPassword: string;
  deviceId: string;
  mobileVersion: string;
  mobileOs: string;
  mobileOsVer: string;
  deviceName: string;
  mobileVersionId: string;
}

export interface RequestOTPBodyType {
  otpId: string;
  otpType: OTPType;
  notificationType: NotificationType;
  sendSource?: string;
}
export interface VerifyOTPBodyType {
  otpId: string;
  otpType: OTPType;
  notificationType: NotificationType;
  otp: string;
}
export interface AddNINBodyType {
  number_nin: string;
  emailAddress: string;
}
export interface SendChangePasswordOTPType {
  phoneNumber?: string;
}
export interface AddBVNBodyType {
  bvn?: string;
}
export interface SetPinBodyType {
  pin?: string;
}

export interface UserDetailsType {
  userID?: string;
  userType?: string;
  expiredAt?: Date;
  profile_image?: string;
}
export interface LoginResponseType extends UserDetailsType {
  token?: string;
  isFirstTimeLogin: boolean;
  validDevice: "N";
  stage: "0";
  resp: GeneralResponseType;
}

export interface AddBVNResponseType {
  token?: string;
  message?: string;
}
export interface SignUpResponseType {
  phoneNumber?: string;
}
export interface VerifyOTPBodyType {
  phoneNumber?: string;
  otp?: string;
}
export interface ResetPasswordBodyType {
  password?: string;
}
export interface SetPinResponseType {
  message?: string;
}

export interface ErrorResponseType {
  message?: string;
  timeStamp?: Date;
  status?: string;
}

export type AllBodyType =
  | LoginBodyType
  | AddBVNBodyType
  | SetPinBodyType
  | VerifyOTPBodyType
  | ResetPasswordBodyType
  | SendChangePasswordOTPType;

export type AllResponseType = ErrorResponseType &
  AllBodyType &
  LoginResponseType;

export type AllRequestType = "post" | "get" | "delete" | "put";

export type ResponseStatus = "error" | "success";

export interface ApiURLType {
  method: AllRequestType;
  url: string;
  returnToken?: boolean;
}

export interface ResponseType {
  type: ResponseStatus;
  code: string | number;
  statusText: string;
  response: {
    status: string;
    time?: string;
    data: AllResponseType;
  };
}
export interface ApiErrorResponseType {
  type: ResponseStatus;
  code: string | number;
  statusText: string;
  response: AllResponseType;
}

export type ApiRequestResponseType = Promise<ResponseType>;
