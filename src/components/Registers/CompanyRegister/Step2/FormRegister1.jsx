import React from 'react';
import '../../../EmployeeRegister/RegisterStyles.css';
import CompanyTaxInfo from './CompanyTaxInfo';
const FormRegister1 = ({
  setStep,
  setInfoRegister2,
  optionsSelect,
  getCompanyInfo,
  infoRegister1,
  registerCompany,
  setChildStep1,
}) => {
  return (
    <>
      {' '}
      <div className=''>
        <div className='body-register'>
          <CompanyTaxInfo
            optionsSelect={optionsSelect}
            setStep={setStep}
            setInfoRegister2={setInfoRegister2}
            getCompanyInfo={getCompanyInfo}
            registerCompany={registerCompany}
            infoRegister1={infoRegister1}
            setChildStep1={setChildStep1}
          />
        </div>
      </div>
    </>
  );
};

export default FormRegister1;
