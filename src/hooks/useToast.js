import { toast } from "react-hot-toast";

function toastPromise(promise, notifications) {
  toast.promise(
    promise,
    {
      loading: notifications.loading,
      success: notifications.success,
      error: notifications.error,
    },
    {
      style: {
        right: "0px",
        minWidth: "300px",
      },
    }
  );
}

export { toastPromise };
