import React from "react";
import "../../../EmployeeRegister/RegisterStyles.css";
import CompanyTaxInfo from "./CompanyTaxInfo";
const FormRegister1 = ({
  setStep,
  setInfoRegister2,
  optionsSelect,
  getCompanyInfo,
  infoRegister1,
  registerCompanyIn,
  setChildStep2,
  fetchDistric,
  fetchWard,
}) => {
  return (
    <>
      {" "}
      <div className=''>
        <div className='body-register'>
          <CompanyTaxInfo
            optionsSelect={optionsSelect}
            setStep={setStep}
            setInfoRegister2={setInfoRegister2}
            getCompanyInfo={getCompanyInfo}
            registerCompanyIn={registerCompanyIn}
            infoRegister1={infoRegister1}
            setChildStep1={setChildStep2}
            fetchDistric={fetchDistric}
            fetchWard={fetchWard}
          />
        </div>
      </div>
    </>
  );
};

export default FormRegister1;
