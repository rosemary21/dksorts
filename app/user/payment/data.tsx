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
import {
  CreateBillBodyType,
  PaymentSuccessfulResponseType
} from "@/api/index.d";
import useUser from "@/hooks/useUser";
import usePayment from "@/hooks/usePayment";
import { useFormContext } from "@/context";
import { phoneNumberRegExp2 } from "@/utils/regex";
import { createBillApi } from "@/api/url";
import { processRequest } from "@/api/functions";
import Loader from "@/components/screen/payment/Loader";
import LottieView from "lottie-react-native";
import { BalanceLoader } from "@/assets/lotties";

const PurchaseData = () => {
  const { push, back } = router;

  const { billerOptions, billers } = usePayment(DashboardAction.Data.code);

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
  const [dataPaymentForm, setDataPaymentForm] = useState(initialValue);
  const [dataPaymentFormErr, setDataPaymentFormErr] = useState(initialValue);
  const [dataPrice, setDataPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const processForm = useCallback(() => {
    const errors = validateValues(dataPaymentForm, {
      customer_id: {
        required: {
          value: true,
          message: "Please provide your phone number"
        },
        regex: {
          value: phoneNumberRegExp2,
          message: "Please input a valid phone number"
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
      setDataPaymentFormErr((prevState) => ({
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
          ...dataPaymentForm,
          amount: Number(dataPaymentForm.amount),
          pin
        };
        setLoading(true);
        console.log("data", data);
        processRequest(createBillApi, data)
          .then((res) => {
            const response = res.response as PaymentSuccessfulResponseType;
            console.log("payment response", response);
            setDataPaymentForm(initialValue);
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
  }, [dataPaymentForm, pin, setPin]);

  const pathname = usePathname();

  useEffect(() => {
    if (pathname === ScreenNames.BuyData.path && pin.length === 4) {
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
            value={dataPaymentForm.customer_id}
            error={dataPaymentFormErr.customer_id}
            onChangeText={(customer_id) => {
              setDataPaymentForm((prevState) => ({
                ...prevState,
                customer_id
              }));
              setDataPaymentFormErr((prevState) => ({
                ...prevState,
                customer_id: ""
              }));
            }}
            label="Phone number"
            placeholder="Input phone number"
            inputMode="tel"
            keyboardType="phone-pad"
          />
          {
            <SelectBox
              data={
                billers?.map(({ biller_code, name }) => ({
                  key: biller_code,
                  value: name
                })) || []
              }
              search={false}
              error={dataPaymentFormErr.billerCode}
              onChange={(value) => {
                if (billers) {
                  const selectedBiller = billers?.find(
                    (bill) => bill.name === value
                  );
                  if (selectedBiller) {
                    setDataPaymentForm((prevState) => ({
                      ...prevState,
                      billerCode: selectedBiller.biller_code
                    }));
                    setDataPaymentForm((prevState) => ({
                      ...prevState,
                      itemCode: ""
                    }));
                    setDataPaymentFormErr((prevState) => ({
                      ...prevState,
                      billerCode: ""
                    }));
                    setDataPrice("");
                  }
                }
              }}
              setSelected={() => {}}
              placeholder="Select Network"
              label="Network"
            />
          }
          <View
            style={{
              width: "100%",
              gap: 5
            }}
          >
            {dataPaymentForm.billerCode &&
              (billerOptions ? (
                <SelectBox
                  error={dataPaymentFormErr.itemCode}
                  defaultOption={
                    dataPaymentForm.itemCode
                      ? undefined
                      : { key: "", value: "" }
                  }
                  data={
                    billerOptions[dataPaymentForm.billerCode]?.map(
                      ({ biller_code, short_name }) => ({
                        key: biller_code,
                        value: short_name
                      })
                    ) || []
                  }
                  search={false}
                  onChange={(value) => {
                    const options = billerOptions[dataPaymentForm.billerCode];
                    const selectedOption = options.find(
                      ({ short_name }) => short_name === value
                    );
                    if (selectedOption) {
                      setDataPaymentForm((prevState) => ({
                        ...prevState,
                        itemCode: selectedOption.item_code
                      }));
                      setDataPaymentFormErr((prevState) => ({
                        ...prevState,
                        itemCode: ""
                      }));
                      setDataPaymentForm((prevState) => ({
                        ...prevState,
                        amount: selectedOption.amount.toString()
                      }));
                      setDataPrice(selectedOption.amount.toString());
                    }
                  }}
                  setSelected={() => {}}
                  placeholder="Select data plan"
                  label="Data plan"
                />
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
            {dataPrice && (
              <TextComponent
                style={{
                  opacity: 0.6
                }}
              >
                ₦{dataPrice}
              </TextComponent>
            )}
          </View>

          <Button
            loading={loading}
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

export default PurchaseData;

const styles = StyleSheet.create({});
