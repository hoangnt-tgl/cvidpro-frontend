import React from "react";
import { useDispatch } from "react-redux";
import {
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
      phone: infoRegister1.phone,
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
  return {
    setInfoRegister1,
    setInfoRegister2,
    setInfoRegister3,
    registerUser,
  };
};

export default useRegister;
