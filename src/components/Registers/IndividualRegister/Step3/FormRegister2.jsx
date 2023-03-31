import React from 'react';
import PresenterInfo from './PresenterInfo';

const FormRegister2 = ({
  setChildStep1,
  setStep,
  optionsSelect,
  registerCompany,
  setInfoRegister1,
  fetchFieldOptions,
  setIsStep2,
  setOffSelect,
}) => {
  return (
    <div className=''>
      <div className='body-register'>
        <PresenterInfo
          fetchFieldOptions={fetchFieldOptions}
          setInfoRegister1={setInfoRegister1}
          setChildStep1={setChildStep1}
          setStep={setStep}
          registerCompany={registerCompany}
          optionsSelect={optionsSelect}
          setIsStep2={setIsStep2}
          setOffSelect={setOffSelect}
        />
      </div>
    </div>
  );
};

export default FormRegister2;
