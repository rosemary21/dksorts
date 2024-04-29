import { StyleSheet, Text, View, useColorScheme } from "react-native";
import React, {
  createContext,
  useCallback,
  useContext,
  useReducer
} from "react";
import { actionInitialValue, actionReducer } from "@/reducers";
import { ActionProviderTypes } from "@/utils/types";
import { SET_COLOR_SCHEME } from "@/utils/_enums";

const ActionContext = createContext({
  ...actionInitialValue,
  getColorScheme: (): void => {}
});

export const ActionProvider: React.FC<ActionProviderTypes> = ({ children }) => {
  const [state, dispatch] = useReducer(actionReducer, actionInitialValue);
  const colorScheme = useColorScheme();

  const getColorScheme = useCallback((): void => {
    dispatch({
      type: SET_COLOR_SCHEME,
      payload: colorScheme
    });
  }, [colorScheme]);

  return (
    <ActionContext.Provider value={{ ...state, getColorScheme }}>
      {children}
    </ActionContext.Provider>
  );
};

const useActionContext = () => {
  return useContext(ActionContext);
};

export default useActionContext;

const styles = StyleSheet.create({});
