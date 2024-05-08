import { AxiosRequestConfig } from "axios";
import { deleteData, getData, postData, putData } from ".";
import { requestType } from "./_variables";
import {
  AllBodyType,
  ApiRequestResponseType,
  ApiURLType,
  ResponseType
} from "./index.d";

export const processRequest: (
  api: ApiURLType,
  data?: AllBodyType | undefined,
  options?: AxiosRequestConfig
) => ApiRequestResponseType = (api, data, options) => {
  return new Promise<ResponseType>((resolve, reject) => {
    if (api.method === requestType.post) {
      postData(api.url, data, options)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    } else if (api.method === requestType.put) {
      putData(api.url, data, options)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    } else if (api.method === requestType.get) {
      getData(api.url, options)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    } else if (api.method === requestType.delete) {
      deleteData(api.url, options)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    } else {
      console.error(
        `api method not recognized. method must be a value of ${requestType.delete} | ${requestType.post} |  ${requestType.put} | ${requestType.get}`
      );
    }
  });
};
