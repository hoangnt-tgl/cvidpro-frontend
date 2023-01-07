import axiosInstance from "../services/AxiosInstance";

export const getMyResume = async (history) => {
  return axiosInstance
    .get(`employee/get-my-resume`)
    .then((res) => res.data._doc)
    .catch((error) => {
      history.push("/employee/login");
    });
};
