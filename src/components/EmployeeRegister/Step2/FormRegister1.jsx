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
      <div className='header-register'>
        {" "}
        <h3 className='form-title m-t0'>Đăng ký người tìm việc</h3>
        <div className='m-b5'>
          <div className='dez-separator bg-primary style-liner'></div>
        </div>
        <p>Vui lòng nhập chính xác thông tin</p>
      </div>
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
