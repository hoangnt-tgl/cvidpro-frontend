import axiosInstance from "../services/AxiosInstance";

export const getListSchools = async () => {
  return await axiosInstance.get(`school/getall`).then((res) => res.data);
};

export const getListJobTitle = async () => {
  return axiosInstance.get(`jobtitle/getall`).then((res) => res.data);
};

export const getListLevel = async () => {
    return axiosInstance.get(`major/get-list-level`).then(res => res.data);
}

export const getListMajorByLevel = async (level) => {
    return axiosInstance.get(`major/get-list-major-by-level/${level}`).then(res => res.data);
}

export const getAllListMajor = async () => {
    return axiosInstance.get(`major/get-all-list-major`).then((res) => res.data);
}

export const getListProvince = async () => {
  return axiosInstance
    .get(`province/get-list-province`)
    .then((res) => res.data);
};

export const getListDistrict = async (province) => {
  return axiosInstance
    .get(`province/get-list-district/${province}`)
    .then((res) => res.data);
};

export const getListWard = async (province, district) => {
  return axiosInstance
    .get(`province/get-list-ward/${province}/${district}`)
    .then((res) => res.data);
};
