import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRef } from 'react';

import useCountDown from '../../../hooks/useCountDown';

const Step1 = ({
  getOtp,
  isGetOtp,
  isMailExist,
  setIsMailExist,
  setIsGetOtp,
}) => {
  const { minutes, seconds } = useCountDown(10, isGetOtp, setIsGetOtp);
  const checkStepRef = useRef({
    email: false,
  });
  const schema = yup
    .object({
      email: yup
        .string()
        .required('Vui lòng nhập email')
        .email('Email không hợp lệ'),
    })
    .required();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });
  function handleCheckInput(e) {
    if (e.target.dataset.testid === 'email') {
      if (e.target.value !== '' && !checkStepRef.current.email) {
        checkStepRef.current.email = true;
      }
      if (e.target.value === '' && checkStepRef.current.email) {
        checkStepRef.current.email = false;
      }
    }
  }
  async function handleOnSubmit(data) {
    //function get otp
    await getOtp(data.email);
  }

  return (
    <>
      {' '}
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div className='form-group'>
          <p>
            Email <span className='asterisk'></span>
          </p>
          <div className='wrapper-opt'>
            <div className='email-otp'>
              {' '}
              <input
                {...register('email')}
                className={
                  checkStepRef.current.email
                    ? 'form-control filled'
                    : 'form-control'
                }
                placeholder='Nhập email'
                data-testid='email'
                onChange={(e) => {
                  console.log('123');
                  setValue('email', e.target.value);
                  setIsMailExist('');
                }}
                onBlur={handleCheckInput}
              />
            </div>
            <div className='form-group text-right register-btn btn-opt'>
              <button
                type='submit'
                className='site-button dz-xs-flex m-r5 btn'
                disabled={isGetOtp}
              >
                {isGetOtp ? (
                  <>
                    {minutes} : {seconds}
                  </>
                ) : (
                  <>Lấy mã OTP</>
                )}
              </button>
            </div>
          </div>
          <div className='text-danger'>
            {errors?.email?.message && (
              <div className='font-size-14'>{errors.email.message}</div>
            )}
          </div>
          <div className='text-danger'>
            {getValues('email') && isMailExist && (
              <div className='font-size-14'>
                <span className='asterisk'></span> {isMailExist}
              </div>
            )}
          </div>
          <div>{isGetOtp && <p>Vui lòng kiểm tra mail để nhận mã OTP</p>}</div>
        </div>
      </form>
    </>
  );
};

export default Step1;
