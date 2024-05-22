import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import LoggedInContainer from "@/components/_layouts/LoggedInContainer";
import InputField from "@/components/_general/form/InputField";
import Button from "@/components/_general/Button";
import TextComponent from "@/components/_general/TextComponent";
import { whiteColor } from "../../../assets/colors";
import { router, usePathname } from "expo-router";
import {
  DashboardAction,
  generalError,
  ScreenNames,
  VerificationResponseType,
  VerificationTypes
} from "@/utils/_variables";
import { showToast, validateValues } from "@/utils/functions";
import SelectBox from "@/components/_general/form/SelectBox";
import usePayment from "@/hooks/usePayment";
import {
  CreateBillBodyType,
  PaymentSuccessfulResponseType
} from "@/api/index.d";
import useUser from "@/hooks/useUser";
import { useFormContext } from "@/context";
import { numberRegExp } from "@/utils/regex";
import { processRequest } from "@/api/functions";
import { createBillApi } from "@/api/url";
import Loader from "@/components/screen/payment/Loader";
import LottieView from "lottie-react-native";
import { BalanceLoader } from "@/assets/lotties";

const ElectricityPayment = () => {
  const { back, push } = router;
  const { userDetails } = useUser();
  const { billerOptions, billers } = usePayment(
    DashboardAction.Electricity.code
  );

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
  const [electricityPaymentForm, setElectricityPaymentForm] =
    useState(initialValue);
  const [electricityPaymentFormErr, setElectricityPaymentFormErr] =
    useState(initialValue);
  const [fee, setFee] = useState("");
  const [loading, setLoading] = useState(false);

  const processForm = useCallback(() => {
    const errors = validateValues(electricityPaymentForm, {
      customer_id: {
        required: {
          value: true,
          message: "Please provide your meter number"
        },
        regex: {
          value: numberRegExp,
          message: "PLease input a valid meter number"
        }
      },
      billerCode: {
        required: {
          value: true,
          message: "Please select your disco name"
        }
      },
      itemCode: {
        required: {
          value: true,
          message: "Please select your meter type"
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
      setElectricityPaymentFormErr((prevState) => ({
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
          ...electricityPaymentForm,
          amount: Number(electricityPaymentForm.amount),
          pin
        };
        setLoading(true);

        processRequest(createBillApi, data)
          .then((res) => {
            const response = res.response as PaymentSuccessfulResponseType;
            const rechargeToken = response?.data.recharge_token;
            setElectricityPaymentForm(initialValue);
            back();
            push({
              pathname: ScreenNames.VerificationResponse.path,
              params: {
                description: `Your electricity payment have been processed successfully. Transaction ref:${
                  response.data?.tx_ref
                }, ${rechargeToken ? `Code: ${rechargeToken}` : ""}`,
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
  }, [electricityPaymentForm, pin, setPin]);

  const pathname = usePathname();

  useEffect(() => {
    if (pathname === ScreenNames.ElectricityPayment.path && pin.length === 4) {
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
          <SelectBox
            error={electricityPaymentFormErr.billerCode}
            data={
              billers?.map(({ biller_code, name }) => ({
                key: biller_code,
                value: name
              })) || []
            }
            search={false}
            onChange={(value) => {
              if (billers) {
                const selectedBiller = billers?.find(
                  (bill) => bill.name === value
                );
                if (selectedBiller) {
                  setElectricityPaymentForm((prevState) => ({
                    ...prevState,
                    billerCode: selectedBiller.biller_code
                  }));
                  setElectricityPaymentFormErr((prevState) => ({
                    ...prevState,
                    billerCode: ""
                  }));
                }
              }
            }}
            setSelected={() => {}}
            placeholder="Select disco name"
            label="Disco name"
          />
          <InputField
            value={electricityPaymentForm.customer_id}
            error={electricityPaymentFormErr.customer_id}
            onChangeText={(customer_id) => {
              setElectricityPaymentForm((prevState) => ({
                ...prevState,
                customer_id
              }));
              setElectricityPaymentFormErr((prevState) => ({
                ...prevState,
                customer_id: ""
              }));
            }}
            label="Meter number"
            placeholder="Your meter number"
            inputMode="numeric"
            keyboardType="phone-pad"
          />

          {electricityPaymentForm.billerCode &&
            (billerOptions ? (
              <View>
                <SelectBox
                  error={electricityPaymentFormErr.itemCode}
                  data={
                    billerOptions[electricityPaymentForm.billerCode]?.map(
                      ({ biller_code, short_name }) => ({
                        key: biller_code,
                        value: short_name
                      })
                    ) || []
                  }
                  search={false}
                  onChange={(value) => {
                    const options =
                      billerOptions[electricityPaymentForm.billerCode];
                    const selectedOption = options.find(
                      ({ short_name }) => short_name === value
                    );
                    if (selectedOption) {
                      setElectricityPaymentForm((prevState) => ({
                        ...prevState,
                        itemCode: selectedOption.item_code
                      }));
                      setElectricityPaymentFormErr((prevState) => ({
                        ...prevState,
                        itemCode: ""
                      }));
                      setFee(selectedOption.fee.toString());
                    }
                  }}
                  setSelected={() => {}}
                  placeholder="Select meter type"
                  label="Meter type"
                />
                {fee && (
                  <TextComponent
                    style={{
                      opacity: 0.6
                    }}
                  >
                    ₦{fee}
                  </TextComponent>
                )}
              </View>
            ) : (
              <View
                style={{
                  width: 100,
                  height: 30,
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden"
                }}
              >
                <LottieView
                  source={BalanceLoader}
                  autoPlay
                  loop
                  style={{
                    width: 250,
                    height: 250
                  }}
                />
              </View>
            ))}
          <InputField
            value={electricityPaymentForm.amount}
            error={electricityPaymentFormErr.amount}
            onChangeText={(amount) => {
              setElectricityPaymentForm((prevState) => ({
                ...prevState,
                amount
              }));
              setElectricityPaymentFormErr((prevState) => ({
                ...prevState,
                amount: ""
              }));
            }}
            label="Amount (₦)"
            placeholder="Input amount"
            inputMode="numeric"
            keyboardType="phone-pad"
          />

          <Button
            loading={loading}
            action={processForm}
            type="primary"
            style={{
              alignItems: "center"
            }}
          >
            <TextComponent color={whiteColor.default}>Pay</TextComponent>
          </Button>
        </>
      ) : (
        <Loader />
      )}
    </LoggedInContainer>
  );
};

export default ElectricityPayment;

const styles = StyleSheet.create({});
