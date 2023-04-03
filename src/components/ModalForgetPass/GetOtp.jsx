import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRef } from 'react';
import { toast } from 'react-hot-toast';

const Step1 = ({ getOtp }) => {
  const [isGet, setIsGet] = useState(false);
  const [time, setTime] = useState();
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
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });
  function handleCheckInput(e) {
    if (e.target.dataset.testid === 'email') {
      if (e.target.value !== '' && !checkStepRef.current.email) {
        checkStepRef.current.email = true;
        console.log('123');
      }
      if (e.target.value === '' && checkStepRef.current.email) {
        checkStepRef.current.email = false;
      }
    }
  }
  async function handleOnSubmit(data) {
    //function get otp
    try {
      await getOtp(data.email);
      setIsGet(true);
      setTime(6);
      new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 6000);
      }).then(() => {
        setIsGet(false);
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  useEffect(() => {
    // 01 : 00
    let timer;
    if (isGet) {
      timer = time > 0 && setInterval(() => setTime(time - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isGet, time]);
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
                onBlur={handleCheckInput}
              />
            </div>
            <div className='form-group text-right register-btn btn-opt'>
              <button
                type='submit'
                className='site-button dz-xs-flex m-r5 btn'
                disabled={isGet}
              >
                {isGet ? <>{time}</> : <>Lấy mã OTP</>}
              </button>
            </div>
          </div>
          <div className='text-danger'>
            {errors?.email?.message && <div>{errors.email.message}</div>}
          <span className='text-danger'>
            {errors?.email?.message && <div>{errors.email.message}</div>}
          </span>
          </div>
         
        </div>
      </form>
    </>
  );
};

export default Step1;
