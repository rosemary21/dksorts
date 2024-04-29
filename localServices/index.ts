import * as SecureStore from "expo-secure-store";
import { status } from "./variables";

export const storeSecureData = (
  key: string,
  data: string,
  options?: SecureStore.SecureStoreOptions
): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    if (key && data) {
      SecureStore.setItemAsync(key, data, options)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    } else {
      console.error(
        `function storeSecureData Expected at least two parameters but got ${
          key || data ? 1 : "none"
        }`
      );
    }
  });
};
export const deleteSecureData = (
  key: string,
  options?: SecureStore.SecureStoreOptions
): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    if (key) {
      SecureStore.deleteItemAsync(key, options)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    } else {
      console.error(
        `function deleteSecureData Expected at least one parameters but got none`
      );
    }
  });
};
export const getSecureData = (
  key: string,
  options?: SecureStore.SecureStoreOptions
): Promise<string | null> => {
  return new Promise<string | null>((resolve, reject) => {
    if (key) {
      SecureStore.getItemAsync(key, options)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    } else {
      console.error(
        `function getSecureData Expected at least one parameters but got none`
      );
    }
  });
};
