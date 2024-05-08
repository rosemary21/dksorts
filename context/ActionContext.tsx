import { StyleSheet, Text, View, useColorScheme } from "react-native";
import React, {
  createContext,
  useCallback,
  useContext,
  useReducer
} from "react";
import { actionInitialValue, actionReducer } from "@/reducers";
import { ActionProviderTypes } from "@/utils/types";
import { APP_LOADED, SET_COLOR_SCHEME } from "@/utils/_enums";

const ActionContext = createContext({
  ...actionInitialValue,
  getColorScheme: (): void => {},
  setAppLoaded: (): void => {}
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

  const setAppLoaded = useCallback(() => {
    dispatch({
      type: APP_LOADED,
      payload: true
    });
  }, []);

  return (
    <ActionContext.Provider value={{ ...state, getColorScheme, setAppLoaded }}>
      {children}
    </ActionContext.Provider>
  );
};

const useActionContext = () => {
  return useContext(ActionContext);
};

export default useActionContext;

const styles = StyleSheet.create({});
