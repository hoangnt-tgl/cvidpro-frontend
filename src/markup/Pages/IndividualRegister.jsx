import React, { useState } from "react";
import { connect } from "react-redux";
import RegisterLayout from "../../customComponents/RegisterLayout/RegisterLayout";
import FormRegister from "../../components/Registers/IndividualRegister/Step1/FormRegister";
import FormRegister1 from "../../components/Registers/IndividualRegister/Step2/FormRegister1";
import FormRegister2 from "../../components/Registers/IndividualRegister/Step3/FormRegister2";
import useRegister from "../../hooks/useRegister";
import useGetOptions from "../../hooks/useGetOptions";
import Stepper from "../../customComponents/Stepper/Stepper";

function Register3(props) {
  const { setInfoRegister1, setInfoRegister2, registerCompany, infoRegister1 } =
    useRegister(props.history);
  const { optionsSelect, fetchFieldOptions, getCompanyInfo } =
    useGetOptions(false);
  const [childStep, setChildStep] = useState(0);
  const [childStep1, setChildStep1] = useState(0);
  const [childStep2, setChildStep2] = useState(0);
  const [step, setStep] = useState(1);
  let totalStep = [
    { step: 1, title: "Thông tin đăng ký" },
    { step: 2, title: "Thông tin công ty" },
  ];

  return (
    <RegisterLayout>
      <h3 className='form-title m-t0'>Đăng ký cá nhân</h3>
      <Stepper
        Step={step}
        totalStep={totalStep}
        step={childStep + childStep1 + childStep2}
      />
      <div className={step === 1 ? `appear` : `register-steps`}>
        <FormRegister
          setChildStep={setChildStep}
          setStep={setStep}
          setInfoRegister1={setInfoRegister1}
          getCompanyInfo={getCompanyInfo}
          fetchFieldOptions={fetchFieldOptions}
        />
      </div>
      <div className={step === 2 ? `appear` : `register-steps`}>
        <FormRegister1
          setChildStep1={setChildStep1}
          setStep={setStep}
          optionsSelect={optionsSelect}
          getCompanyInfo={getCompanyInfo}
          registerCompany={registerCompany}
          infoRegister1={infoRegister1}
          setInfoRegister2={setInfoRegister2}
        />
      </div>
      <div className={step === 2 ? `appear` : `register-steps`}>
        <FormRegister2
          setChildStep2={setChildStep2}
          optionsSelect={optionsSelect}
          registerCompany={registerCompany}
        />
      </div>
    </RegisterLayout>
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
