import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import LoggedInContainer from "@/components/_layouts/LoggedInContainer";
import InputField from "@/components/_general/form/InputField";
import Button from "@/components/_general/Button";
import TextComponent from "@/components/_general/TextComponent";
import { whiteColor } from "../../../assets/colors";
import {
  router,
  useFocusEffect,
  useLocalSearchParams,
  usePathname
} from "expo-router";
import {
  DashboardAction,
  generalError,
  ScreenNames,
  VerificationResponseType,
  VerificationTypes
} from "@/utils/_variables";
import {
  constructVerificationTypeObject,
  showToast,
  validateValues
} from "@/utils/functions";
import SelectBox from "@/components/_general/form/SelectBox";
import usePayment from "@/hooks/usePayment";
import Loader from "@/components/screen/payment/Loader";
import {
  CreateBillBodyType,
  PaymentSuccessfulResponseType
} from "@/api/index.d";
import useUser from "@/hooks/useUser";
import { processRequest } from "../../../api/functions";
import { phoneNumberRegExp2 } from "@/utils/regex";
import { useFormContext } from "@/context";
import { createBillApi } from "@/api/url";

const Airtime = () => {
  const { push, back } = router;
  const { userDetails } = useUser();

  const { billers, billerOptions } = usePayment(DashboardAction.Airtime.code);
  const { fetchUserDetails } = useUser();
  const initialValue: CreateBillBodyType = {
    country: "NG",
    customer_id: "",
    reference: "dummy text",
    amount: "",

    callback_url:
      "https://webhook.site/#!/view/df95cc29-1556-4e39-85ff-180fae09f3e8",
    billerCode: "",
    itemCode: "",
    pin: ""
  };
  const { pin, setPin } = useFormContext();
  const [airtimePaymentForm, setAirtimePaymentForm] = useState(initialValue);
  const [airtimePaymentFormErr, setAirtimePaymentFormErr] =
    useState(initialValue);
  const [loading, setLoading] = useState(false);
  const processForm = useCallback(() => {
    const errors = validateValues(airtimePaymentForm, {
      customer_id: {
        required: {
          value: true,
          message: "Please provide your mobile number"
        },
        regex: {
          value: phoneNumberRegExp2,
          message: "PLease input a valid mobile number"
        }
      },
      billerCode: {
        required: {
          value: true,
          message: "Please select your network"
        }
      },
      amount: {
        required: {
          value: true,
          message: "Please input your amount"
        }
      }
    });

    if (errors) {
      setAirtimePaymentFormErr((prevState) => ({
        ...prevState,
        ...errors
      }));
    } else {
      if (!pin) {
        push({
          pathname: ScreenNames.RequestPin.path,
          params: {
            nextScreenName: ScreenNames.BuyAirtime.path
          }
        });
      }

      if (pin) {
        const data = {
          ...airtimePaymentForm,
          amount: Number(airtimePaymentForm.amount),
          pin
        };
        setLoading(true);

        processRequest(createBillApi, data)
          .then((res) => {
            console.log(res);
            const response = res.response as PaymentSuccessfulResponseType;
            setAirtimePaymentForm(initialValue);
            back();
            push({
              pathname: ScreenNames.VerificationResponse.path,
              params: {
                description: `Airtime purchased successfully. Transaction ref:${response.data?.tx_ref}`,
                type: VerificationResponseType.success
              }
            });
            fetchUserDetails();
          })
          .catch((err) => {
            push({
              pathname: ScreenNames.ErrorModal.path,
              params: {
                error: err?.response?.data?.resp?.message ?? err?.statusText
              }
            });
            showToast(err?.statusText || generalError);
          })
          .finally(() => {
            setPin("");
            setLoading(false);
          });
      }
    }
  }, [airtimePaymentForm, pin, setPin]);

  const pathname = usePathname();

  useEffect(() => {
    if (pathname === ScreenNames.BuyAirtime.path && pin.length === 4) {
      processForm();
    }
  }, [pathname, pin]);
  return (
    <LoggedInContainer
      hideNav
      contentContainerStyle={{
        gap: 20
      }}
    >
      {billers ? (
        <>
          <InputField
            value={airtimePaymentForm.customer_id}
            error={airtimePaymentFormErr.customer_id}
            onChangeText={(customer_id) => {
              setAirtimePaymentForm((prevState) => ({
                ...prevState,
                customer_id
              }));
              setAirtimePaymentFormErr((prevState) => ({
                ...prevState,
                customer_id: ""
              }));
            }}
            label="Phone number"
            placeholder="Input phone number"
            inputMode="tel"
            keyboardType="phone-pad"
          />
          <SelectBox
            data={
              billers?.map(({ biller_code, name }) => ({
                key: biller_code,
                value: name
              })) || []
            }
            error={airtimePaymentFormErr.billerCode}
            search={false}
            onChange={(value) => {
              if (billers) {
                const billerDetails = billers.find(
                  ({ name }) => name === value
                );
                if (billerDetails) {
                  let billerCode = billerDetails.biller_code,
                    itemCode = "";
                  if (billerOptions && billerOptions[billerCode]) {
                    itemCode = billerOptions[billerCode][0]?.item_code;
                  }
                  setAirtimePaymentForm((prevState) => ({
                    ...prevState,
                    billerCode,
                    itemCode
                  }));
                  setAirtimePaymentFormErr((prevState) => ({
                    ...prevState,
                    billerCode: ""
                  }));
                }
              }
            }}
            setSelected={() => {}}
            placeholder="Select Network"
            label="Network"
          />
          <InputField
            value={airtimePaymentForm.amount}
            error={airtimePaymentFormErr.amount}
            onChangeText={(amount) => {
              setAirtimePaymentForm((prevState) => ({
                ...prevState,
                amount
              }));
              setAirtimePaymentFormErr((prevState) => ({
                ...prevState,
                amount: ""
              }));
            }}
            label="Amount"
            placeholder="Input amount"
            inputMode="numeric"
            keyboardType="phone-pad"
          />

          <Button
            loading={loading}
            disabled={billers ? false : true}
            action={processForm}
            type="primary"
            style={{
              alignItems: "center"
            }}
          >
            <TextComponent color={whiteColor.default}>Purchase</TextComponent>
          </Button>
        </>
      ) : (
        <Loader />
      )}
    </LoggedInContainer>
  );
};

export default Airtime;

const styles = StyleSheet.create({});
