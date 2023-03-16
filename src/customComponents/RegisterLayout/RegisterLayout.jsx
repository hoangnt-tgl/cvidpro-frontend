import React from "react";
import { Link } from "react-router-dom";
import "./RegisterStyles.css";
const RegisterLayout = ({ children }) => {
  return (
    <>
      <div className='container-fluid '>
        <div className='row register-container'>
          <div className='col-md-6 col-sm-12 col-12 bg-white align-middle'>
            <div className=' register-wrapper'>
              <div className='container-md form-container'>
                <div className='header-regiser'>
                  <Link to={"./"}>
                    <h1 className='m-b0'>CVIDPRO</h1>
                  </Link>
                </div>
                <div className='wrapper-form'>{children}</div>
              </div>
            </div>
          </div>
          <div className='col-md-6 col-sm-12 col-12 bg-white register-img'></div>
        </div>
      </div>
    </>
  );
};

export default RegisterLayout;
