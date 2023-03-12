import React from "react";
import { Link } from "react-router-dom";
import PersonalInfo from "./PersonalInfo";
import Address from "../Step2/Address";
import "../RegisterStyles.css";
const FormRegister = () => {
  return (
    <div className="register-steps">
      <div className='header-register'>
        <h3 className='form-title m-t0'>Đăng ký người tìm việc</h3>
        <div className='m-b5'>
          <div className='dez-separator bg-primary style-liner'></div>
        </div>
        <p>Vui lòng nhập chính xác thông tin</p>
      </div>
      <div className='body-register'>
        <PersonalInfo />
      </div>
    </div>
  );
};

export default FormRegister;
