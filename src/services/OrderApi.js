import axiosInstance from "../services/AxiosInstance";
import { formatError } from "../services/AuthService";


// newOrder: {jobId, employeeId, rating: enum: ["A", "B", "C"], comment: string, sender: enum: ["employee", "company"]}
export const createOrder = async (newOrder) => {
  return axiosInstance
    .post(`order/create`, newOrder)
    .then((res) => res.data)
    .catch((error) => {
      formatError(error.response?.data?.message || "");
    });
};
