import axios, { AxiosError, AxiosRequestConfig } from "axios";
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
  signal: controller.signal
});

export const setHeaderAuthorization: (token?: string) => void = (token) => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      api.defaults.headers["apiKey"] = token;
    } else {
      api.defaults.headers.common["Authorization"] = undefined;
      api.defaults.headers["apiKey"] = null;
    }
  },
  postData: (
    url: string,
    data: AllBodyType | undefined,
    options?: AxiosRequestConfig
  ) => ApiRequestResponseType = (url, data, options) => {
    return new Promise<ResponseType>((resolve, reject) => {
      if (data) {
        api
          .post(url, data, options)
          .then((res) => {
            resolve({
              type: status.success,
              code: res?.status,
              statusText: res?.statusText,
              response: (res?.data as never) ?? null
            });
          })
          .catch((err: AxiosError<ErrorResponseType, ErrorResponseType>) => {
            reject({
              type: status.error,
              code: err?.response?.status || err?.code,
              statusText:
                err?.response?.data?.responseDto?.message ??
                err?.response?.data?.error ??
                err?.response?.data?.message ??
                err?.message,
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
  getData: (
    url: string,
    options?: AxiosRequestConfig
  ) => ApiRequestResponseType = (url, options) => {
    return new Promise<ResponseType>((resolve, reject) => {
      api
        .get(url, options)
        .then((res) => {
          resolve({
            type: status.success,
            code: res?.status,
            statusText: res?.statusText,
            response: (res?.data as never) ?? null
          });
        })
        .catch((err: AxiosError<ErrorResponseType, ErrorResponseType>) => {
          reject({
            type: status.error,
            code: err?.response?.status || err?.code,
            statusText:
              err?.response?.data?.responseDto?.message ??
              err?.response?.data?.error ??
              err?.response?.data?.message ??
              err?.message,
            response: err?.response?.data || null
          });
        });
    });
  },
  putData: (
    url: string,
    data: AllBodyType | undefined,
    options?: AxiosRequestConfig
  ) => ApiRequestResponseType = (url, data, options) => {
    return new Promise<ResponseType>((resolve, reject) => {
      if (data) {
        api
          .put(url, data, options)
          .then((res) => {
            resolve({
              type: status.success,
              code: res?.status,
              statusText: res?.statusText,
              response: (res?.data as never) ?? null
            });
          })
          .catch((err: AxiosError<ErrorResponseType, ErrorResponseType>) => {
            reject({
              type: status.error,
              code: err?.response?.status || err?.code,
              statusText:
                err?.response?.data?.responseDto?.message ??
                err?.response?.data?.error ??
                err?.response?.data?.message ??
                err?.message,
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
  deleteData: (
    url: string,
    options?: AxiosRequestConfig
  ) => ApiRequestResponseType = (url, options) => {
    return new Promise<ResponseType>((resolve, reject) => {
      api
        .delete(url, options)
        .then((res) => {
          resolve({
            type: status.success,
            code: res?.status,
            statusText: res?.statusText,
            response: (res?.data as never) ?? null
          });
        })
        .catch((err: AxiosError<ErrorResponseType, ErrorResponseType>) => {
          reject({
            type: status.error,
            code: err?.response?.status || err?.code,
            statusText:
              err?.response?.data?.responseDto?.message ??
              err?.response?.data?.error ??
              err?.response?.data?.message ??
              err?.message,
            response: err?.response?.data || null
          });
        });
    });
  },
  abortOutgoingRequest = () => {
    controller.abort();
  };

export default api;
