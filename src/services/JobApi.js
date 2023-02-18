import axiosInstance from "../services/AxiosInstance";
import { formatError } from "../services/AuthService";

export const createJob = async (data) => {
  return axiosInstance
    .post(`job/create`, data)
    .then((res) => res.data)
    .catch((error) => {
      formatError(error.response?.data?.message || "");
    });
};

export const getJobForDepartment = async (key) => {
  return axiosInstance
    .get(`job/get-job-for-department/${key}`)
    .then((res) => res.data)
    .catch((error) => {
      formatError(error.response?.data?.message || "");
    });
};
