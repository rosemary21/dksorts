import { UserDetailsType } from "@/api/index.d";
import { SET_USER_DETAILS, SET_USER_TOKEN, UserType } from "@/utils/_enums";

export interface InitialValueType {
  userDetails: UserDetailsType | null;
  token: string | null;
}

export const initialValue: InitialValueType = {
  userDetails: null,
  token: null
};

export const reducer = (
  state: InitialValueType,
  action: { type: UserType; payload?: any }
): InitialValueType => {
  const { type, payload } = action;

  switch (type) {
    case SET_USER_DETAILS:
      return { ...state, userDetails: payload };
    case SET_USER_TOKEN:
      return { ...state, token: payload };
    default:
      return state;
  }
};
