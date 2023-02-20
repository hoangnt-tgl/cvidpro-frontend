import React from "react";
import CheckBox from "../../../customComponents/CheckBox/CheckBox";
import icon from "../../../images/logo/icon2.png";
import { Modal } from "react-bootstrap";
import FormAssess from "../FormAssess/FormAssess";
import { useState } from "react";
import { createOrder } from "../../../services/OrderApi";
const ModalAssess = ({ openModal, setOpenModal, jobId, employeeId }) => {
  const [input, setInput] = useState();
  const [check, setCheck] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    if (!input && !check) return;
    let data = { jobId, employeeId, input, check };
    try {
      createOrder(data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {" "}
      <Modal
        show={openModal}
        onHide={setOpenModal}
        className='modal fade modal-bx-info'
      >
        <div className='modal-dialog my-0 w-100' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <div className='logo-img'>
                <img alt='' src={icon} />
              </div>
              <h5 className='modal-title text-center'>Đánh giá</h5>
              <button
                type='button'
                className='close'
                onClick={() => setOpenModal(false)}
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body '>
              <form onSubmit={handleSubmit}>
                <div style={{ width: "fit-content", margin: "0 auto" }}>
                  <div className='d-flex'>
                    <p className='name'>Xếp loại :</p>
                    <CheckBox setCheck={setCheck} check={check} />
                  </div>
                  <FormAssess setInput={setInput} />
                </div>
                <button type='submit'>submit</button>
              </form>
            </div>

            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                onClick={() => setOpenModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalAssess;