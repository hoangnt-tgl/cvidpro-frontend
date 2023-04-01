import React from "react";
import Select from "react-select";
//hookform
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRef } from "react";
// import '../RegisterStyles.css'
const PersonalInfo = ({ setStep, setInfoRegister1, setChildStep }) => {
  const checkStepRef = useRef({
    lastName: false,
    name: false,
    phone: false,
  
    email: false,
    password: false,
    confirmPassword: false,
  });
  const genderOptions = [
    { value: "Nam", label: "Nam" },
    { value: "Nữ", label: "Nữ" },
  ];
  const schema = yup.object().shape({
    name: yup.string().required("Vui lòng nhập họ và lót"),
    lastName: yup.string().required("Vui lòng nhập tên "),
    phone: yup.string().required("Vui lòng nhập số điện thoại").length(10),

    email: yup
      .string()
      .required("Vui lòng nhập email")
      .email("Email không hợp lệ"),
    password: yup
      .string()
      .required("Vui lòng nhập mật khẩu")
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .max(20, "Mật khẩu không được quá 20 ký tự"),
    confirmPassword: yup
      .string()
      .required("Vui lòng nhập lại mật khẩu")
      .min(6)
      .max(20)
      .oneOf([yup.ref("password")], "Mật khẩu không khớp"),
  });
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  function onHandleSubmit(data) {
    setInfoRegister1(data);
    if (Object.keys(errors).length === 0) {
      setStep(2);
    }
  }
  function handleCheckInput(e) {
    if (e.target.dataset.testid === "name") {
      if (e.target.value !== "" && !checkStepRef.current.name) {
        setChildStep((prev) => prev + 1 / 3 / 6);
        checkStepRef.current.name = true;
      }
      if (e.target.value === "" && checkStepRef.current.name) {
        setChildStep((prev) => prev - 1 / 3 / 6);
        checkStepRef.current.name = false;
      }
    }
    if (e.target.dataset.testid === "lastName") {
      if (e.target.value !== "" && !checkStepRef.current.lastName) {
        setChildStep((prev) => prev + 1 / 3 / 6);
        checkStepRef.current.lastName = true;
      }
      if (e.target.value === "" && checkStepRef.current.lastName) {
        setChildStep((prev) => prev - 1 / 3 / 6);
        checkStepRef.current.lastName = false;
      }
    }
    if (e.target.dataset.testid === "phone") {
      if (e.target.value !== "" && !checkStepRef.current.phone) {
        setChildStep((prev) => prev + 1 / 3 / 6);
        checkStepRef.current.phone = true;
      }
      if (e.target.value === "" && checkStepRef.current.phone) {
        setChildStep((prev) => prev - 1 / 3 / 6);
        checkStepRef.current.phone = false;
      }
    }

    if (e.target.dataset.testid === "email") {
      if (e.target.value !== "" && !checkStepRef.current.email) {
        setChildStep((prev) => prev + 1 / 3 / 6);
        checkStepRef.current.email = true;
      }
      if (e.target.value === "" && checkStepRef.current.email) {
        setChildStep((prev) => prev - 1 / 3 / 6);
        checkStepRef.current.email = false;
      }
    }
    if (e.target.dataset.testid === "password") {
      if (e.target.value !== "" && !checkStepRef.current.password) {
        setChildStep((prev) => prev + 1 / 3 / 6);
        checkStepRef.current.password = true;
      }
      if (e.target.value === "" && checkStepRef.current.password) {
        setChildStep((prev) => prev - 1 / 3 / 6);
        checkStepRef.current.password = false;
      }
    }
    if (e.target.dataset.testid === "confirmPassword") {
      if (e.target.value !== "" && !checkStepRef.current.confirmPassword) {
        setChildStep((prev) => prev + 1 / 3 / 6);
        checkStepRef.current.confirmPassword = true;
      }
      if (e.target.value === "" && checkStepRef.current.confirmPassword) {
        setChildStep((prev) => prev - 1 / 3 / 6);
        checkStepRef.current.confirmPassword = false;
      }
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        <div className='form-group d-flex justify-content-between'>
          <div className='w-100 mr-5'>
            <p>
              Họ và tên lót <span className='asterisk'></span>
            </p>
            <input
              type='text'
              className={
                checkStepRef.current.name
                  ? "form-control small filled"
                  : "form-control small"
              }
              placeholder='Nhập họ và tên lót'
              {...register("name")}
              data-testid='name'
              onBlur={handleCheckInput}
            />
            <div className='text-danger'>
              {errors?.name?.message && <div>{errors.name.message}</div>}
            </div>
          </div>
          <div className='w-100'>
            <p>
              Tên <span className='asterisk'></span>
            </p>
            <input
              type='text'
              className={
                checkStepRef.current.lastName
                  ? "form-control small filled"
                  : "form-control small"
              }
              placeholder='Tên'
              {...register("lastName")}
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
            type='text'
            className={
              checkStepRef.current.phone
                ? "form-control small filled"
                : "form-control small"
            }
            placeholder='Nhập số điện thoại'
            {...register("phone")}
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
                ? "form-control small filled"
                : "form-control small"
            }
            placeholder='Nhập email'
            {...register("email")}
            data-testid='email'
            onBlur={handleCheckInput}
          />
          <div className='text-danger'>
            {errors.email?.message && <div>{errors.email.message}</div>}
          </div>
        </div>
        <div className='form-group'>
          <p>
            Mật khẩu <span className='asterisk'></span>
          </p>
          <input
            className={
              checkStepRef.current.password
                ? "form-control small filled"
                : "form-control small"
            }
            placeholder='Nhập mật khẩu'
            type='password'
            {...register("password")}
            data-testid='password'
            onBlur={handleCheckInput}
          />
          <div className='text-danger'>
            {errors.password?.message && <div>{errors.password.message}</div>}
          </div>
        </div>
        <div className='form-group'>
          <p>
            Nhập lại mật khẩu <span className='asterisk'></span>
          </p>
          <input
            className={
              checkStepRef.current.confirmPassword
                ? "form-control small filled"
                : "form-control small"
            }
            type='password'
            placeholder='Nhập lại mật khẩu'
            {...register("confirmPassword")}
            data-testid='confirmPassword'
            onBlur={handleCheckInput}
          />
          <div className='text-danger'>
            {errors.confirmPassword?.message && (
              <div>{errors.confirmPassword.message}</div>
            )}
          </div>
        </div>
        <div className='form-group text-right register-btn justify-content-end'>
          <button type='submit' className='site-button dz-xs-flex m-r5 btn'>
            Tiếp tục <i className='fa fa-arrow-right' aria-hidden='true'></i>
          </button>
        </div>
      </form>
    </>
  );
};

export default PersonalInfo;
