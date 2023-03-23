import React from "react";
//hookform
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRef } from "react";
const PresenterInfo = ({ setChildStep2, setStep, registerCompany }) => {
  const checkStepRef = useRef({
    name: false,
    position: false,
    phone: false,
    email: false,
  });
  const schema = yup.object().shape({
    name: yup.string().required("Vui lòng nhập họ và tên"),
    position: yup.string().required("Vui lòng nhập chức vụ"),
    phone: yup.string().required("Vui lòng nhập số điện thoại").length(10),
    email: yup
      .string()
      .required("Vui lòng nhập email")
      .email("Email không hợp lệ"),
    checked: yup.boolean().oneOf([true], "Vui lòng đồng ý điều khoản"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  async function onHandleSubmit(data) {
    registerCompany(data);
  }
  function handleCheckInput(e) {
    if (e.target.dataset.testid === "name") {
      if (e.target.value !== "" && !checkStepRef.current.name) {
        setChildStep2((prev) => prev + 1 / 3 / 4);
        checkStepRef.current.name = true;
      }
      if (e.target.value === "" && checkStepRef.current.name) {
        setChildStep2((prev) => prev - 1 / 3 / 4);
        checkStepRef.current.name = false;
      }
    }
    if (e.target.dataset.testid === "position") {
      if (e.target.value !== "" && !checkStepRef.current.position) {
        setChildStep2((prev) => prev + 1 / 3 / 4);
        checkStepRef.current.position = true;
      }
      if (e.target.value === "" && checkStepRef.current.position) {
        setChildStep2((prev) => prev - 1 / 3 / 4);
        checkStepRef.current.position = false;
      }
    }
    if (e.target.dataset.testid === "phone") {
      if (e.target.value !== "" && !checkStepRef.current.phone) {
        setChildStep2((prev) => prev + 1 / 3 / 4);
        checkStepRef.current.phone = true;
      }
      if (e.target.value === "" && checkStepRef.current.phone) {
        setChildStep2((prev) => prev - 1 / 3 / 4);
        checkStepRef.current.phone = false;
      }
    }
    if (e.target.dataset.testid === "email") {
      if (e.target.value !== "" && !checkStepRef.current.email) {
        setChildStep2((prev) => prev + 1 / 3 / 4);
        checkStepRef.current.email = true;
      }
      if (e.target.value === "" && checkStepRef.current.email) {
        setChildStep2((prev) => prev - 1 / 3 / 4);
        checkStepRef.current.email = false;
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
          <p>Chức vụ</p>
          <input
            className={
              checkStepRef.current.position
                ? "form-control filled"
                : "form-control"
            }
            placeholder='Nhập chức vụ'
            {...register("position")}
            data-testid='position'
            onBlur={handleCheckInput}
          />
          <div className='text-danger'>
            {errors?.position?.message && <div>{errors.position.message}</div>}
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
        <div className='form-group text-left'>
          <span className='custom-control custom-checkbox'>
            <input
              type='checkbox'
              className='custom-control-input'
              id='check1'
              {...register("checked")}
            />
            <label className='custom-control-label' htmlFor='check1'>
              Tôi đồng ý với các điều khoản và điều kiện
            </label>
          </span>
          <div className='text-danger'>
            {errors?.checked?.message && <div>{errors.checked.message}</div>}
          </div>
        </div>
        <div className='form-group '>
          <button
            type='button'
            className='site-button dz-xs-flex m-r5 '
            onClick={() => {
              setStep((prev) => prev - 1);
            }}
          >
            <i className='fa fa-arrow-left' aria-hidden='true'></i> Quay lại
          </button>
          <button
            type='submit'
            className='site-button dz-xs-flex m-r5 float-right btn btn-lg'
            disabled={Object.keys(errors).length > 0}
          >
            Đăng ký
          </button>
        </div>
      </form>
    </>
  );
};

export default PresenterInfo;