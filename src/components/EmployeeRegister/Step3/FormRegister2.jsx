import React from "react";
import Level from "./Level";

const FormRegister2 = ({ setStep }) => {
  return (
    <div className=''>
      <div className='header-register'></div>
      <div className='body-register'>
        <Level setStep={setStep} />
      </div>
    </div>
  );
};

export default FormRegister2;
