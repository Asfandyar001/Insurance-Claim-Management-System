import { useCallback } from "react";
import { toast as notify, Bounce } from "react-toastify";

export function useToast() {
  const toast = useCallback(({ title, description, variant = "success" }) => {
    const toastType = variant === "destructive" ? "error" : "success";

    notify(`${title}`, {
      type: toastType,
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      newestOnTop: false,
      closeOnClick: false,
      rtl: false,
      pauseOnFocusLoss: true,
      draggable: false,
      pauseOnHover: true,
      theme: "colored",
      transition: Bounce
    });
  }, []);

  return { toast };
}
