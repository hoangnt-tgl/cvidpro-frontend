import React from 'react';
//hookform
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './styles.css';
import BigSizeInput from '../../../customComponents/BigSizeInput/BigSizeInput';
import BigRoundedBtn from '../../../customComponents/BigRoundedBtn/BigRoundedBtn';
import { Link } from 'react-router-dom';

const Login = ({
  onLogin,
  where,
  inputFiled,
  setIsIndividual = () => {},
  isIndividual = false,
  setForgetPass,
}) => {
  const schema = yup.object().shape({
    name: yup.string().required('Vui lòng nhập tài khoản'),
    password: yup.string().required('Vui lòng nhập mật khẩu'),
  });
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  function onHandleSubmit(data) {
    onLogin(data);
    console.log(errors);
  }

  return (
    <>
      <>
        {where === 'company' && (
          <div className='my-2 select-type-wrapper'>
            <span>Loại hình tuyển dụng</span>
            <div
              className=' d-flex justify-content-startw-70 flex-wrap'
              style={{ gap: '20px' }}
            >
              <div className='d-flex justify-content-center align-items-center'>
                <input
                  className='checkbox-login mr-1'
                  type='checkbox'
                  checked={!isIndividual && true}
                  onClick={() => setIsIndividual(false)}
                />
                <span>Doanh nghiệp</span>
              </div>
              <div className='d-flex justify-content-center align-items-center'>
                <input
                  className='checkbox-login mr-1'
                  type='checkbox'
                  checked={isIndividual && true}
                  onClick={() => setIsIndividual(true)}
                />
                <span>Kinh doanh cá thể</span>
              </div>
              <div className='d-flex justify-content-center align-items-center'>
                <input
                  className='checkbox-login mr-1'
                  type='checkbox'
                  disabled={true}
                />
                <span>Hiệp hội, tổ chức</span>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onHandleSubmit)}>
          {inputFiled.map((item, index) => {
            return (
              <BigSizeInput
                key={index}
                name={item.register}
                getValues={getValues}
                register={{ ...register(item.register) }}
                errors={errors}
                title={item.title}
                placeholder={item.placeholder}
                type={item.type}
                description={item.description}
              />
            );
          })}
          <div
            className=' d-flex justify-content-between w-100'
            style={{ marginTop: '-20px' }}
          >
            <div className='d-flex justify-content-center align-items-center'>
              <div>
                <span
                  className='forget-pass'
                  onClick={() => {
                    setForgetPass(true);
                  }}
                >
                  Quên mật khẩu ?
                </span>
              </div>
            </div>
          </div>
          <BigRoundedBtn type='submit' title='Đăng nhập' />
          <div
            className=' d-flex justify-content-center w-100'
            style={{ marginTop: '-50px', zIndex: 999 }}
          >
            <div className='d-flex justify-content-center align-items-center'>
              {where === 'company' ? (
                <>
                  {' '}
                  <span style={{ zIndex: 999 }}>
                    Chưa có tài khoản ?{' '}
                    <Link to='/company/register'>Đăng ký</Link>
                  </span>
                </>
              ) : (
                <>
                  {' '}
                  <span style={{ zIndex: 999 }}>
                    Chưa có tài khoản ?{' '}
                    <Link to='/employee/register'>Đăng ký</Link>
                  </span>
                </>
              )}
            </div>
          </div>
        </form>
      </>
    </>
  );
};

export default Login;
