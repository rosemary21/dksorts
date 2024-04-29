import { StyleSheet } from "react-native";
import React, {
  createContext,
  useCallback,
  useContext,
  useReducer
} from "react";
import { navigationInitialValue, navigationReducer } from "@/reducers";
import { NavigationProviderTypes } from "@/utils/types";
import { SET_USER_LOCATION } from "@/utils/_enums";
import { InitialValueType, LocationType } from "@/reducers/navigationReducer";

interface NavigationContextType {
  setUserLocation: (payload: LocationType) => void;
}

const NavigationContext = createContext<
  InitialValueType & NavigationContextType
>({
  ...navigationInitialValue,
  setUserLocation: () => {}
});

export const NavigationProvider: React.FC<NavigationProviderTypes> = ({
  children
}) => {
  const [state, dispatch] = useReducer(
    navigationReducer,
    navigationInitialValue
  );

  const setUserLocation = useCallback((payload: LocationType) => {
    if (payload && payload.latitude && payload.longitude && payload.name) {
      dispatch({
        type: SET_USER_LOCATION,
        payload
      });
    } else {
      if (!payload) {
        console.error(
          "Please provide user location as parameter in the setUserLocation function"
        );
      } else {
        console.error(
          "Please provide latitude, longitude and name of user's location in the Object parameter in the setUserLocation function"
        );
      }
    }
  }, []);

  return (
    <NavigationContext.Provider value={{ ...state, setUserLocation }}>
      {children}
    </NavigationContext.Provider>
  );
};

const useNavigationContext = () => {
  return useContext(NavigationContext);
};

export default useNavigationContext;

const styles = StyleSheet.create({});
