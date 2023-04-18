import axiosInstance from '../services/AxiosInstance';

export const getListSchools = async () => {
  return await axiosInstance.get(`school/getall`).then((res) => res.data);
};

export const getListJobTitle = async () => {
  return axiosInstance.get(`job-title/getall`).then((res) => res.data);
};

export const getListLevel = async () => {
  return axiosInstance.get(`major/get-list-level`).then((res) => res.data);
};

export const getListMajorByLevel = async (level) => {
  return axiosInstance
    .get(`major/get-list-major-by-level/${level}`)
    .then((res) => res.data);
};

export const getAllListMajor = async () => {
  return axiosInstance.get(`major/get-all-list-major`).then((res) => res.data);
};

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

export const getListCompanyType = async () => {
  return axiosInstance.get(`company-type/getall`).then((res) => res.data);
};

export const getListIndustry = async () => {
  return axiosInstance.get(`industry/getall`).then((res) => res.data);
};

export const getListPosition = async () => {
  return axiosInstance.get(`position/getall`).then((res) => res.data);
};

export const getListEnvironment = async () => {
  return axiosInstance.get(`environment/getall`).then((res) => res.data);
};

export const getListQuestion = async () => {
  return axiosInstance.get(`question/getall`).then((res) => res.data);
};

export const getListLanguage = async () => {
  return axiosInstance.get(`language/get-list`).then((res) => {
    console.log(res.data);
    return res.data;
  });
};

export const getLanguageDes = async (id) => {
  return axiosInstance.get(`language/get-detail/${id}`).then((res) => {
    console.log(res.data);
    return res.data;
  });
};
export const getCertificateByLanguage = async (language) => {
  return axiosInstance
    .get(`language/certificate/${language}`)
    .then((res) => res.data);
};

// export const
