import React from "react";
//hookform
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./styles.css";
import BigSizeInput from "../../customComponents/BigSizeInput/BigSizeInput";
import BigRoundedBtn from "../../customComponents/BigRoundedBtn/BigRoundedBtn";
import { Link } from "react-router-dom";

const Login = ({
  onLogin,
  where,
  inputFiled,
  setIsIndividual = () => {},
  isIndividual = false,
}) => {
  const schema = yup.object().shape({
    name: yup.string().required("Vui lòng nhập tài khoản"),
    password: yup
      .string()
      .required("Vui lòng nhập mật khẩu")
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .max(20, "Mật khẩu không được quá 20 ký tự"),
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
        {where === "company" && (
          <div>
            <p>lorem lorem lorem lorem lorem lorem </p>
            <div className=' d-flex justify-content-start w-100 mb-4'>
              <div className='d-flex justify-content-center align-items-center mr-5'>
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
                <span>Cá nhân</span>
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
          <div className=' d-flex justify-content-between w-100'>
            <div className='d-flex justify-content-center align-items-center'>
              <input
                className='checkbox-login mr-1'
                type='checkbox'
                checked={true}
                // register={register}
              />
              <span>Ghi nhớ</span>
            </div>
            <div>
              <span>Quên mật khẩu ?</span>
            </div>
          </div>
          <BigRoundedBtn type='submit' title='Đăng nhập' />
          <div className=' d-flex justify-content-center w-100'>
            <div className='d-flex justify-content-center align-items-center'>
              {where === "company" ? (
                <>
                  {" "}
                  <span>
                    Chưa có tài khoản ?{" "}
                    <Link to='/company/register'>Đăng ký</Link>
                  </span>
                </>
              ) : (
                <>
                  {" "}
                  <span>
                    Chưa có tài khoản ?{" "}
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
