import React from "react";
//hookform
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRef } from "react";
const PresenterInfo = ({
  setChildStep1,
  setStep,
  setInfoRegister1,
  fetchFieldOptions,
}) => {
  const checkStepRef = useRef({
    name: false,
    position: false,
    phone: false,
    email: false,
  });
  const schema = yup.object().shape({
    name: yup.string().required("Vui lòng nhập họ và tên"),
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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  async function onHandleSubmit(data) {
    setInfoRegister1(data);
    await fetchFieldOptions();
    setStep(2);
  }
  function handleCheckInput(e) {
    if (e.target.dataset.testid === "name") {
      if (e.target.value !== "" && !checkStepRef.current.name) {
        setChildStep1((prev) => prev + 1 / 2 / 5);
        checkStepRef.current.name = true;
      }
      if (e.target.value === "" && checkStepRef.current.name) {
        setChildStep1((prev) => prev - 1 / 2 / 5);
        checkStepRef.current.name = false;
      }
    }
    if (e.target.dataset.testid === "position") {
      if (e.target.value !== "" && !checkStepRef.current.position) {
        setChildStep1((prev) => prev + 1 / 2 / 5);
        checkStepRef.current.position = true;
      }
      if (e.target.value === "" && checkStepRef.current.position) {
        setChildStep1((prev) => prev - 1 / 2 / 5);
        checkStepRef.current.position = false;
      }
    }
    if (e.target.dataset.testid === "phone") {
      if (e.target.value !== "" && !checkStepRef.current.phone) {
        setChildStep1((prev) => prev + 1 / 2 / 5);
        checkStepRef.current.phone = true;
      }
      if (e.target.value === "" && checkStepRef.current.phone) {
        setChildStep1((prev) => prev - 1 / 2 / 5);
        checkStepRef.current.phone = false;
      }
    }
    if (e.target.dataset.testid === "email") {
      if (e.target.value !== "" && !checkStepRef.current.email) {
        setChildStep1((prev) => prev + 1 / 2 / 5);
        checkStepRef.current.email = true;
      }
      if (e.target.value === "" && checkStepRef.current.email) {
        setChildStep1((prev) => prev - 1 / 2 / 5);
        checkStepRef.current.email = false;
      }
    }
    if (e.target.dataset.testid === "password") {
      if (e.target.value !== "" && !checkStepRef.current.password) {
        setChildStep1((prev) => prev + 1 / 2 / 5);
        checkStepRef.current.password = true;
      }
      if (e.target.value === "" && checkStepRef.current.password) {
        setChildStep1((prev) => prev - 1 / 2 / 5);
        checkStepRef.current.password = false;
      }
    }
    if (e.target.dataset.testid === "confirmPassword") {
      if (e.target.value !== "" && !checkStepRef.current.confirmPassword) {
        setChildStep1((prev) => prev + 1 / 2 / 5);
        checkStepRef.current.confirmPassword = true;
      }
      if (e.target.value === "" && checkStepRef.current.confirmPassword) {
        setChildStep1((prev) => prev - 1 / 2 / 5);
        checkStepRef.current.confirmPassword = false;
      }
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        {" "}
        <div className='form-group'>
          <p>Họ và tên</p>
          <input
            className={
              checkStepRef.current.name ? "form-control filled" : "form-control"
            }
            placeholder='Nhập họ và tên'
            {...register("name")}
            data-testid='name'
            onBlur={handleCheckInput}
          />
          <div className='text-danger'>
            {errors?.name?.message && <div>{errors.name.message}</div>}
          </div>
        </div>
        <div className='form-group'>
          <p>Số điện thoại</p>
          <input
            className={
              checkStepRef.current.phone
                ? "form-control filled"
                : "form-control"
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
          <p>Email</p>
          <input
            type='email'
            className={
              checkStepRef.current.email
                ? "form-control filled"
                : "form-control"
            }
            placeholder='Nhập email'
            {...register("email")}
            data-testid='email'
            onBlur={handleCheckInput}
          />
          <div className='text-danger'>
            {errors?.email?.message && <div>{errors.email.message}</div>}
          </div>
        </div>
        <div className='form-group'>
          <p>Mật khẩu</p>
          <input
            className={
              checkStepRef.current.password
                ? "form-control filled"
                : "form-control"
            }
            type='password'
            placeholder='Nhập mật khẩu'
            minLength='6'
            data-testid='password'
            {...register("password")}
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
                ? "form-control filled"
                : "form-control"
            }
            type='password'
            placeholder='Nhập lại mật khẩu'
            minLength='6'
            data-testid='confirmPassword'
            {...register("confirmPassword")}
            onBlur={handleCheckInput}
          />
          <div className='text-danger'>
            {errors?.confirmPassword?.message && (
              <div>{errors.confirmPassword.message}</div>
            )}
          </div>
        </div>
        <div className='form-group '>
          <div className='form-group text-right register-btn'>
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