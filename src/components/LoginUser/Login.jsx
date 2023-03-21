import React, { useState } from "react";
//hookform
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./styles.css";
import BigSizeInput from "../../customComponents/BigSizeInput/BigSizeInput";
import BigRoundedBtn from "../../customComponents/BigRoundedBtn/BigRoundedBtn";

const Login = ({ onLogin }) => {
  const inputFiled = [
    { register: "name", placeholder: "", title: "Tên đăng nhập", type: "text" },
    {
      register: "password",
      placeholder: "",
      title: "Mật khẩu",
      type: "password",
    },
  ];
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
    console.log("form", data);
    onLogin(data);
    console.log(errors);
  }

  return (
    <>
      <>
        <form onSubmit={handleSubmit(onHandleSubmit)}>
          {inputFiled.map((item, index) => {
            return (
              <BigSizeInput
                key={index}
                getValues={getValues}
                register={{ ...register(item.register) }}
                errors={errors}
                title={item.title}
                placeholder={item.placeholder}
                type={item.type}
              />
            );
          })}
          <div className='form-group form-group-login d-flex justify-content-between w-100'>
            <div className='d-flex justify-content-center align-items-center'>
              <input
                className='checkbox-login'
                type='checkbox'
                checked={true}
                // onClick={() => {
                //   setCheck(item.value);
                //   setValue("rating", item.value);
                // }}
                // register={register}
              />
              <span>Ghi nhớ đăng nhập</span>
            </div>
            <div>
              <span>Quên mật khẩu</span>
            </div>
          </div>
          <BigRoundedBtn type='submit' title='Đăng nhập' />
        </form>
      </>
    </>
  );
};

export default Login;
