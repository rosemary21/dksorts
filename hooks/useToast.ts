import useToastContext from "@/context/ToastContext";
import { useMemo } from "react";

const useToast = () => {
  const { setToast } = useToastContext();
  const toast = useMemo(
    () => ({
      show: (message: string) => {
        setToast({
          message,
          type: "default"
        });
      },
      error: (message: string) => {
        setToast({
          message,
          type: "error"
        });
      },
      success: (message: string) => {
        setToast({
          message,
          type: "success"
        });
      },
      warning: (message: string) => {
        setToast({
          message,
          type: "warning"
        });
      }
    }),
    []
  );

  return toast;
};

export default useToast;
