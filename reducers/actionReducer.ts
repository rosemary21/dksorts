import { APP_LOADED, ActionsType, SET_COLOR_SCHEME } from "@/utils/_enums";

interface InitialValueType {
  colorScheme: "dark" | "light";
  appLoaded: boolean;
}

export const initialValue: InitialValueType = {
  colorScheme: "light",
  appLoaded: false
};

export const reducer = (
  state: InitialValueType,
  action: { type: ActionsType; payload?: any }
): InitialValueType => {
  const { type, payload } = action;

  switch (type) {
    case APP_LOADED:
      return { ...state, appLoaded: true };
    case SET_COLOR_SCHEME:
      return { ...state, colorScheme: payload || "light" };
    default:
      return state;
  }
};
