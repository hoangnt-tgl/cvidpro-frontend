import React from 'react';
import { Modal } from 'react-bootstrap';
import NormalInput from '../../../../customComponents/NormalInput/Index.jsx';
import { useRef } from 'react';

const ModalUpdatePresenter = ({
  openUpdate,
  setOpenUpdate,
  register,
  handleOnSubmit,
  handleSubmit,
  errors,
  phoneConfirm,
  emailConfirm,
}) => {
  const checkStepRef = useRef({
    email: false,
    name: false,
    phone: false,
    position: false,
  });
  const inputField = [
    {
      register: 'name',
      placeholder: 'Nhập tên người quản lý',
      title: 'Họ và tên',
      type: 'text',
      accept: '',
    },
    {
      register: 'email',
      placeholder: 'Nhập email',
      title: 'Email',
      type: 'text',
      accept: '',
      disable: emailConfirm,
    },
    {
      register: 'phone',
      placeholder: 'Nhập số điện thoại',
      title: 'Số điện thoại',
      type: 'text',
      accept: '',
      disable: phoneConfirm,
    },
    {
      register: 'position',
      placeholder: 'Nhập chức vụ',
      title: 'Chức vụ',
      type: 'text',
      accept: '',
    },
  ];
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
          <h5 className='modal-title text-center'>
            Thay đổi thông tin người quản lý
          </h5>
        </Modal.Header>
        <Modal.Body className='font-size-14'>
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

export default ModalUpdatePresenter;
