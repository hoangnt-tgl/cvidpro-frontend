import React from "react";
import { useDispatch } from "react-redux";
import {
  companySignupAction,
  employeeSignupAction,
  loadingToggleAction,
} from "../store/actions/AuthActions";

const useRegister = (history) => {
  const dispatch = useDispatch();
  const [infoRegister1, setInfoRegister1] = React.useState({});
  const [infoRegister2, setInfoRegister2] = React.useState({});
  const [infoRegister3, setInfoRegister3] = React.useState({});
  function registerUser(infoRegister3) {
    dispatch(loadingToggleAction(true));
    let data = {
      name: infoRegister1.name,
      email: infoRegister1.email,
      password: infoRegister1.password,
      username: infoRegister1.phone,
      gender: infoRegister1.gender.value,
      birthday: infoRegister1.birthday,
      address: infoRegister2.address,
      province: infoRegister2.city.value,
      district: infoRegister2.district.value,
      ward: infoRegister2.ward.value,
      school: infoRegister3.school.value,
      level: infoRegister3.level.value,
      major: infoRegister3.major.value,
      jobTitle: infoRegister3.jobTitle.value,
      startYear: infoRegister3.startYear,
      endYear: infoRegister3.endYear,
    };
    console.log(data);
    dispatch(employeeSignupAction(data, history));
  }
  function registerCompany(infoRegister3) {
    let data = {
      email: infoRegister3.email,
      password: infoRegister1.password,
      name: infoRegister3.name,
      status: infoRegister1.companyInfo.status,
      position: infoRegister3.position,
      phone: infoRegister3.phone,
      companyType: infoRegister2.companyType.value,
      field: infoRegister2.field.map((item) => item.label),
      companyName: infoRegister1.companyInfo.companyName,
      address: infoRegister1.companyInfo.address,
      username: infoRegister1.companyInfo.taxCode,
      mainIndustry: infoRegister1.mainIndustry,
      businessLicense: infoRegister2.businessLicense,
      engName: infoRegister1.companyInfo.engName,
      sortName: infoRegister1.companyInfo.sortName,
      typeOfBusiness: infoRegister1.companyInfo.typeOfBusiness,
      openDate: infoRegister1.companyInfo.ppenDate,
      companyPhone: infoRegister1.companyInfo.companyPhone,
      representative: infoRegister1.companyInfo.representative,
      managedBy: infoRegister1.companyInfo.managedBy,
    };
    console.log(data);
    dispatch(loadingToggleAction(true));
    dispatch(companySignupAction(data, history));
  }
  return {
    setInfoRegister1,
    setInfoRegister2,
    setInfoRegister3,
    registerUser,
    registerCompany,
    infoRegister1,
  };
};

export default useRegister;
