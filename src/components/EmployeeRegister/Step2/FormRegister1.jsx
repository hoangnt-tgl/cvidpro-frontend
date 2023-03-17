import React from "react";
import Address from "./Address";

const FormRegister1 = ({
  setStep,
  optionsSelect,
  fetchDistric,
  fetchWard,
  setInfoRegister2,
}) => {
  return (
    <div className=''>
      <div className='body-register'>
        <Address
          setStep={setStep}
          optionsSelect={optionsSelect}
          fetchDistric={fetchDistric}
          fetchWard={fetchWard}
          setInfoRegister2={setInfoRegister2}
        />
      </div>
    </div>
  );
};

export default FormRegister1;
