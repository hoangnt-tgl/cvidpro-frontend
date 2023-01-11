import axiosInstance from "../services/AxiosInstance";
import {
  formatError,
} from "../services/AuthService";

export const getMyResume = async (history) => {
  return axiosInstance
    .get(`employee/get-my-resume`)
    .then((res) => res.data._doc)
    .catch((error) => {
      history.push("/employee/login");
    });
};

export const addSchool = async (id, newSchool) => {
  return axiosInstance
    .post(`employee/add-school/${id}`, newSchool)
    .then((res) => res.data)
    .catch((error) => {
      formatError(error.response?.data?.message || "");
    });
};

export const deleteSchool = async (id, schoolId) => {
  return axiosInstance
    .delete(`employee/delete-school/${id}/${schoolId}`)
    .then((res) => res.data)
    .catch((error) => {
      formatError(error.response?.data?.message || "");
    });
};

export const addShortTraining = async (id, newShortTraining) => {
  return axiosInstance
    .post(`employee/add-short-training/${id}`, newShortTraining)
    .then((res) => res.data)
    .catch((error) => {
      formatError(error.response?.data?.message || "");
    });
};

export const deleteShortTraining = async (id, shortTrainingId) => {
  return axiosInstance
    .delete(`employee/delete-short-training/${id}/${shortTrainingId}`)
    .then((res) => res.data)
    .catch((error) => {
      formatError(error.response?.data?.message || "");
    });
};

export const sendOTP = async (id, phone) => {
  return axiosInstance
    .post(`employee/send-otp/${id}`, { phone })
    .then((res) => res.data)
    .catch((error) => {
      formatError(error.response?.data?.message || "");
    });
}

export const confirmPhone = async (id, otp) => {
  return axiosInstance
    .post(`employee/confirm-phone/${id}`, { otp })
    .then((res) => res.data)
    .catch((error) => {
      formatError(error.response?.data?.message || "");
    });
}

export const addWorkExperience = async (id, newExperience) => {
  return axiosInstance
    .post(`employee/add-work-experience/${id}`, newExperience)
    .then((res) => res.data)
    .catch((error) => {
      formatError(error.response?.data?.message || "");
    });
}

export const deleteWorkExperience = async (id, experienceId) => {
  return axiosInstance
    .delete(`employee/delete-work-experience/${id}/${experienceId}`)
    .then((res) => res.data)
    .catch((error) => {
      formatError(error.response?.data?.message || "");
    });
}