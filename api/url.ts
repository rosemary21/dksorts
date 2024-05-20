import { ApiURLType } from "./index.d";
import { requestType } from "./_variables";

export const apiVersion = "/api/v1",
  baseURL = `https://javapaas-172625-0.cloudclusters.net${apiVersion}`,
  loginApi: ApiURLType = {
    method: requestType.post,
    url: "/login/customer"
  },
  signupApi: ApiURLType = {
    method: requestType.post,
    url: "/user/add"
  },
  sendOTPApi: ApiURLType = {
    method: requestType.post,
    url: "/otp/request"
  },
  verifyOTPApi: ApiURLType = {
    method: requestType.post,
    url: "/otp/authenticate"
  },
  verifyNINApi: ApiURLType = {
    method: requestType.post,
    url: "/nin/request"
  },
  verifyEmailApi: ApiURLType = {
    method: requestType.post,
    url: "/verify/email"
  },
  verifyPhoneNumberApi: ApiURLType = {
    method: requestType.post,
    url: "/verify/phonenumber"
  },
  addBVNApi: ApiURLType = {
    method: requestType.post,
    url: "/bvn"
  },
  setPinApi: ApiURLType = {
    method: requestType.post,
    url: "/pin"
  },
  validatePinApi: ApiURLType = {
    method: requestType.post,
    url: "/pin/validatepin"
  },
  fetchBillerApi: (code: string) => ApiURLType = (code) => ({
    method: requestType.get,
    url: `/billspayment/billers/${code}`
  }),
  fetchBillerOptionsApi: (billerCode: string) => ApiURLType = (billerCode) => ({
    method: requestType.get,
    url: `/billspayment/billercode/${billerCode}`
  }),
  createBillApi: ApiURLType = {
    method: requestType.post,
    url: "/billspayment/create"
  },
  changePinApi: ApiURLType = {
    method: requestType.post,
    url: "/pin/changepin"
  },
  changePasswordApi: ApiURLType = {
    method: requestType.post,
    url: "/user/changepassword"
  },
  resetPasswordApi: ApiURLType = {
    method: requestType.put,
    url: "/user/resetpassword"
  },
  changeEmailApi: ApiURLType = {
    method: requestType.put,
    url: "/user/resetemail"
  },
  changePhoneNumberApi: ApiURLType = {
    method: requestType.put,
    url: "/user/resetphonenumber"
  },
  changeProfileApi: ApiURLType = {
    method: requestType.post,
    url: "/user/resetprofile"
  },
  sendChangePasswordOTPApi: ApiURLType = {
    method: requestType.post,
    url: "/forgot-password/send-otp"
  },
  verifyChangePasswordOTPApi: ApiURLType = {
    method: requestType.post,
    url: "/forgot-password/verify-otp"
  },
  fetchUserDetailsApi: ApiURLType = {
    method: requestType.get,
    url: "/user/userid"
  };
