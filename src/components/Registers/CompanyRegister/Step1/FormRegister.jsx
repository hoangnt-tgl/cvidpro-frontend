import React from "react";
import CompanyInfo from "./CompanyInfo";
import "../../../EmployeeRegister/RegisterStyles.css";
const FormRegister = ({ setStep, setInfoRegister1, fetchFieldOptions }) => {
  return (
    <>
      {" "}
      <div className=''>
        <div className='body-register'>
          <CompanyInfo
            fetchFieldOptions={fetchFieldOptions}
            setStep={setStep}
            setInfoRegister1={setInfoRegister1}
          />
        </div>
      </div>
    </>
  );
};

export default FormRegister;
