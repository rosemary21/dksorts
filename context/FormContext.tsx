import { StyleSheet } from "react-native";
import React, {
  createContext,
  useCallback,
  useContext,
  useReducer
} from "react";
import { formInitialValue, formReducer } from "@/reducers";
import { FormProviderTypes } from "@/utils/types";
import { SET_PASSWORD, SET_PHONE_NUMBER, SET_PIN } from "@/utils/_enums";
import { InitialValueType } from "@/reducers/formReducer";

interface FormContextActions {
  setPin: (payload: string) => void;
  setPhoneNumber: (payload?: string) => void;
  setPassword: (payload?: string) => void;
}

const FormContext = createContext<InitialValueType & FormContextActions>({
  ...formInitialValue,
  setPin: () => {},
  setPhoneNumber: () => {},
  setPassword: () => {}
});

export const FormProvider: React.FC<FormProviderTypes> = ({ children }) => {
  const [state, dispatch] = useReducer(formReducer, formInitialValue);

  const setPin = useCallback((payload: string): void => {
    if (payload) {
      dispatch({
        type: SET_PIN,
        payload
      });
    }
  }, []);

  const setPhoneNumber = useCallback((payload?: string): void => {
    dispatch({
      type: SET_PHONE_NUMBER,
      payload: payload || null
    });
  }, []);
  const setPassword = useCallback((payload?: string): void => {
    dispatch({
      type: SET_PASSWORD,
      payload: payload || ""
    });
  }, []);

  return (
    <FormContext.Provider
      value={{ ...state, setPin, setPhoneNumber, setPassword }}
    >
      {children}
    </FormContext.Provider>
  );
};

const useFormContext = () => {
  return useContext(FormContext);
};

export default useFormContext;

const styles = StyleSheet.create({});
