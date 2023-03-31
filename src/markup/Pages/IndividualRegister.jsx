import React, { useState } from "react";
import { connect } from "react-redux";
import RegisterLayout from "../../customComponents/RegisterLayout/RegisterLayout";
import FormRegister from "../../components/Registers/IndividualRegister/Step1/FormRegister";
import FormRegister1 from "../../components/Registers/IndividualRegister/Step2/FormRegister1";
import FormRegister2 from "../../components/Registers/IndividualRegister/Step3/FormRegister2";
import useRegister from "../../hooks/useRegister";
import useGetOptions from "../../hooks/useGetOptions";
import Stepper from "../../customComponents/Stepper/Stepper";
import Header from "../../components/Header/Header";

function Register3(props) {
  const {
    setInfoRegister1,
    setInfoRegister2,
    registerCompanyIn,
    infoRegister1,
  } = useRegister(props.history);
  const {
    optionsSelect,
    fetchFieldOptions,
    getCompanyInfo,
    fetchDistric,
    fetchWard,
  } = useGetOptions(true);
  const [childStep1, setChildStep1] = useState(0);
  const [childStep2, setChildStep2] = useState(0);
  const [step, setStep] = useState(1);
  let totalStep = [
    { step: 1, title: "Thông tin đăng nhập" },
    { step: 2, title: "Thông tin cơ sở" },
  ];

  return (
    <>
      {/* <Header /> */}
      {/* <RegisterLayout> */}
      {/* <h3 className='form-title mt-5'>Đăng ký</h3> */}
      <Stepper
        Step={step}
        totalStep={totalStep}
        step={childStep2 + childStep1}
      />{" "}
      <div className={step === 1 ? `appear` : `register-steps`}>
        <FormRegister2
          fetchFieldOptions={fetchFieldOptions}
          setInfoRegister1={setInfoRegister1}
          setChildStep1={setChildStep1}
          optionsSelect={optionsSelect}
          setStep={setStep}
          setIsStep2={props.setIsStep2}
        />
      </div>
      <div className={step === 2 ? `appear` : `register-steps`}>
        <FormRegister1
          setChildStep2={setChildStep2}
          setStep={setStep}
          optionsSelect={optionsSelect}
          getCompanyInfo={getCompanyInfo}
          registerCompanyIn={registerCompanyIn}
          infoRegister1={infoRegister1}
          setInfoRegister2={setInfoRegister2}
          fetchDistric={fetchDistric}
          fetchWard={fetchWard}
        />
      </div>
      {/* </RegisterLayout> */}
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};
export default connect(mapStateToProps)(Register3);
