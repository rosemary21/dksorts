import { StyleSheet, Text, View } from "react-native";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer
} from "react";
import { FormProviderTypes } from "@/utils/types";
import { userInitialValue, userReducer } from "@/reducers";
import {
  RESET_USER_CONTEXT,
  SET_USER_DETAILS,
  SET_USER_TOKEN,
  SET_USER_TRANSACTIONS
} from "@/utils/_enums";
import { InitialValueType } from "@/reducers/userReducer";
import { TransactionDetailsType, UserDetailsType } from "@/api/index.d";
import { setHeaderAuthorization } from "@/api";
import { saveUserToken } from "@/localServices/function";

interface UserContextFunctionTypes {
  setToken: (payload?: string | null) => void;
  setUserDetails: (payload?: UserDetailsType) => void;
  setUserTransactions: (payload?: TransactionDetailsType[]) => void;
  resetUserContext: () => void;
}

const UserContext = createContext<InitialValueType & UserContextFunctionTypes>({
  ...userInitialValue,
  setToken: () => {},
  setUserDetails: () => {},
  resetUserContext: () => {},
  setUserTransactions: () => {}
});

export const UserProvider: React.FC<FormProviderTypes> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, userInitialValue);

  const setToken = useCallback((payload?: string | null) => {
    dispatch({
      type: SET_USER_TOKEN,
      payload: payload || null
    });
  }, []);
  const setUserDetails = useCallback((payload?: UserDetailsType) => {
    dispatch({
      type: SET_USER_DETAILS,
      payload: payload || null
    });
  }, []);
  const setUserTransactions = useCallback(
    (payload?: TransactionDetailsType[]) => {
      dispatch({
        type: SET_USER_TRANSACTIONS,
        payload: payload || []
      });
    },
    []
  );
  const resetUserContext = useCallback(() => {
    dispatch({
      type: RESET_USER_CONTEXT
    });
  }, []);

  useEffect(() => {
    console.log(state);
    if (state.token) {
      setHeaderAuthorization(state.token);
      saveUserToken(state.token);
    }
  }, [state.token]);

  return (
    <UserContext.Provider
      value={{
        ...state,
        setToken,
        setUserDetails,
        resetUserContext,
        setUserTransactions
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  return useContext(UserContext);
};

export default useUserContext;

const styles = StyleSheet.create({});
