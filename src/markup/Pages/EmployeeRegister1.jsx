import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";

import {
  loadingToggleAction,
  employeeSignupAction,
} from "../../store/actions/AuthActions";
import FormRegister from "../../components/EmployeeRegister/Step1/FormRegister";
import FormRegister1 from "../../components/EmployeeRegister/Step2/FormRegister1";
import "../../components/EmployeeRegister/RegisterStyles.css";
import FormRegister2 from "../../components/EmployeeRegister/Step3/FormRegister2";
import useRegister from "../../hooks/useRegister";
import useGetOptions from "../../hooks/useGetOptions";

function Register2(props) {
  //hookforms end
  const { setInfoRegister1, setInfoRegister2, setInfoRegister3 } =
    useRegister();
  const { optionsSelect, fetchDistric, fetchWard, fetchSchoolAndMajor } =
    useGetOptions();
  const [step, setStep] = useState(1);

  return (
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
              <div className='wrapper-form'>
                <div className={step === 1 ? `appear` : `register-steps`}>
                  <FormRegister
                    setStep={setStep}
                    setInfoRegister1={setInfoRegister1}
                  />
                </div>
                <div className={step === 2 ? ` appear` : `register-steps`}>
                  <FormRegister1
                    setStep={setStep}
                    optionsSelect={optionsSelect}
                    fetchDistric={fetchDistric}
                    fetchWard={fetchWard}
                    setInfoRegister2={setInfoRegister2}
                  />
                </div>
                <div className={step === 3 ? `appear` : `register-steps`}>
                  <FormRegister2
                    setStep={setStep}
                    setInfoRegister3={setInfoRegister3}
                    optionsSelect={optionsSelect}
                    fetchSchoolAndMajor={fetchSchoolAndMajor}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-md-6 col-sm-12 col-12 bg-white register-img'></div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};
export default connect(mapStateToProps)(Register2);
