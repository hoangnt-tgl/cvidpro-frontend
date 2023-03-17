import React, { useState } from "react";
import { connect } from "react-redux";
import RegisterLayout from "../../customComponents/RegisterLayout/RegisterLayout";
import FormRegister from "../../components/Registers/CompanyRegister/Step1/FormRegister";
import FormRegister1 from "../../components/Registers/CompanyRegister/Step2/FormRegister1";
import useRegister from "../../hooks/useRegister";
import useGetOptions from "../../hooks/useGetOptions";
import Stepper from "../../customComponents/Stepper/Stepper";

function Register2(props) {
  const { setInfoRegister1, registerCompany } = useRegister(props.history);
  const { optionsSelect, fetchFieldOptions, getCompanyInfo } =
    useGetOptions(false);

  const [step, setStep] = useState(1);
  let totalStep = [
    { step: 1, title: "Thông tin đăng ký" },
    { step: 2, title: "Thông tin công ty" },
  ];

  return (
    <RegisterLayout>
      <h3 className='form-title m-t0'>Đăng ký doanh nghiệp</h3>
      <Stepper step={step} totalStep={totalStep} />
      <div className={step === 1 ? `appear` : `register-steps`}>
        <FormRegister
          setStep={setStep}
          setInfoRegister1={setInfoRegister1}
          fetchFieldOptions={fetchFieldOptions}
        />
      </div>
      <div className={step === 2 ? `appear` : `register-steps`}>
        <FormRegister1
          setStep={setStep}
          optionsSelect={optionsSelect}
          getCompanyInfo={getCompanyInfo}
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
export default connect(mapStateToProps)(Register2);
