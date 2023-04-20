import React from 'react';
import { Modal } from 'react-bootstrap';
import NormalInput from '../../../customComponents/NormalInput/Index.jsx';
import { useRef } from 'react';

const ModalUpdateEmail = ({
  openUpdate,
  setOpenUpdate,
  register,
  handleOnSubmit,
  handleSubmit,
  errors,
  inputField,
  titleModal,
}) => {
  const checkStepRef = useRef({
    email: false,
    name: false,
    phone: false,
    position: false,
  });
  // const inputField = [
  //   {
  //     register: 'email',
  //     placeholder: 'Nhập email',
  //     title: 'Email',
  //     type: 'text',
  //     accept: '',
  //     disable: emailConfirm,
  //   },
  // ];
  function handleCheckInput() {}
  return (
    <Modal
      fullscreen={true}
      show={openUpdate}
      onHide={setOpenUpdate}
      className='modal fade modal-bx-info'
    >
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <Modal.Header closeButton>
          <div className='logo-img'>{/* <img alt='' src={icon} /> */}</div>
          <h5 className='modal-title text-center'>{titleModal}</h5>
        </Modal.Header>
        <Modal.Body className='font-size-14 lessbold'>
          {inputField.map((item, idx) => {
            return (
              <>
                <NormalInput
                  key={idx}
                  accept={item.accept}
                  isFilled={checkStepRef.current[item.register]}
                  name={item.register}
                  title={item.title}
                  placeholder={item.placeholder}
                  type={item.type}
                  register={{ ...register(item.register) }}
                  errors={errors}
                  onBlur={handleCheckInput}
                  disabled={item.disable}
                />
              </>
            );
          })}
        </Modal.Body>
        <Modal.Footer>
          <button type='submit' className='btn btn-primary'>
            Lưu
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalUpdateEmail;
