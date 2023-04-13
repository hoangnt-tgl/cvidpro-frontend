import axiosInstance from '../services/AxiosInstance';
import { formatError } from '../services/AuthService';

export const getInfoCompany = async (mst) => {
  return await axiosInstance
    .get(`company/get-info-by-mst/${mst}`)
    .then((res) => res.data);
};
export const updateEmailCompany = async (data) => {
  return axiosInstance
    .patch(`company/update-email`, data)
    .then((res) => res.data);
};
export const updatePhoneCompany = async (data) => {
  return axiosInstance
    .patch(`company/update-phone`, data)
    .then((res) => res.data);
};
export const getMyCompany = async (history) => {
  return axiosInstance
    .get(`company/get-my-info`)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
      history.push('/company/login');
    });
};

export const createDepartment = async (data) => {
  return axiosInstance.post(`department/create`, data).then((res) => res.data);
};
export const editDepartment = async (data) => {
  return axiosInstance.put(`department/update`, data).then((res) => res.data);
};
export const deleteDepartment = async (id) => {
  return axiosInstance
    .delete(`department/delete/${id}`)
    .then((res) => res.data);
};
export const getCountCompany = async () => {
  return axiosInstance
    .get(`company/get-count`)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
      formatError(error.response?.data?.message || '');
    });
};

export const getDepartmentByKey = async (key) => {
  return axiosInstance
    .get(`company/get-department-by-key/${key}`)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
      formatError(error.response?.data?.message || '');
    });
};

export const deleteJobForDepartment = async (key, idJob) => {
  return axiosInstance
    .delete(`company/delete-job-for-department/${key}/${idJob}`)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
      formatError(error.response?.data?.message || '');
    });
};

export const gẹtJobDetail = async (idJob) => {
  return axiosInstance
    .get(`job/get-job-detail/${idJob}`)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
      formatError(error.response?.data?.message || '');
    });
};
