import React from "react";
import "../../../EmployeeRegister/RegisterStyles.css";
import CompanyTaxInfo from "./CompanyTaxInfo";
const FormRegister1 = ({
  setStep,
  setInfoRegister2,
  optionsSelect,
  getCompanyInfo,
  registerCompany,
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
            registerCompany={registerCompany}
          />
        </div>
      </div>
    </>
  );
};

export default FormRegister1;
