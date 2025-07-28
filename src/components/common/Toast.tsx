import { toast } from "react-toastify";

const Toast = {
  success: (message: string) => {
    toast.success(message, {
      position: "top-center",
      hideProgressBar: true,
      theme: "dark",
    });
  },
  error: (message: string) => {
    toast.error(message, {
      position: "top-center",
      hideProgressBar: true,
      theme: "dark",
    });
  },
  info: (message: string) => {
    toast.info(message, {
      position: "top-center",
      hideProgressBar: true,
      theme: "dark",
    });
  },
};

export default Toast;