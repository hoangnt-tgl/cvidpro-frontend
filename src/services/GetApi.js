import axiosInstance from "../services/AxiosInstance";

export const getMyResume = async () => {
  return axiosInstance.get(`employee/get-my-resume`).then((res) => res.data);
};
