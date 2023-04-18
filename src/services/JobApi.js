import axiosInstance from '../services/AxiosInstance';
import { formatError } from '../services/AuthService';

export const createJob = async (data) => {
  return axiosInstance
    .post(`job/create`, data)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
      // formatError(error.response?.data?.message || '');
    });
};
export const updateJob = async (id, data) => {
  return axiosInstance
    .put(`job/update/${id}`, data)
    .then((res) => res.data)
    .catch((error) => {
      formatError(error.response?.data?.message || '');
    });
};

export const getJobForDepartment = async (id, key) => {
  return axiosInstance
    .get(`job/get-job-for-department/${id}/${key}`)
    .then((res) => res.data)
    .catch((error) => {
      formatError(error.response?.data?.message || '');
    });
};

export const getEmployeeForJob = async (jobId, data) => {
  return axiosInstance
    .post(`job/get-employee-for-job/${jobId}`, data)
    .then((res) => res.data)
    .catch((error) => {
      formatError(error.response?.data?.message || '');
    });
};
