import React from "react";
import CompanyInfo from "./CompanyInfo";
import "../../../EmployeeRegister/RegisterStyles.css";
const FormRegister = ({ setStep, setInfoRegister1, fetchFieldOptions }) => {
  return (
    <>
      {" "}
      <div className=''>
        {/* <div className='header-register'>
          <h3 className='form-title m-t0'>Đăng ký người doanh nghiệp</h3>
          <div className='m-b5'>
            <div className='dez-separator bg-primary style-liner'></div>
          </div>
        </div> */}
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
