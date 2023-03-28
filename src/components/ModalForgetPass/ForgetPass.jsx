import React from "react";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import GetOtp from "./GetOtp";
import GetPass from "./GetPass";
import ValidateOtp from "./ValidateOtp";
import "./styles.css";
const ForgetPass = ({ openModal, setOpenModal }) => {
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
                onClick={() => setOpenModal(false)}
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body '>
              {step === 1 && (
                <>
                  {" "}
                  <GetOtp setStep={setStep} />
                  <ValidateOtp setStep={setStep} />
                </>
              )}
              {step === 2 && (
                <>
                  <GetPass setOpenModal={setOpenModal} />
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
