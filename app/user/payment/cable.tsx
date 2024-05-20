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
import {
  constructVerificationTypeObject,
  showToast,
  validateValues
} from "@/utils/functions";
import SelectBox from "@/components/_general/form/SelectBox";
import usePayment from "@/hooks/usePayment";
import useUser from "@/hooks/useUser";
import {
  CreateBillBodyType,
  PaymentSuccessfulResponseType
} from "@/api/index.d";
import { useFormContext } from "@/context";
import { numberRegExp } from "@/utils/regex";
import { createBillApi } from "@/api/url";
import { processRequest } from "@/api/functions";
import Loader from "@/components/screen/payment/Loader";
import LottieView from "lottie-react-native";
import { BalanceLoader } from "@/assets/lotties";

const CablePayment = () => {
  const { back, push } = router;

  const { billerOptions, billers } = usePayment(
    DashboardAction.TVSubscription.code
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
  const [cablePaymentForm, setCablePaymentForm] = useState(initialValue);
  const [cablePaymentFormErr, setCablePaymentFormErr] = useState(initialValue);
  const [cablePrice, setCablePrice] = useState("");
  const [loading, setLoading] = useState(false);

  const processForm = useCallback(() => {
    const errors = validateValues(cablePaymentForm, {
      customer_id: {
        required: {
          value: true,
          message: "Please provide your card number"
        },
        regex: {
          value: numberRegExp,
          message: "Please input a valid card number"
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
      }
    });

    if (errors) {
      setCablePaymentFormErr((prevState) => ({
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
          ...cablePaymentForm,
          amount: Number(cablePaymentForm.amount),
          pin
        };
        console.log(data);
        setLoading(true);

        processRequest(createBillApi, data)
          .then((res) => {
            const response = res.response as PaymentSuccessfulResponseType;
            console.log(res);
            setCablePaymentForm(initialValue);
            back();
            push({
              pathname: ScreenNames.VerificationResponse.path,
              params: {
                description: `Data purchased successfully. Transaction ref:${response.data?.tx_ref}`,
                type: VerificationResponseType.success
              }
            });
            fetchUserDetails();
          })
          .catch((err) => {
            console.log(err);
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
  }, [cablePaymentForm, pin, setPin]);

  const pathname = usePathname();

  useEffect(() => {
    if (pathname === ScreenNames.CableSubscription.path && pin.length === 4) {
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
            data={
              billers?.map(({ biller_code, name }) => ({
                key: biller_code,
                value: name
              })) || []
            }
            search={false}
            error={cablePaymentFormErr.billerCode}
            onChange={(value) => {
              if (billers) {
                const selectedBiller = billers?.find(
                  (bill) => bill.name === value
                );
                if (selectedBiller) {
                  setCablePaymentForm((prevState) => ({
                    ...prevState,
                    billerCode: selectedBiller.biller_code
                  }));
                  setCablePaymentForm((prevState) => ({
                    ...prevState,
                    itemCode: ""
                  }));
                  setCablePaymentFormErr((prevState) => ({
                    ...prevState,
                    billerCode: ""
                  }));
                  setCablePrice("");
                }
              }
            }}
            setSelected={() => {}}
            placeholder="Select cable name"
            label="Cable name"
          />
          <InputField
            value={cablePaymentForm.customer_id}
            error={cablePaymentFormErr.customer_id}
            onChangeText={(customer_id) => {
              setCablePaymentForm((prevState) => ({
                ...prevState,
                customer_id
              }));
              setCablePaymentFormErr((prevState) => ({
                ...prevState,
                customer_id: ""
              }));
            }}
            label="Card number"
            placeholder="Smart card number / IUC number"
            inputMode="numeric"
            keyboardType="phone-pad"
          />

          {cablePaymentForm.billerCode &&
            (billerOptions ? (
              <View>
                <SelectBox
                  error={cablePaymentFormErr.itemCode}
                  defaultOption={
                    cablePaymentForm.itemCode
                      ? undefined
                      : { key: "", value: "" }
                  }
                  data={
                    billerOptions[cablePaymentForm.billerCode]?.map(
                      ({ biller_code, short_name }) => ({
                        key: biller_code,
                        value: short_name
                      })
                    ) || []
                  }
                  search={false}
                  onChange={(value) => {
                    const options = billerOptions[cablePaymentForm.billerCode];
                    const selectedOption = options.find(
                      ({ short_name }) => short_name === value
                    );
                    if (selectedOption) {
                      setCablePaymentForm((prevState) => ({
                        ...prevState,
                        itemCode: selectedOption.item_code
                      }));
                      setCablePaymentFormErr((prevState) => ({
                        ...prevState,
                        itemCode: ""
                      }));
                      setCablePaymentForm((prevState) => ({
                        ...prevState,
                        amount: selectedOption.amount.toString()
                      }));
                      setCablePrice(selectedOption.amount.toString());
                    }
                  }}
                  setSelected={() => {}}
                  placeholder="Select cable plan"
                  label="Cable plan"
                />
                {cablePrice && (
                  <TextComponent
                    style={{
                      opacity: 0.6
                    }}
                  >
                    ₦{cablePrice}
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

          <Button
            action={processForm}
            loading={loading}
            type="primary"
            style={{
              alignItems: "center"
            }}
          >
            <TextComponent color={whiteColor.default}>Subscribe</TextComponent>
          </Button>
        </>
      ) : (
        <Loader />
      )}
    </LoggedInContainer>
  );
};

export default CablePayment;

const styles = StyleSheet.create({});
