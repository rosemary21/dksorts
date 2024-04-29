import { NavigationType, SET_USER_LOCATION } from "@/utils/_enums";

export type LocationType = {
  latitude: string;
  longitude: string;
  name: string;
};
export interface InitialValueType {
  location: null | LocationType;
}

export const initialValue: InitialValueType = {
  location: null
};

export const reducer = (
  state: InitialValueType,
  action: { type: NavigationType; payload?: any }
): InitialValueType => {
  const { type, payload } = action;

  switch (type) {
    case SET_USER_LOCATION:
      return { ...state, location: payload };
    default:
      return state;
  }
};
