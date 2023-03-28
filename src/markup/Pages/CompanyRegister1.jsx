import React, { useState } from "react";
import { connect } from "react-redux";
import RegisterLayout from "../../customComponents/RegisterLayout/RegisterLayout";
import FormRegister from "../../components/Registers/CompanyRegister/Step1/FormRegister";
import FormRegister1 from "../../components/Registers/CompanyRegister/Step2/FormRegister1";
import useRegister from "../../hooks/useRegister";
import useGetOptions from "../../hooks/useGetOptions";
import Stepper from "../../customComponents/Stepper/Stepper";
import FormRegister2 from "../../components/Registers/CompanyRegister/Step3/FormRegister2";
import Header from "../../components/Header/Header";

function Register2(props) {
  const { setInfoRegister1, setInfoRegister2, registerCompany, infoRegister1 } =
    useRegister(props.history);
  const { optionsSelect, fetchFieldOptions, getCompanyInfo } =
    useGetOptions(false);
  const [step, setStep] = useState(1);
  const [childStep, setChildStep] = useState(0);
  const [childStep1, setChildStep1] = useState(0);
  const [childStep2, setChildStep2] = useState(0);
  let totalStep = [
    { step: 1, title: "Thông tin đăng nhập" },
    { step: 2, title: "Thông tin doanh nghiệp" },
    { step: 3, title: "Thông tin người đại diện" },
  ];

  return (
    <>
      <Header />
      <RegisterLayout>
        <h3 className='form-title m-t0'>Đăng ký tuyển dụng</h3>
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
        <div className={step === 3 ? `appear` : `register-steps`}>
          <FormRegister2
            setStep={setStep}
            setChildStep2={setChildStep2}
            optionsSelect={optionsSelect}
            registerCompany={registerCompany}
          />
        </div>
      </RegisterLayout>
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
export default connect(mapStateToProps)(Register2);
