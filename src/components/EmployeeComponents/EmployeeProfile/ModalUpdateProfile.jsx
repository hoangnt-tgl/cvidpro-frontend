import React from 'react';
import { Modal } from 'react-bootstrap';

const ModalUpdateProfile = ({ openUpdate, setOpenUpdate }) => {
  return (
    <Modal
      fullscreen={true}
      size='lg'
      dialogClassName='modal-90w'
      show={openUpdate}
      onHide={setOpenUpdate}
      className='modal fade modal-bx-info'
    >
      <Modal.Header closeButton>
        <div className='logo-img'>
          {/* <img alt='' src={icon} /> */}
        </div>
        <h5 className='modal-title text-center'>Cập nhật thông tin cá nhân</h5>
      </Modal.Header>
      <Modal.Body>
        <form></form>
      </Modal.Body>
      <Modal.Footer>
        {' '}
        <button
          type='button'
          className='btn btn-secondary'
          onClick={() => setOpenUpdate(false)}
        >
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalUpdateProfile;
