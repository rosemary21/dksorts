import { processRequest } from "@/api/functions";
import {
  BillerOptionsType,
  BillerType,
  FetchBillerOptionResponseType,
  FetchBillerResponseType
} from "@/api/index.d";
import { fetchBillerApi, fetchBillerOptionsApi } from "@/api/url";
import React, { useEffect, useState } from "react";

type BillerOptionsListType = { [name: string]: BillerOptionsType[] };

const usePayment = (code: string) => {
  const [billers, setBillers] = useState<BillerType[] | null>(null);
  const [billerOptions, setBillerOptions] =
    useState<BillerOptionsListType | null>(null);
  const [billersError, setBillersError] = useState("");

  useEffect(() => {
    (async () => {
      if (billers) {
        setBillerOptions(null);

        try {
          const billerOptionRequest = billers.map(({ biller_code }) =>
            processRequest(fetchBillerOptionsApi(biller_code))
          );
          const allPromise = await Promise.all(billerOptionRequest);
          let options: BillerOptionsListType = {};
          billers.forEach(({ biller_code }, index) => {
            const response = allPromise[index]
              ?.response as FetchBillerOptionResponseType;
            options = {
              ...options,
              [biller_code]: response.data
            };
          });
          setBillerOptions(options);
        } catch (error) {}
      }
    })();
  }, [billers]);

  useEffect(() => {
    if (code) {
      setBillers(null);
      processRequest(fetchBillerApi(code))
        .then((res) => {
          let response = res?.response as FetchBillerResponseType;
          setBillers(response.data);
        })
        .catch((err) => {
          setBillersError(
            err?.response?.data?.resp?.message ??
              `Something went wrong! Reason: ${err?.statusText}`
          );
        });
    }
  }, [code]);
  return {
    billers,
    billerOptions
  };
};

export default usePayment;
