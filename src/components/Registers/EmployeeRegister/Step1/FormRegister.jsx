import React from 'react';
import PersonalInfo from './PersonalInfo';
import '../RegisterStyles.css'; //hook form

const FormRegister = ({ setStep, setInfoRegister1, setChildStep }) => {
  return (
    <div className=''>
      <div className='body-register'>
        <PersonalInfo
          setStep={setStep}
          setInfoRegister1={setInfoRegister1}
          setChildStep={setChildStep}
        />
      </div>
    </div>
  );
};

export default FormRegister;
