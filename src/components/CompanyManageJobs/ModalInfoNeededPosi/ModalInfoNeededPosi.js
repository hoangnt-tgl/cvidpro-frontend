import React from "react";
import { Modal } from "react-bootstrap";
import icon from "../../../images/logo/icon2.png";
const ModalInfoNeededPosi = (company, setCompany) => {
  return (
    <>
      {" "}
      <Modal
        show={company}
        onHide={setCompany}
        className='modal fade modal-bx-info'
      >
        <div className='modal-dialog my-0' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <div className='logo-img'>
                <img alt='' src={icon} />
              </div>
              <h5 className='modal-title'>Company Name</h5>
              <button
                type='button'
                className='close'
                onClick={() => setCompany(false)}
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <ul>
                <li>
                  <strong>Job Title :</strong>
                  <p> Web Developer – PHP, HTML, CSS </p>
                </li>
                <li>
                  <strong>Experience :</strong>
                  <p>5 Year 3 Months</p>
                </li>
                <li>
                  <strong>Deseription :</strong>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry has been the industry's standard dummy
                    text ever since.
                  </p>
                </li>
              </ul>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                onClick={() => setCompany(false)}
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
