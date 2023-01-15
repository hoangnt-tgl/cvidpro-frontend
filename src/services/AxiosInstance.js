import axios from "axios";
import { store } from "../store/store";
import { BASE_URL } from "../config";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth.auth.idToken;
  config.params = config.params || {};
  config.headers["Authorization"] = "Basic " + token;
  return config;
});

export default axiosInstance;
