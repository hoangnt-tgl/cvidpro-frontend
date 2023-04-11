import React from "react";
import Level from "./Level";

const FormRegister2 = ({
  setStep,
  fetchSchoolAndMajor,
  setInfoRegister3,
  optionsSelect,
  registerUser,
  setChildStep,
}) => {
  return (
    <div className=''>
      <div className='body-register'>
        <Level
          setStep={setStep}
          optionsSelect={optionsSelect}
          fetchSchoolAndMajor={fetchSchoolAndMajor}
          setInfoRegister3={setInfoRegister3}
          registerUser={registerUser}
          setChildStep={setChildStep}
        />
      </div>
    </div>
  );
};

export default FormRegister2;
