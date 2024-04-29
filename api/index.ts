import axios, { AxiosError } from "axios";
import { baseURL } from "./url";
import {
  AllBodyType,
  ApiRequestResponseType,
  ErrorResponseType,
  ResponseType
} from "./index.d";
import { status } from "./_variables";

const controller = new AbortController();

const api = axios.create({
  baseURL,
  timeout: 2000,
  signal: controller.signal
});

export const setHeaderAuthorization: (token: string) => void = (token) => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `${token}`;
    }
  },
  postData: (
    url: string,
    data: AllBodyType | undefined
  ) => ApiRequestResponseType = (url, data) => {
    return new Promise<ResponseType>((resolve, reject) => {
      if (data) {
        api
          .post(url, data)
          .then((res) => {
            resolve({
              type: status.success,
              code: res?.status,
              statusText: res?.statusText,
              response: res?.data || null
            });
          })
          .catch((err: AxiosError<ErrorResponseType, ErrorResponseType>) => {
            console.log(err);
            reject({
              type: status.error,
              code: err?.response?.status || err?.code,
              statusText: err?.response?.data?.message || err?.message,
              response: err?.response?.data || null
            });
          });
      } else {
        reject({
          type: status.error,
          code: undefined,
          statusText: "No data sent",
          response: null
        });
      }
    });
  },
  getData: (url: string) => ApiRequestResponseType = (url) => {
    return new Promise<ResponseType>((resolve, reject) => {
      api
        .get(url)
        .then((res) => {
          resolve({
            type: status.success,
            code: res?.status,
            statusText: res?.statusText,
            response: res?.data || null
          });
        })
        .catch((err: AxiosError<ErrorResponseType, ErrorResponseType>) => {
          reject({
            type: status.error,
            code: err?.response?.status || err?.code,
            statusText: err?.response?.data?.message || err?.message,
            response: err?.response?.data || null
          });
        });
    });
  },
  putData: (
    url: string,
    data: AllBodyType | undefined
  ) => ApiRequestResponseType = (url, data) => {
    return new Promise<ResponseType>((resolve, reject) => {
      if (data) {
        api
          .put(url, data)
          .then((res) => {
            resolve({
              type: status.success,
              code: res?.status,
              statusText: res?.statusText,
              response: res?.data || null
            });
          })
          .catch((err: AxiosError<ErrorResponseType, ErrorResponseType>) => {
            reject({
              type: status.error,
              code: err?.response?.status || err?.code,
              statusText: err?.response?.data?.message || err?.message,
              response: err?.response?.data || null
            });
          });
      } else {
        reject({
          type: status.error,
          code: undefined,
          statusText: "No data sent",
          response: null
        });
      }
    });
  },
  deleteData: (url: string, data: any) => ApiRequestResponseType = (
    url,
    data
  ) => {
    return new Promise<ResponseType>((resolve, reject) => {
      api
        .delete(url, data)
        .then((res) => {
          resolve({
            type: status.success,
            code: res?.status,
            statusText: res?.statusText,
            response: res?.data || null
          });
        })
        .catch((err: AxiosError<ErrorResponseType, ErrorResponseType>) => {
          reject({
            type: status.error,
            code: err?.response?.status || err?.code,
            statusText: err?.response?.data?.message || err?.message,
            response: err?.response?.data || null
          });
        });
    });
  },
  abortOutgoingRequest = () => {
    controller.abort();
  };

export default api;
