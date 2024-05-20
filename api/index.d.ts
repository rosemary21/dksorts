import { AxiosError, AxiosResponse } from "axios";
import Login from "../screens/login/Login";

export type OTPType = "R" | "F";
export type NotificationType = "M" | "S";

export interface GeneralResponseType {
  code: string;
  message: string;
}

export interface ApiResponseDateType {
  year: number;
  month: number;
  day: number;
}
export interface ApiResponseDateType {
  hour: number;
  minute: number;
  second: number;
  nano: number;
}

export interface BillerType {
  id: number;
  name: string;
  logo: null | string;
  description: string;
  short_name: string;
  biller_code: string;
  country_code: string;
}

export interface BillerOptionsType {
  id: number;
  biller_code: string;
  name: string;
  default_commission: number;
  date_added: string;
  country: string;
  biller_name: string;
  item_code: string;
  short_name: string;
  fee: number;
  commission_on_fee: boolean;
  reg_expression: string;
  label_name: string;
  amount: number;
  group_name: string;
  category_name: string;
  is_data: null;
  default_commission_on_amount: null;
  commission_on_fee_or_amount: null;
  validity_period: null;
  _airtime: boolean;
  _resolvable: boolean;
}

export interface TransactionDetailsType {
  timeTransaction: Date;
  amount: number;
  type: string;
}
export interface UserDetailsType {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  ninStatus: boolean;
  status: string;
  stage: string;
  bvnStatus: boolean;
  balance: number;
  id: number;
  bvn: string;
  isFirstLogin: boolean;
  deviceId: string;
  deviceName: string;
  walletAccount: string;
  emailVerificationStatus: boolean;
  phoneNumberStatus: boolean;
  isAccountNonLocked: boolean;
  pinStatus: boolean;
  accountName: string;
  bankName: string;
  totalFunded: number;
  totalSpent: number;
}
export interface LoginBodyType {
  phoneNumber: string;
  password: string;
  deviceId: string;
  deviceName: string;
}
export interface RegisterBodyType {
  phoneNumber: string;
  firstName: string;
  lastName: string;
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

export interface ChangeProfileDetailsBodyType {
  firstName: string;
  lastName: string;
}

export interface ChangePinBodyType {
  newPin: string;
  oldPin: string;
}
export interface ChangePasswordBodyType {
  confirmPassword: string;
  newPassword: string;
  oldPassword: string;
}

export interface CreateBillBodyType {
  country: "NG";
  customer_id: string;
  reference: string;
  amount: string;
  callback_url: string;
  billerCode: string;
  itemCode: string;
  pin: string;
}

export interface FetchBillerResponseType {
  status: "success";
  message: "Billers fetched successfully";
  data: BillerType[];
}
export interface FetchBillerOptionResponseType {
  status: "success";
  message: "Billers fetched successfully";
  data: BillerOptionsType[];
}
export interface PaymentSuccessfulResponseType {
  status: "success";
  message: "Bill payment successful";
  data: {
    phone_number: string;
    amount: number;
    network: string;
    code: string;
    tx_ref: string;
    reference: string;
    batch_reference: string | null;
    recharge_token: string | null;
    fee: string;
  };
}

export interface ChangeEmailBodyType {
  emailAddress: string;
  otp: string;
}
export interface ChangePhoneNumberBodyType {
  phoneNumber: string;
  otp: string;
}

export interface RequestOTPBodyType {
  otpId: string;
  otpType: OTPType;
  notificationType: NotificationType;
  sendSource?: string;
}
export interface VerifyOTPBodyType {
  otpId: string;
  otp: string;
}
export interface VerifyNINBodyType {
  number_nin: string;
  emailAddress: string;
}

export interface VerifyPhoneEmailBodyType {
  emailAddress: string;
  otp: string;
  phoneNumber: string;
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

export interface LoginResponseType {
  data: {
    token?: string;
    isFirstTimeLogin: boolean;
    validDevice: "N";
    stage: "0";
    resp: GeneralResponseType;
  };
}

export interface GetUserDetailsResponseType {
  data: {
    resp: GeneralResponseType;
    customerDetails: UserDetailsType;
    transactionDtos: TransactionDetailsType[];
    pageNo: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    last: boolean;
  };
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
  error?: string;
  responseDto: {
    code: string;
    message: string;
  };
}

export type AllBodyType =
  | LoginBodyType
  | AddBVNBodyType
  | SetPinBodyType
  | VerifyOTPBodyType
  | ResetPasswordBodyType
  | SendChangePasswordOTPType
  | ChangeProfileDetailsBodyType
  | ChangePinBodyType
  | ChangePasswordBodyType
  | VerifyPhoneEmailBodyType
  | VerifyNINBodyType
  | ChangeEmailBodyType
  | ChangePhoneNumberBodyType;

export type AllResponseType = ErrorResponseType &
  AllBodyType &
  LoginResponseType &
  GetUserDetailsResponseType &
  FetchBillerResponseType &
  FetchBillerOptionResponseType &
  PaymentSuccessfulResponseType;

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
  message?: string;
  response: {
    status: string;
    time?: string;
    data: AllResponseType;
  } & AllResponseType;
}
export interface ApiErrorResponseType {
  type: ResponseStatus;
  code: string | number;
  statusText: string;
  response: AllResponseType;
}

export type ApiRequestResponseType = Promise<ResponseType>;
