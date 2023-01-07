import axiosInstance from "../services/AxiosInstance";

export const getInfoCompany = async (mst) => {
  return axiosInstance
    .get(`company/get-info-by-mst/${mst}`)
    .then((res) => res.data);
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
    .then((res) => res.data);
}

export const getCountCompany = async () => {
  return axiosInstance
    .get(`company/get-count`)
    .then((res) => res.data);
}