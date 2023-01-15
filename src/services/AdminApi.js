import axios from "axios";
import { BASE_URL } from "../config";
import { formatError } from "../services/AuthService";
export const getRole = async (token) => {
  return axios
    .get(`${BASE_URL}admin/get-role`, {
      headers: {
        Authorization: `Basic ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      formatError(error.response?.data?.message || "");
    });
};

export const confirmResume = async (id, times, token, note) => {
  return axios
    .post(
      `${BASE_URL}admin/confirm-resume/${id}/${times}`,
      { note },
      {
        headers: {
          Authorization: `Basic ${token}`,
        },
      }
    )
    .then((res) => res.data)
    .catch((error) => {
      formatError(error.response?.data?.message || "");
    });
};

export const rejectResume = async (id, times, token, note) => {
  return axios
    .post(
      `${BASE_URL}admin/not-confirm-resume/${id}/${times}`,
      { note },
      {
        headers: {
          Authorization: `Basic ${token}`,
        },
      }
    )
    .then((res) => res.data)
    .catch((error) => {
      formatError(error.response?.data?.message || "");
    });
};

export const cancelConfirmResume = async (id, times, token, note) => {
  return axios
    .post(
      `${BASE_URL}admin/cancel-confirm-resume/${id}/${times}`,
      { note },
      {
        headers: {
          Authorization: `Basic ${token}`,
        },
      }
    )
    .then((res) => res.data)
    .catch((error) => {
      formatError(error.response?.data?.message || "");
    });
};
