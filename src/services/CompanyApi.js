import axiosInstance from "../services/AxiosInstance";

export const getInfoCompany = async (mst) => {
  return axiosInstance
    .get(`company/get-info-by-mst/${mst}`)
    .then((res) => res.data);
};
