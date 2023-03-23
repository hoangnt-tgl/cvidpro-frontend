import React from "react";
import CompanyInfo from "./CompanyInfo";
import "../../../EmployeeRegister/RegisterStyles.css";
const FormRegister = ({
  setStep,
  setInfoRegister1,
  fetchFieldOptions,
  getCompanyInfo,
  setChildStep,
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
          />
        </div>
      </div>
    </>
  );
};

export default FormRegister;
