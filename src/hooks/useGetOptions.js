import React, { useState, useEffect } from "react";
import { getInfoCompany } from "../services/CompanyApi";
import {
  getListCompanyType,
  getListDistrict,
  getListIndustry,
  getListJobTitle,
  getListLevel,
  getListMajorByLevel,
  getListProvince,
  getListSchools,
  getListWard,
} from "../services/GetListService";

const useGetOptions = (isAll) => {
  const [optionsSelect, setOpionsSelect] = useState({});
  async function fetchData() {
    let levels = await getListLevel().then((res) => {
      return res.data;
    });
    setOpionsSelect((prev) => ({
      ...prev,
      levels: levels.map((item) => ({ value: item, label: item })),
    }));
    let schools = await getListSchools().then((res) => {
      return res.data;
    });
    setOpionsSelect((prev) => ({
      ...prev,
      schools: schools.map((item) => ({
        value: item._id,
        label: item.name,
      })),
    }));

    let provinces = await getListProvince().then((res) => {
      return res.data;
    });
    setOpionsSelect((prev) => ({
      ...prev,
      provinces: provinces.map((item) => ({ value: item, label: item })),
    }));

    let jobTitles = await getListJobTitle().then((res) => {
      return res.data;
    });
    setOpionsSelect((prev) => ({
      ...prev,
      jobTitles: jobTitles.map((item) => ({
        value: item.name,
        label: item.name,
      })),
    }));
  }
  function fetchDistric(province) {
    getListDistrict(province).then((res) => {
      setOpionsSelect((prev) => ({
        ...prev,
        districts: res.data.map((item) => ({ value: item, label: item })),
      }));
    });
  }
  function fetchWard(province, district) {
    getListWard(province, district).then((res) => {
      setOpionsSelect((prev) => ({
        ...prev,
        wards: res.data.map((item) => ({ value: item, label: item })),
      }));
    });
  }
  function fetchSchoolAndMajor(level) {
    getListMajorByLevel(level).then((res) => {
      setOpionsSelect((prev) => ({
        ...prev,
        majors: res.data.map((item) => ({ value: item, label: item })),
      }));
    });
  }
  function fetchFieldOptions() {
    getListCompanyType().then((res) => {
      console.log(res.data);
      setOpionsSelect((prev) => ({
        ...prev,
        companyTypes: res.data.map((item) => ({
          value: item._id,
          label: item.name,
        })),
      }));
    });
    getListIndustry().then((res) => {
      console.log(res.data);
      setOpionsSelect((prev) => ({
        ...prev,
        field: res.data.map((item) => ({
          value: item._id,
          label: item.name,
        })),
      }));
    });
  }
  async function getCompanyInfo(taxCode) {
    return await getInfoCompany(taxCode);
  }
  useEffect(() => {
    if (isAll) {
      fetchData();
    }
  }, []);

  return {
    optionsSelect,
    fetchDistric,
    fetchWard,
    fetchSchoolAndMajor,
    fetchFieldOptions,
    getCompanyInfo,
  };
};

export default useGetOptions;
