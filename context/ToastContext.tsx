import { StyleSheet } from "react-native";
import React, {
  createContext,
  useCallback,
  useContext,
  useReducer
} from "react";
import { toastInitialValue, toastReducer } from "@/reducers";
import { ToastProviderTypes } from "@/utils/types";
import { ToastPayload } from "@/reducers/toastReducer";
import { SET_TOAST } from "@/utils/_enums";
const ToastContext = createContext({
  ...toastInitialValue,
  setToast: (payload?: ToastPayload | null) => {}
});

export const ToastProvider: React.FC<ToastProviderTypes> = ({ children }) => {
  const [state, dispatch] = useReducer(toastReducer, toastInitialValue);

  const setToast = useCallback((payload: ToastPayload | null = null) => {
    dispatch({
      type: SET_TOAST,
      payload
    });
  }, []);

  return (
    <ToastContext.Provider value={{ ...state, setToast }}>
      {children}
    </ToastContext.Provider>
  );
};

const useToastContext = () => {
  return useContext(ToastContext);
};

export default useToastContext;

const styles = StyleSheet.create({});
