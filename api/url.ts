import { ApiURLType } from "./index.d";
import { requestType } from "./_variables";

export const apiVersion = "/api/v1",
  baseURL = `https://javapaas-171468-0.cloudclusters.net/dp${apiVersion}`,
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
  getBVNApi: ApiURLType = {
    method: requestType.post,
    url: "/bvn"
  },
  verifyBVNApi: ApiURLType = {
    method: requestType.post,
    url: "/bvn/verifybvn"
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
  checkPhoneNumberApi: ApiURLType = {
    method: requestType.post,
    url: "/user/checkpassword"
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
    method: requestType.post,
    url: "/user/resetpassword"
  },
  changeEmailApi: ApiURLType = {
    method: requestType.post,
    url: "/user/resetemail"
  },
  changePhoneNumberApi: ApiURLType = {
    method: requestType.post,
    url: "/user/resetphonenumber"
  },
  resetPinApi: ApiURLType = {
    method: requestType.post,
    url: "/pin/resetpin"
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
  fetchUserDetailsApi = (page: number = 0): ApiURLType => ({
    method: requestType.get,
    url: `/user/userid/${page}`
  });
