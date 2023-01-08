import axiosInstance from "../services/AxiosInstance";
import { formatError } from "../services/AuthService";
export const getInfoCompany = async (mst) => {
  return axiosInstance
    .get(`company/get-info-by-mst/${mst}`)
    .then((res) => res.data).catch((error) => {
      console.log(error);
      formatError(error.response?.data?.message || "");
    });
};

export const getMyCompany = async (history) => {
  return axiosInstance
    .get(`company/get-my-info`)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
      history.push("/company/login");
    });
};

export const createDepartment = async (id, data) => {
  return axiosInstance
    .post(`company/create-department/${id}`, data)
    .then((res) => res.data).catch((error) => {
      console.log(error);
      formatError(error.response?.data?.message || "");
    });
}

export const getCountCompany = async () => {
  return axiosInstance
    .get(`company/get-count`)
    .then((res) => res.data).catch((error) => {
      console.log(error);
      formatError(error.response?.data?.message || "");
    });
}

export const getDepartmentByKey = async (key) => {
  return axiosInstance
    .get(`company/get-department-by-key/${key}`)
    .then((res) => res.data).catch((error) => {
      console.log(error);
      formatError(error.response?.data?.message || "");
    });
}

export const createJobForDepartment = async (id, data) => {
  return axiosInstance
    .post(`company/create-job-for-department/${id}`, data)
    .then((res) => res.data).catch((error) => {
      console.log(error);
      formatError(error.response?.data?.message || "");
    });
}

export const deleteJobForDepartment = async (key, idJob) => {
  return axiosInstance
    .delete(`company/delete-job-for-department/${key}/${idJob}`)
    .then((res) => res.data).catch((error) => {
      console.log(error);
      formatError(error.response?.data?.message || "");
    });
}