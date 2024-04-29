import { getSecureData, storeSecureData } from ".";
import { serviceKeys } from "./variables";

export const saveUserToken = (token: string): Promise<void> => {
  return storeSecureData(serviceKeys.token, token);
};
export const getUserToken = (): Promise<string | null> => {
  return getSecureData(serviceKeys.token);
};
