import { SET_TOAST, ToastType } from "@/utils/_enums";

export type ToastOptionsType =
  | "error"
  | "success"
  | "default"
  | "warning"
  | null;

export interface InitialValueType {
  message: string | null;
  type: ToastOptionsType;
}

export interface ToastPayload {
  message: string;
  type?: ToastOptionsType;
}

export const initialValue: InitialValueType = {
  message: null,
  type: null
};

export const reducer = (
  state: InitialValueType,
  action: { type: ToastType; payload?: any }
): InitialValueType => {
  const { type, payload } = action;

  switch (type) {
    case SET_TOAST:
      return {
        ...state,
        message: payload ? payload.message ?? null : null,
        type: payload ? payload.type ?? null : null
      };
    default:
      return state;
  }
};
