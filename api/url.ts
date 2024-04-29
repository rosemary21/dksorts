import { ApiURLType } from "./index.d";
import { requestType } from "./_variables";

export const apiVersion = "/api/v1",
  baseURL = `https://isds-finance-be-api-c5c7396d3a18.herokuapp.com${apiVersion}`,
  loginApi: ApiURLType = {
    method: requestType.post,
    url: "/auth/login",
  },
  signupApi: ApiURLType = {
    method: requestType.post,
    url: "/registration/send-otp",
  },
  verifyRegistrationOTPApi: ApiURLType = {
    method: requestType.post,
    url: "/registration/verify-otp",
  },
  addBVNApi: ApiURLType = {
    method: requestType.post,
    url: "/registration/add-bvn",
  },
  setPinApi: ApiURLType = {
    method: requestType.post,
    url: "/registration/set-pin",
  },
  changePasswordApi: ApiURLType = {
    method: requestType.put,
    url: "/forgot-password/reset-password",
  },
  sendChangePasswordOTPApi: ApiURLType = {
    method: requestType.post,
    url: "/forgot-password/send-otp",
  },
  verifyChangePasswordOTPApi: ApiURLType = {
    method: requestType.post,
    url: "/forgot-password/verify-otp",
  };
