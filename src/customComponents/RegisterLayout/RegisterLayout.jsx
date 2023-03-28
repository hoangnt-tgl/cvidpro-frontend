import React from "react";
import { Link } from "react-router-dom";
import "./RegisterStyles.css";
const RegisterLayout = ({ children, isLoginPage = false }) => {
  return (
    <>
      <div className='container-fluid '>
        <div className='row register-container'>
          <div className='col-md-6 col-sm-12 col-12 bg-white d-flex align-items-start'>
            <div className=' register-wrapper'>
              <div className='container-md form-container'>
                <div className='wrapper-form'>{children}</div>
              </div>
            </div>
          </div>
          <div className='col-md-6 col-sm-12 col-12 bg-white register-img-box'>
            <div className='register-img'></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterLayout;
