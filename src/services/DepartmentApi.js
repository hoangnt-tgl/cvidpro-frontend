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
