import axiosInstance from "../services/AxiosInstance";
import { formatError } from "../services/AuthService";

export const createOrder = async (newOrder) => {
  return axiosInstance
    .post(`order/create`, newOrder)
    .then((res) => res.data)
    .catch((error) => {
      formatError(error.response?.data?.message || "");
    });
};
