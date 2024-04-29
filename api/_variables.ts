import { AllRequestType, ResponseStatus } from "./index.d";

export const status: {
    error: ResponseStatus;
    success: ResponseStatus;
  } = {
    error: "error",
    success: "success",
  },
  requestType: {
    post: AllRequestType;
    delete: AllRequestType;
    get: AllRequestType;
    put: AllRequestType;
  } = {
    post: "post",
    delete: "delete",
    get: "get",
    put: "put",
  };
