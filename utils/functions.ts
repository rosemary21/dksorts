import { LayoutChangeEvent, Vibration } from "react-native";
import { VibrationTypes } from "./types";
import { vibrationLengths } from "./data";
import Toast, { ToastOptions } from "react-native-root-toast";
import { Clipboard } from "react-native";

export const backspaceText: (
  text: string,
  backspaceLength?: number
) => string = (text, backspaceLength = 1) => {
  let newText = "";

  if (text.length <= backspaceLength) {
    newText = "";
  } else {
    newText = text.slice(0, text.length - backspaceLength);
  }
  return newText;
};

export const validateValues: <T>(
  data: T | any,
  validation?: {
    [name: string]:
      | {
          required?: boolean & {
            value: boolean;
            message: string;
          } & any;
          regex?: RegExp & {
            value: RegExp;
            message: string;
          } & any;
          minLength?: number & {
            value: number;
            message: string;
          } & any;
          maxLength?: number & {
            value: number;
            message: string;
          } & any;
          min?: number & {
            value: number;
            message: string;
          } & any;
          max?: number & {
            value: number;
            message: string;
          } & any;
        } & boolean &
          any;
  }
) => {
  [name: string]: string;
} | null = (data, validation) => {
  let error: { [name: string]: string } | null = null;

  if (!data || typeof data !== "object") {
    data = {};
  }

  if (
    data &&
    typeof data === "object" &&
    validation &&
    typeof validation === "object"
  ) {
    const validationKeys = Object.keys(validation);

    validationKeys.forEach((key: string) => {
      const value = data[key];
      const validationValue = validation[key];

      if (validationValue) {
        console.log(
          validationValue.maxLength &&
            !isNaN(Number(validationValue.maxLength)) &&
            value.toString().length < validationValue.maxLength
        );
        console.log(
          validationValue?.maxLength?.value &&
            !isNaN(Number(validationValue?.maxLength?.value)) &&
            value.toString().length < validationValue?.maxLength?.value
        );
        if (
          typeof validationValue !== "object" &&
          (!value || value.length < 1)
        ) {
          error = {
            ...error,
            [key]: `Please provide your ${key}`
          };
        } else {
          if (
            (validationValue.required || validationValue?.required?.value) &&
            (!value || value.length < 1)
          ) {
            error = {
              ...error,
              [key]:
                validationValue.required.message || `Please provide your ${key}`
            };
          } else if (
            !isNaN(Number(value)) &&
            ((validationValue.min &&
              !isNaN(Number(validationValue.min)) &&
              Number(value) < validationValue.min) ||
              (validationValue?.min?.value &&
                !isNaN(Number(validationValue?.min?.value)) &&
                Number(value) < validationValue.min.value))
          ) {
            error = {
              ...error,
              [key]:
                validationValue?.min?.message ||
                `Your ${key} must not be less than ${validation.min}`
            };
          } else if (
            !isNaN(Number(value)) &&
            ((validationValue.max &&
              !isNaN(Number(validationValue.max)) &&
              Number(value) > validationValue.max) ||
              (validationValue?.max?.value &&
                !isNaN(Number(validationValue?.max?.value)) &&
                Number(value) > validationValue?.max?.value))
          ) {
            error = {
              ...error,
              [key]:
                validationValue?.max?.message ||
                `Your ${key} must not be greater than ${validation.max}`
            };
          } else if (
            (validationValue.minLength &&
              !isNaN(Number(validationValue.minLength)) &&
              value.toString().length < validationValue.minLength) ||
            (validationValue?.minLength?.value &&
              !isNaN(Number(validationValue?.minLength?.value)) &&
              value.toString().length < validationValue?.minLength?.value)
          ) {
            error = {
              ...error,
              [key]:
                validationValue?.minLength?.message ||
                `Your ${key} must not be less than ${validation.minLength} characters`
            };
          } else if (
            (validationValue.maxLength &&
              !isNaN(Number(validationValue.maxLength)) &&
              value.toString().length > validationValue.maxLength) ||
            (validationValue?.maxLength?.value &&
              !isNaN(Number(validationValue?.maxLength?.value)) &&
              value.toString().length > validationValue?.maxLength?.value)
          ) {
            error = {
              ...error,
              [key]:
                validationValue?.maxLength?.message ||
                `Your ${key} must not be greater than ${validation.maxLength} characters`
            };
          } else if (
            (validationValue.regex &&
              !validationValue?.regex?.value &&
              !validationValue.regex.test(value)) ||
            (validationValue?.regex?.value &&
              !validationValue?.regex?.value.test(value))
          ) {
            error = {
              ...error,
              [key]:
                validationValue?.regex?.message || `Please input a valid ${key}`
            };
          }
        }
      }
    });
  }

  return error;
};

export const copyToClipboard = (text: string) => {
  Clipboard.setString(text);
};

export const addText: (
  text: string,
  letter: string,
  maxLetter?: number
) => string = (text, letter, maxLetter) => {
  let newText = "";

  if (letter) {
    if (maxLetter && text.length < maxLetter) {
      newText = text + letter;
    } else {
      if (text) {
        newText = text;
      }
    }
  }

  return newText;
};

export const convertObjectToArray = <T extends Record<string, any>>(
  data: T
): Array<T[keyof T]> => {
  const objectData = Object.keys(data).map((key) => data[key]);
  return objectData;
};

export const Vibrate: (type: VibrationTypes) => void = (type = "short") => {
  Vibration.vibrate(vibrationLengths[type]);
};

export const constructVerificationTypeObject = (
  verificationType: string,
  email?: string,
  phone?: string
) => ({
  verificationType,
  email,
  phone
});

export const getComponentLayoutProperties: (data: LayoutChangeEvent) => {
  x: number;
  y: number;
  width: number;
  height: number;
} = (data) => {
  var { x, y, width, height } = data.nativeEvent.layout;

  return { x, y, width, height };
};

export const regexTester = (regex: string | RegExp, text: string) => {
  return new RegExp(regex).test(text);
};

export const formatSeconds = (sec: number) => {
  var formatedSec = "0",
    secType = "s";

  if (sec) {
    var newSec: number = parseInt((sec / 1000) as unknown as string);

    if (newSec < 60) {
      formatedSec = `0.${newSec}`;
    } else {
      var secs: number = parseInt((newSec / 60) as unknown as string);
      var remainingSec: number = newSec - secs * 60;
      formatedSec = `${secs}.${remainingSec}`;
    }
  }
  return `${formatedSec}${secType}`;
};

export const showToast = (message: string, options?: ToastOptions): void => {
  Toast.show(message, {
    position: Toast.positions.BOTTOM,
    animation: true,
    hideOnPress: true,
    ...options
  });
};

export const greeting = (): string => {
  let defaultGreeting = "Good morning";
  const date = new Date(),
    hour = date.getHours();

  if (hour >= 16) {
    defaultGreeting = "Good evening";
  } else if (hour >= 12) {
    defaultGreeting = "Good afternoon";
  }
  return defaultGreeting;
};
