import React, { useEffect, useRef } from 'react';
//hookform
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const CompanyInfo = ({
  setInfoRegister1,
  setStep,
  fetchFieldOptions,
  getCompanyInfo,
  setChildStep,
}) => {
  const checkStepRef = useRef({
    taxCode: false,
    password: false,
    confirmPassword: false,
  });
  const schema = yup.object().shape({
    taxCode: yup
      .string()
      .required('Vui lòng nhập mã số thuế')
      .min(10)
      .typeError('Mã số thuế không hợp lệ'),
    companyInfo: yup.object().required('Vui lòng đợi lấy thông tin công ty'),
    password: yup
      .string()
      .required('Vui lòng nhập mật khẩu')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Mật khẩu phải có ít nhất 8 ký tự, 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt'
      )
      .min(8, 'Mật khẩu phải có ít nhất 6 ký tự')
      .max(20, 'Mật khẩu không được quá 20 ký tự'),
    confirmPassword: yup
      .string()
      .required('Vui lòng nhập lại mật khẩu')
      .min(8)
      .max(20)
      .oneOf([yup.ref('password')], 'Mật khẩu không khớp'),
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({

    resolver: yupResolver(schema),
  });
  async function handleGetLegalCompanyInfo(e) {
    handleCheckInput(e);
    if (e.target.value.length < 10) return;
    let companyData = await getCompanyInfo(e.target.value);
    setValue('companyInfo', companyData);
  }
  async function onHandleSubmit(data) {
    setInfoRegister1(data);
    setStep(2);
  }
  function handleCheckInput(e) {
    if (e.target.dataset.testid === 'taxCode') {
      if (e.target.value !== '' && !checkStepRef.current.taxCode) {
        setChildStep((prev) => prev + 1 / 3 / 3);
        checkStepRef.current.taxCode = true;
      }
      if (e.target.value === '' && checkStepRef.current.taxCode) {
        setChildStep((prev) => prev - 1 / 3 / 3);
        checkStepRef.current.taxCode = false;
      }
    }
    if (e.target.dataset.testid === 'password') {
      if (e.target.value !== '' && !checkStepRef.current.password) {
        setChildStep((prev) => prev + 1 / 3 / 3);
        checkStepRef.current.password = true;
      }
      if (e.target.value === '' && checkStepRef.current.password) {
        setChildStep((prev) => prev - 1 / 3 / 3);
        checkStepRef.current.password = false;
      }
    }
    if (e.target.dataset.testid === 'confirmPassword') {
      if (e.target.value !== '' && !checkStepRef.current.confirmPassword) {
        setChildStep((prev) => prev + 1 / 3 / 3);
        checkStepRef.current.confirmPassword = true;
      }
      if (e.target.value === '' && checkStepRef.current.confirmPassword) {
        setChildStep((prev) => prev - 1 / 3 / 3);
        checkStepRef.current.confirmPassword = false;
      }
    }
  }
  useEffect(() => {
    fetchFieldOptions();
  }, []);
  return (
    <>
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        {' '}
        <div className='form-group'>
          <p>Mã số thuế</p>
          <input
            {...register('taxCode')}
            onBlur={handleGetLegalCompanyInfo}
            className={
              checkStepRef.current.taxCode
                ? 'form-control filled'
                : 'form-control'
            }
            placeholder='Nhập mã số thuế'
            data-testid='taxCode'
          />
          <div className='text-danger'>
            {errors?.taxCode?.message && <div>{errors.taxCode.message}</div>}
          </div>
        </div>
        <div className='form-group'>
          <p>Mật khẩu</p>
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
          <p>Nhập lại mật khẩu</p>
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
        <div className='form-group text-right register-btn just'>
          <button type='submit' className='site-button dz-xs-flex m-r5 btn'>
            Tiếp tục <i className='fa fa-arrow-right' aria-hidden='true'></i>
          </button>
        </div>
      </form>
    </>
  );
};

export default CompanyInfo;
