import axiosInstance from "../services/AxiosInstance";
import { formatError } from "../services/AuthService";

export const getListDepartment = async (id) => {
  return axiosInstance
    .get(`department/get-department-for-company/${id}`)
    .then((res) => res.data)
    .catch((error) => {
      formatError(error.response?.data?.message || "");
    });
};

export const getDepartmentByKey = async (key) => {
  return axiosInstance
    .get(`department/get-department-by-key/${key}`)
    .then((res) => res.data)
    .catch((error) => {
      formatError(error.response?.data?.message || "");
    });
};

export const getCandidateForDepartment = async (id, data) => {
  return axiosInstance
    .post(`order/get-order-for-department/${id}`)
    .then((res) => res.data)
    .catch((error) => {
      formatError(error.response?.data?.message || "");
    });
};

export const bookInterView = async (key, id, data) => {
  return axiosInstance
    .put(`/order/update-interview/${key}/${id}`, data)
    .then((res) => res.data)
    .catch((error) => {
      formatError(error.response?.data?.message || "");
    });
};
