import {
  FormEnumType,
  SET_EMAIL_ADDRESS,
  SET_OTP,
  SET_PASSWORD,
  SET_PHONE_NUMBER,
  SET_PIN
} from "@/utils/_enums";

export interface InitialValueType {
  pin: string;
  phoneNumber: string | null;
  emailAddress: string | null;
  password: string;
  otp: string | null;
}

export const initialValue: InitialValueType = {
  pin: "",
  phoneNumber: null,
  emailAddress: null,
  otp: null,
  password: ""
};

export const reducer = (
  state: InitialValueType,
  action: { type: FormEnumType; payload?: any }
): InitialValueType => {
  const { type, payload } = action;

  switch (type) {
    case SET_PIN:
      return { ...state, pin: payload ?? "" };
    case SET_PHONE_NUMBER:
      return { ...state, phoneNumber: payload ?? null };
    case SET_EMAIL_ADDRESS:
      return { ...state, emailAddress: payload ?? null };
    case SET_PASSWORD:
      return { ...state, password: payload ?? "" };
    case SET_OTP:
      return { ...state, otp: payload ?? null };
    default:
      return state;
  }
};
