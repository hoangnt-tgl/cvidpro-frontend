import React from "react";
import PresenterInfo from "./PresenterInfo";

const FormRegister2 = ({
  setChildStep2,
  setStep,
  optionsSelect,
  registerCompany,
}) => {
  return (
    <div className=''>
      <div className='body-register'>
        <PresenterInfo
          setChildStep2={setChildStep2}
          setStep={setStep}
          registerCompany={registerCompany}
          optionsSelect={optionsSelect}
        />
      </div>
    </div>
  );
};

export default FormRegister2;
