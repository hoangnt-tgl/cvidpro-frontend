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
        <div className='header-register'>
          <h3 className='form-title m-t0'>Đăng ký người doanh nghiệp</h3>
          <div className='m-b5'>
            <div className='dez-separator bg-primary style-liner'></div>
          </div>
          {/* <p>Vui lòng nhập chính xác thông tin</p> */}
        </div>
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
