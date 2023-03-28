import React from "react";
import CompanyInfo from "./CompanyInfo";
import "../../../EmployeeRegister/RegisterStyles.css";
const FormRegister = ({
  setStep,
  setInfoRegister1,
  fetchFieldOptions,
  getCompanyInfo,
  setChildStep,
  setIsStep2,
}) => {
  return (
    <>
      {" "}
      <div className=''>
        <div className='body-register'>
          <CompanyInfo
            setChildStep={setChildStep}
            fetchFieldOptions={fetchFieldOptions}
            setStep={setStep}
            getCompanyInfo={getCompanyInfo}
            setInfoRegister1={setInfoRegister1}
            setIsStep2={setIsStep2}
          />
        </div>
      </div>
    </>
  );
};

export default FormRegister;
