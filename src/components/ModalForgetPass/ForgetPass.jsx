import React from 'react';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import GetOtp from './GetOtp';
import GetPass from './GetPass';
import ValidateOtp from './ValidateOtp';
import './styles.css';
import useResetPass from '../../hooks/useResetPass';
const ForgetPass = ({ isCompany, openModal, setOpenModal }) => {
  const {
    getOtpFc,
    resetPasswordFc,
    validateOtpFc,
    isGetOtp,
    isMailExist,
    setIsMailExist,
    isOtpStillValid,
    setIsGetOtp,
    setIsOtpStillValid,
  } = useResetPass(isCompany, 10000, 20000);
  const [step, setStep] = useState(1);

  return (
    <>
      <Modal
        show={openModal}
        onHide={setOpenModal}
        className='modal fade modal-bx-info'
      >
        <div className='modal-dialog my-0 w-100' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title text-center'>Khôi phục mật khẩu</h5>
              <button
                type='button'
                className='close'
                onClick={() => {
                  setOpenModal(false);
                  setStep(1);
                }}
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body otp-container'>
              {step === 1 && (
                <>
                  {' '}
                  <GetOtp
                    setStep={setStep}
                    getOtp={getOtpFc}
                    isGetOtp={isGetOtp}
                    isMailExist={isMailExist}
                    setIsMailExist={setIsMailExist}
                    setIsGetOtp={setIsGetOtp}
                  />
                  <ValidateOtp
                    isOtpStillValid={isOtpStillValid}
                    setStep={setStep}
                    validateOtpFc={validateOtpFc}
                    isGetOtp={isGetOtp}
                    setIsOtpStillValid={setIsOtpStillValid}
                  />
                </>
              )}
              {step === 2 && (
                <>
                  <GetPass
                    setStep={setStep}
                    setOpenModal={setOpenModal}
                    resetPasswordFc={resetPasswordFc}
                  />
                </>
              )}
            </div>

            <div className='modal-footer'></div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ForgetPass;
