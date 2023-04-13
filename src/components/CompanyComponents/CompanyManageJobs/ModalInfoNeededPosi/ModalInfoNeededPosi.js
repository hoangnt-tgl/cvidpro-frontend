import React from "react";
import { Modal } from "react-bootstrap";
import icon from "../../../../images/logo/icon2.png";
const ModalInfoNeededPosi = ({ company, setCompany, info }) => {
  return (
    <>
      {" "}
      <Modal
        show={company}
        onHide={setCompany}
        className='modal fade modal-bx-info'
      >
        <div className='modal-dialog my-0 w-100' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <div className='logo-img'>
                <img alt='' src={icon} />
              </div>
              <h5 className='modal-title'>Company Name</h5>
              <button type='button' className='close' onClick={setCompany}>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <ul>
                <li>
                  <strong>Job Title :</strong>
                  <p> {info.position} </p>
                </li>
                <li>
                  <strong>Experience :</strong>
                  <p>{info.experience}</p>
                </li>
                <li>
                  <strong>Deseription :</strong>
                  <p>{info.description}</p>
                </li>
              </ul>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                onClick={setCompany}
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

export default ModalInfoNeededPosi;
