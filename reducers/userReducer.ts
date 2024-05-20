import { TransactionDetailsType, UserDetailsType } from "@/api/index.d";
import {
  RESET_USER_CONTEXT,
  SET_USER_DETAILS,
  SET_USER_TOKEN,
  SET_USER_TRANSACTIONS,
  UserType
} from "@/utils/_enums";

export interface InitialValueType {
  userDetails: UserDetailsType | null;
  token: string | null;
  transactions: TransactionDetailsType[] | null;
}

export const initialValue: InitialValueType = {
  userDetails: null,
  token: null,
  transactions: null
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
    case SET_USER_TRANSACTIONS:
      return { ...state, transactions: payload };
    case RESET_USER_CONTEXT:
      return initialValue;
    default:
      return state;
  }
};
