import React, { useState, useRef } from 'react';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import NormalInput from '../../../../customComponents/NormalInput/Index.jsx';
const Index = ({ addDepartment, setAddDepartment, handleAddDepartment }) => {
  const [trigger, setTrigger] = useState(true);
  const checkStepRef = useRef({
    departmentName: false,
    managerName: false,
    managerEmail: false,
  });
  const inputField = [
    {
      register: 'departmentName',
      placeholder: 'Nhập tên phòng ban',
      title: 'Tên phòng ban',
      type: 'text',
      accept: '',
    },
    {
      register: 'managerName',
      placeholder: 'Nhập người quản lý',
      title: 'Người quản lý',
      type: 'text',
      accept: '',
    },
    {
      register: 'managerEmail',
      placeholder: 'Nhập email',
      title: 'Email',
      type: 'text',
      accept: '',
    },
  ];
  const schema = yup.object().shape({
    departmentName: yup.string().required('Vui lòng nhập tên phòng'),
    managerName: yup.string().required('Vui lòng nhập tên'),
    managerEmail: yup
      .string()
      .required('Vui lòng nhập email')
      .email('email không hợp lệ'),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  function handleCheckInput(e) {
    if (e.target.dataset.testid === 'departmentName') {
      if (e.target.value !== '' && !checkStepRef.current.departmentName) {
        checkStepRef.current.departmentName = true;
      }
      if (e.target.value === '' && checkStepRef.current.departmentName) {
        checkStepRef.current.departmentName = false;
      }
    }
    if (e.target.dataset.testid === 'managerName') {
      if (e.target.value !== '' && !checkStepRef.current.managerName) {
        checkStepRef.current.managerName = true;
      }
      if (e.target.value === '' && checkStepRef.current.managerName) {
        checkStepRef.current.managerName = false;
      }
    }
    if (e.target.dataset.testid === 'managerEmail') {
      if (e.target.value !== '' && !checkStepRef.current.managerEmail) {
        checkStepRef.current.managerEmail = true;
      }
      if (e.target.value === '' && checkStepRef.current.managerEmail) {
        checkStepRef.current.managerEmail = false;
      }
    }

    setTrigger(!trigger);
  }
  function handleOnSubmit(data) {
    console.log(data);
    handleAddDepartment(data);
  }
  return (
    <Modal
      show={addDepartment}
      onHide={setAddDepartment}
      className='modal fade modal-bx-info'
    >
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div className='modal-dialog my-0 w-100' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <div className='logo-img'>
                <img
                  alt=''
                  src={require('../../../../images/logo/icon2.png')}
                />
              </div>
              <h5 className='modal-title'>Tạo phòng ban</h5>
              <button
                type='button'
                className='close'
                onClick={() => setAddDepartment(false)}
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body font-size-14'>
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
                    />
                  </>
                );
              })}
            </div>
            <div className='modal-footer'>
              <button type='submit' className='btn btn-primary'>
                Lưu
              </button>
              <button
                type='button'
                className='btn btn-secondary'
                onClick={() => setAddDepartment(false)}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default Index;
