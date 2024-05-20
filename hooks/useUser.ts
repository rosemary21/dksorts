import { StyleSheet, Text, View } from "react-native";
import React, { useCallback } from "react";
import { useUserContext } from "@/context";
import { processRequest } from "@/api/functions";
import { fetchUserDetailsApi } from "@/api/url";
import { deleteUserToken, saveUserToken } from "@/localServices/function";
import { abortOutgoingRequest, setHeaderAuthorization } from "@/api";
import { GetUserDetailsResponseType } from "@/api/index.d";

const controller = new AbortController();

const useUser = () => {
  const {
    userDetails,
    transactions,
    resetUserContext,
    setUserDetails,
    setUserTransactions,
    setToken
  } = useUserContext();

  const logoutUser = useCallback(() => {
    deleteUserToken()
      .then(() => {
        setHeaderAuthorization();
        resetUserContext();
      })
      .catch(() => {});
  }, []);

  const makeUseWithToken = useCallback(
    async (token?: string | null, isLogin?: boolean) => {
      if (token) {
        if (isLogin) {
          await saveUserToken(token);
          setToken(token);
        }
        setHeaderAuthorization(token);
      }
    },
    []
  );
  const fetchUserDetails = useCallback((func?: () => void) => {
    processRequest(
      fetchUserDetailsApi,
      {},
      {
        signal: controller.signal
      }
    )
      .then((res) => {
        const response = res?.response as GetUserDetailsResponseType;
        const userDetails = response.data.customerDetails;
        const transactionDetails = response.data.transactionDtos;
        setUserDetails(userDetails);
        setUserTransactions(transactionDetails);
        if (func && typeof func === "function") {
          func();
        }
      })
      .catch((err) => {
        const errorResponse = err?.response;
        console.log("errorResponse", errorResponse);
        if (errorResponse?.code === "cv401") {
          logoutUser();
        } else {
          setTimeout(() => {
            fetchUserDetails();
          }, 5000);
        }
      });
  }, []);
  return {
    userDetails,
    transactions,
    logoutUser,
    fetchUserDetails,
    makeUseWithToken
  };
};

export default useUser;

const styles = StyleSheet.create({});
