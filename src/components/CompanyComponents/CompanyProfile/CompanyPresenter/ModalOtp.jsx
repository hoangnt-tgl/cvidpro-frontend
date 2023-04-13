import React from 'react';
import { Modal } from 'react-bootstrap';
import GetOtp from '../../../ComAndEm/ModalForgetPass/GetOtp';
import ValidateOtp from '../../../ComAndEm/ModalForgetPass/ValidateOtp';
import useResetPass from '../../../../hooks/useResetPass';

const ModalOtp = ({
  openModal,
  setOpenModal,
  isCompany,
  handeUpdate,
  defaultValues,
}) => {
  const {
    getOtpFc,
    validateOtpFc,
    isGetOtp,
    isMailExist,
    setIsMailExist,
    isOtpStillValid,
    setIsGetOtp,
    setIsOtpStillValid,
  } = useResetPass(isCompany, 10000, 20000);
  return (
    <Modal
      show={openModal}
      onHide={setOpenModal}
      className='modal fade modal-bx-info'
    >
      <div className='modal-dialog my-0 w-100' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title text-center'>Xác nhận mã OTP</h5>
            <button
              type='button'
              className='close'
              onClick={() => {
                setOpenModal(false);
              }}
            >
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <div className='modal-body otp-container'>
            <GetOtp
              defaultValues={defaultValues}
              getOtp={getOtpFc}
              isGetOtp={isGetOtp}
              isMailExist={isMailExist}
              setIsMailExist={setIsMailExist}
              setIsGetOtp={setIsGetOtp}
            />
            <ValidateOtp
              isOtpStillValid={isOtpStillValid}
              setStep={(e) => {
                console.log(e);
              }}
              validateOtpFc={handeUpdate}
              isGetOtp={isGetOtp}
              setIsOtpStillValid={setIsOtpStillValid}
            />
          </div>

          <div className='modal-footer'></div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalOtp;
