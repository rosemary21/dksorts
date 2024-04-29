import { AxiosError, AxiosResponse } from "axios";
import Login from "../screens/login/Login";

export interface LoginBodyType {
  phoneNumber?: string;
  password?: string;
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

export type AllBodyType = LoginBodyType &
  AddBVNBodyType &
  SetPinBodyType &
  VerifyOTPBodyType &
  ResetPasswordBodyType &
  SendChangePasswordOTPType;

export type AllResponseType = ErrorResponseType &
  AllBodyType &
  LoginResponseType &
  AddBVNResponseType &
  SignUpResponseType &
  SetPinResponseType;

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
    message: string;
    time: string;
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
