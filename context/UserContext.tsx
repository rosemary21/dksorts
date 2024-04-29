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
import { SET_USER_DETAILS, SET_USER_TOKEN } from "@/utils/_enums";
import { InitialValueType } from "@/reducers/userReducer";
import { UserDetailsType } from "@/api/index.d";
import { setHeaderAuthorization } from "@/api";
import { saveUserToken } from "@/localServices/function";

interface UserContextFunctionTypes {
  setToken: (payload?: string) => void;
  setUserDetails: (payload?: UserDetailsType) => void;
}

const UserContext = createContext<InitialValueType & UserContextFunctionTypes>({
  ...userInitialValue,
  setToken: () => {},
  setUserDetails: () => {}
});

export const UserProvider: React.FC<FormProviderTypes> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, userInitialValue);

  const setToken = useCallback((payload?: string) => {
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

  useEffect(() => {
    console.log(state);
    if (state.token) {
      setHeaderAuthorization(state.token);
      saveUserToken(state.token);
    }
  }, [state.token]);

  return (
    <UserContext.Provider value={{ ...state, setToken, setUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  return useContext(UserContext);
};

export default useUserContext;

const styles = StyleSheet.create({});
