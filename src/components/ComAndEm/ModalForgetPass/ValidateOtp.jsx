import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRef } from 'react';
import useCountDown from '../../../hooks/useCountDown';
const ValidateOtp = ({
  setStep,
  validateOtpFc,
  isOtpStillValid,
  setIsOtpStillValid,
}) => {
  const { minutes, seconds } = useCountDown(
    20,
    isOtpStillValid,
    setIsOtpStillValid
  );
  const [otpFail, setOtpFail] = useState(false);
  const checkStepRef = useRef({
    otp: false,
  });
  const schema = yup
    .object({
      otp: yup.string().required('Vui lòng nhập mã OTP'),
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
    if (e.target.dataset.testid === 'otp') {
      if (e.target.value !== '' && !checkStepRef.current.otp) {
        checkStepRef.current.otp = true;
      }
      if (e.target.value === '' && checkStepRef.current.otp) {
        checkStepRef.current.otp = false;
      }
    }
  }
  async function handleOnSubmit(data) {
    //function validate opt
    try {
      await validateOtpFc(data.otp);
      setStep(2);
    } catch (error) {
      setOtpFail(true);
    }
  }

  return (
    <>
      {' '}
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div className='form-group'>
          <p>
            Mã OTP <span className='asterisk'></span>
          </p>
          <div style={{ padding: '0.5px 0px' }}>
            {' '}
            <input
              {...register('otp')}
              className={
                checkStepRef.current.otp
                  ? 'form-control filled'
                  : 'form-control'
              }
              placeholder='Nhập OTP'
              data-testid='otp'
              onBlur={handleCheckInput}
              disabled={!isOtpStillValid}
            />
          </div>

          {isOtpStillValid && (
            <>
              <p>
                Mã OTP có hiệu lực trong {minutes} : {seconds}
              </p>
            </>
          )}
          <div className='text-danger'>
            {errors?.otp?.message && <div>{errors.otp.message}</div>}
          </div>
          {otpFail && (
            <div className='text-danger'>
              <div className='font-size-14'>
                {' '}
                <span className='asterisk'></span>Mã OTP không đúng
              </div>
            </div>
          )}
        </div>
        <div className='form-group text-right register-btn btn-opt'>
          <button type='submit' className='site-button dz-xs-flex m-r5 btn'>
            Xác nhận
          </button>
        </div>
      </form>
    </>
  );
};

export default ValidateOtp;
