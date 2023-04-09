import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRef } from 'react';
import { toast } from 'react-hot-toast';
const GetPass = ({ setOpenModal, resetPasswordFc, setStep }) => {
  const checkStepRef = useRef({
    password: false,
    confirmPassword: false,
  });
  const schema = yup
    .object({
      password: yup
        .string()
        .required('Vui lòng nhập mật khẩu')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          'Mật khẩu phải có ít nhất 8 ký tự, 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt'
        )
        .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
        .max(20, 'Mật khẩu không được quá 20 ký tự'),
      confirmPassword: yup
        .string()
        .required('Vui lòng nhập lại mật khẩu')
        .min(6)
        .max(20)
        .oneOf([yup.ref('password')], 'Mật khẩu không khớp'),
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
    if (e.target.dataset.testid === 'password') {
      if (e.target.value !== '' && !checkStepRef.current.password) {
        checkStepRef.current.password = true;
      }
      if (e.target.value === '' && checkStepRef.current.password) {
        checkStepRef.current.password = false;
      }
    }
    if (e.target.dataset.testid === 'confirmPassword') {
      if (e.target.value !== '' && !checkStepRef.current.confirmPassword) {
        checkStepRef.current.confirmPassword = true;
      }
      if (e.target.value === '' && checkStepRef.current.confirmPassword) {
        checkStepRef.current.confirmPassword = false;
      }
    }
  }
  async function handleOnSubmit(data) {
    //function reset password
    try {
      await resetPasswordFc(data.password);
      toast.success('Đổi mật khẩu thành công');
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setOpenModal(false);
    setStep(1);
  }
  return (
    <>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
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
            minLength='8'
            data-testid='password'
            {...register('password')}
            onBlur={handleCheckInput}
          />
          <div className='text-danger'>
            {errors?.password?.message && (
              <div className='font-size-14'>{errors.password.message}</div>
            )}
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
            minLength='8'
            data-testid='confirmPassword'
            {...register('confirmPassword')}
            onBlur={handleCheckInput}
          />
          <div className='text-danger'>
            {errors?.confirmPassword?.message && (
              <div className='font-size-14'>
                {errors.confirmPassword.message}
              </div>
            )}
          </div>
        </div>
        <div className='form-group text-right register-btn'>
          <button
            type='submit'
            className='site-button dz-xs-flex m-r5 btn'
            disabled={Object.keys(errors).length > 0}
          >
            Xác nhận <i className='fa fa-arrow-right' aria-hidden='true'></i>
          </button>
        </div>
      </form>
    </>
  );
};

export default GetPass;
