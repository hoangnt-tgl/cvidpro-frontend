import React, { useState } from 'react';
import { connect } from 'react-redux';

import FormRegister from '../../components/EmployeeRegister/Step1/FormRegister';
import FormRegister1 from '../../components/EmployeeRegister/Step2/FormRegister1';
import '../../components/EmployeeRegister/RegisterStyles.css';
import FormRegister2 from '../../components/EmployeeRegister/Step3/FormRegister2';
import useRegister from '../../hooks/useRegister';
import useGetOptions from '../../hooks/useGetOptions';
import RegisterLayout from '../../customComponents/RegisterLayout/RegisterLayout';
import Stepper from '../../customComponents/Stepper/Stepper';
import { useEffect } from 'react';
import Header from '../../components/Header/Header';

function Register2(props) {
  //hookforms end
  const { setInfoRegister1, setInfoRegister2, setInfoRegister3, registerUser } =
    useRegister(props.history);
  const { optionsSelect, fetchDistric, fetchWard, fetchSchoolAndMajor } =
    useGetOptions(true);
  const [step, setStep] = useState(1);
  const [childStep, setChildStep] = useState(0);
  const [childStep1, setChildStep1] = useState(0);
  const [childStep2, setChildStep2] = useState(0);

  const totalStep = [
    { step: 1, title: 'Thông tin đăng nhập' },
    { step: 2, title: 'Thông tin cá nhân' },
    { step: 3, title: 'Thông tin học vấn' },
  ];
  return (
    <>
      {/* <Header /> */}
      <RegisterLayout>
        <div className='font-size-14'>
          <h4 className='form-title text-uppercase'>Đăng ký tìm việc</h4>
          <Stepper
            step={childStep + childStep1 + childStep2}
            Step={step}
            totalStep={totalStep}
          />
          <div className={step === 1 ? `appear` : `register-steps`}>
            <FormRegister
              setStep={setStep}
              setInfoRegister1={setInfoRegister1}
              setChildStep={setChildStep}
            />
          </div>
          <div className={step === 2 ? ` appear` : `register-steps`}>
            <FormRegister1
              setStep={setStep}
              optionsSelect={optionsSelect}
              fetchDistric={fetchDistric}
              fetchWard={fetchWard}
              setInfoRegister2={setInfoRegister2}
              setChildStep={setChildStep1}
            />
          </div>
          <div className={step === 3 ? `appear` : `register-steps`}>
            <FormRegister2
              setStep={setStep}
              setInfoRegister3={setInfoRegister3}
              optionsSelect={optionsSelect}
              fetchSchoolAndMajor={fetchSchoolAndMajor}
              registerUser={registerUser}
              setChildStep={setChildStep2}
            />
          </div>
        </div>
      </RegisterLayout>
    </>
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
