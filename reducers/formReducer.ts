import {
  FormEnumType,
  SET_PASSWORD,
  SET_PHONE_NUMBER,
  SET_PIN
} from "@/utils/_enums";

export interface InitialValueType {
  pin: string;
  phoneNumber: string | null;
  password: string;
}

export const initialValue: InitialValueType = {
  pin: "",
  phoneNumber: null,
  password: ""
};

export const reducer = (
  state: InitialValueType,
  action: { type: FormEnumType; payload?: any }
): InitialValueType => {
  const { type, payload } = action;

  switch (type) {
    case SET_PIN:
      return { ...state, pin: payload || "" };
    case SET_PHONE_NUMBER:
      return { ...state, phoneNumber: payload || null };
    case SET_PASSWORD:
      return { ...state, password: payload || "" };
    default:
      return state;
  }
};
