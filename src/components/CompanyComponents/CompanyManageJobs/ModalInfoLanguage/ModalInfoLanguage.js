import React from 'react';
import { Modal } from 'react-bootstrap';

const ModalInfoLanguage = ({ open, setOpen }) => {
  return (
    <>
      {' '}
      <Modal
        fullscreen={true}
        size='lg'
        dialogClassName='modal-90w'
        show={open}
        onHide={() => setOpen(false)}
        className='modal fade modal-bx-info'
      >
        <Modal.Header closeButton>
          <Modal.Title className='text-center'>
            Thông tin về trình độ ngoại ngữ
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row font-size-14'>
            <div className='col-12'>
              <h4 className='mb-1'>Các loại bằng cấp tiếng anh</h4>
              <p>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English. Many
                desktop publishing packages and web page editors now use Lorem
                Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy.
                Various versions have evolved over the years, sometimes by
                accident, sometimes on purpose (injected humour and the like).{' '}
              </p>
            </div>
            <div className='col-12'>
              <h4 className='mb-1'>Các loại bằng cấp tiếng nhật</h4>
              <p>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English. Many
                desktop publishing packages and web page editors now use Lorem
                Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy.
                Various versions have evolved over the years, sometimes by
                accident, sometimes on purpose (injected humour and the like).{' '}
              </p>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalInfoLanguage;
