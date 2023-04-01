import React from 'react';
//hookform
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRef } from 'react';
const PresenterInfo = ({
  setChildStep1,
  setStep,
  setInfoRegister1,
  fetchFieldOptions,
  setIsStep2,
  setOffSelect,
}) => {
  const checkStepRef = useRef({
    name: false,
    lastName: false,
    position: false,
    phone: false,
    email: false,
  });
  const schema = yup.object().shape({
    name: yup.string().required('Vui lòng nhập họ và tên lót'),
    lastName: yup.string().required('Vui lòng nhập tên'),
    phone: yup.string().required('Vui lòng nhập số điện thoại').length(10),
    email: yup
      .string()
      .required('Vui lòng nhập email')
      .email('Email không hợp lệ'),
    password: yup
      .string()
      .required('Vui lòng nhập mật khẩu')
      .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
      .max(20, 'Mật khẩu không được quá 20 ký tự'),
    confirmPassword: yup
      .string()
      .required('Vui lòng nhập lại mật khẩu')
      .min(6)
      .max(20)
      .oneOf([yup.ref('password')], 'Mật khẩu không khớp'),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  async function onHandleSubmit(data) {
    setInfoRegister1(data);
    await fetchFieldOptions();
    setOffSelect(true);
    setStep(2);
  }
  function handleCheckInput(e) {
    if (e.target.dataset.testid === 'name') {
      if (e.target.value !== '' && !checkStepRef.current.name) {
        setChildStep1((prev) => prev + 1 / 2 / 6);
        checkStepRef.current.name = true;
      }
      if (e.target.value === '' && checkStepRef.current.name) {
        setChildStep1((prev) => prev - 1 / 2 / 6);
        checkStepRef.current.name = false;
      }
    }
    if (e.target.dataset.testid === 'lastName') {
      if (e.target.value !== '' && !checkStepRef.current.lastName) {
        setChildStep1((prev) => prev + 1 / 2 / 6);
        checkStepRef.current.lastName = true;
      }
      if (e.target.value === '' && checkStepRef.current.lastName) {
        setChildStep1((prev) => prev - 1 / 2 / 6);
        checkStepRef.current.lastName = false;
      }
    }
    if (e.target.dataset.testid === 'position') {
      if (e.target.value !== '' && !checkStepRef.current.position) {
        setChildStep1((prev) => prev + 1 / 2 / 6);
        checkStepRef.current.position = true;
      }
      if (e.target.value === '' && checkStepRef.current.position) {
        setChildStep1((prev) => prev - 1 / 2 / 6);
        checkStepRef.current.position = false;
      }
    }
    if (e.target.dataset.testid === 'phone') {
      if (e.target.value !== '' && !checkStepRef.current.phone) {
        setChildStep1((prev) => prev + 1 / 2 / 6);
        checkStepRef.current.phone = true;
      }
      if (e.target.value === '' && checkStepRef.current.phone) {
        setChildStep1((prev) => prev - 1 / 2 / 6);
        checkStepRef.current.phone = false;
      }
    }
    if (e.target.dataset.testid === 'email') {
      if (e.target.value !== '' && !checkStepRef.current.email) {
        setChildStep1((prev) => prev + 1 / 2 / 6);
        checkStepRef.current.email = true;
      }
      if (e.target.value === '' && checkStepRef.current.email) {
        setChildStep1((prev) => prev - 1 / 2 / 6);
        checkStepRef.current.email = false;
      }
    }
    if (e.target.dataset.testid === 'password') {
      if (e.target.value !== '' && !checkStepRef.current.password) {
        setChildStep1((prev) => prev + 1 / 2 / 6);
        checkStepRef.current.password = true;
      }
      if (e.target.value === '' && checkStepRef.current.password) {
        setChildStep1((prev) => prev - 1 / 2 / 6);
        checkStepRef.current.password = false;
      }
    }
    if (e.target.dataset.testid === 'confirmPassword') {
      if (e.target.value !== '' && !checkStepRef.current.confirmPassword) {
        setChildStep1((prev) => prev + 1 / 2 / 6);
        checkStepRef.current.confirmPassword = true;
      }
      if (e.target.value === '' && checkStepRef.current.confirmPassword) {
        setChildStep1((prev) => prev - 1 / 2 / 6);
        checkStepRef.current.confirmPassword = false;
      }
    }

    if (
      checkStepRef.current.name ||
      checkStepRef.current.lastName ||
      checkStepRef.current.position ||
      checkStepRef.current.phone ||
      checkStepRef.current.email ||
      checkStepRef.current.password ||
      checkStepRef.current.confirmPassword
    ) {
      setIsStep2(true);
    } else if (
      !checkStepRef.current.name &&
      !checkStepRef.current.lastName &&
      !checkStepRef.current.position &&
      !checkStepRef.current.phone &&
      !checkStepRef.current.email &&
      !checkStepRef.current.password &&
      !checkStepRef.current.confirmPassword
    ) {
      setIsStep2(false);
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        {' '}
        <div className='form-group  d-flex justify-content-between'>
          <div className='w-100 mr-5'>
            {' '}
            <p>
              Họ và tên lót <span className='asterisk'></span>
            </p>
            <input
              className={
                checkStepRef.current.name
                  ? 'form-control filled'
                  : 'form-control'
              }
              placeholder='Nhập họ và tên lót'
              {...register('name')}
              data-testid='name'
              onBlur={handleCheckInput}
            />
            <div className='text-danger'>
              {errors?.name?.message && <div>{errors.name.message}</div>}
            </div>
          </div>
          <div className='w-100'>
            {' '}
            <p>
              Tên <span className='asterisk'></span>
            </p>
            <input
              className={
                checkStepRef.current.lastName
                  ? 'form-control filled'
                  : 'form-control'
              }
              placeholder='Nhập tên'
              {...register('lastName')}
              data-testid='lastName'
              onBlur={handleCheckInput}
            />
            <div className='text-danger'>
              {errors?.lastName?.message && (
                <div>{errors.lastName.message}</div>
              )}
            </div>
          </div>
        </div>
        <div className='form-group'>
          <p>
            Số điện thoại <span className='asterisk'></span>
          </p>
          <input
            className={
              checkStepRef.current.phone
                ? 'form-control filled'
                : 'form-control'
            }
            placeholder='Nhập số điện thoại'
            {...register('phone')}
            data-testid='phone'
            onBlur={handleCheckInput}
          />
          <div className='text-danger'>
            {errors?.phone?.message && <div>{errors.phone.message}</div>}
          </div>
        </div>
        <div className='form-group'>
          <p>
            Email <span className='asterisk'></span>
          </p>
          <input
            type='email'
            className={
              checkStepRef.current.email
                ? 'form-control filled'
                : 'form-control'
            }
            placeholder='Nhập email'
            {...register('email')}
            data-testid='email'
            onBlur={handleCheckInput}
          />
          <div className='text-danger'>
            {errors?.email?.message && <div>{errors.email.message}</div>}
          </div>
        </div>
        <div className='form-group'>
          <p>
            Mật khẩu <span className='asterisk'></span>
          </p>
          <input
            className={
              checkStepRef.current.password
                ? 'form-control filled'
                : 'form-control'
            }
            type='password'
            placeholder='Nhập mật khẩu'
            minLength='6'
            data-testid='password'
            {...register('password')}
            onBlur={handleCheckInput}
          />
          <div className='text-danger'>
            {errors?.password?.message && <div>{errors.password.message}</div>}
          </div>
        </div>
        <div className='form-group'>
          <p>
            Nhập lại mật khẩu <span className='asterisk'></span>
          </p>
          <input
            className={
              checkStepRef.current.confirmPassword
                ? 'form-control filled'
                : 'form-control'
            }
            type='password'
            placeholder='Nhập lại mật khẩu'
            minLength='6'
            data-testid='confirmPassword'
            {...register('confirmPassword')}
            onBlur={handleCheckInput}
          />
          <div className='text-danger'>
            {errors?.confirmPassword?.message && (
              <div>{errors.confirmPassword.message}</div>
            )}
          </div>
        </div>
        <div className='form-group '>
          <div className='form-group text-right register-btn justify-content-end'>
            <button type='submit' className='site-button dz-xs-flex m-r5 btn'>
              Tiếp tục <i className='fa fa-arrow-right' aria-hidden='true'></i>
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default PresenterInfo;
