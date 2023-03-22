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
    name: false,
    phone: false,
    birthday: false,
    gender: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const genderOptions = [
    { value: "Nam", label: "Nam" },
    { value: "Nữ", label: "Nữ" },
  ];
  const schema = yup.object().shape({
    name: yup.string().required("Vui lòng nhập họ và tên"),
    phone: yup.string().required("Vui lòng nhập số điện thoại").length(10),
    birthday: yup
      .date()
      .required("Vui lòng nhập ngày sinh")
      .typeError("Vui lòng nhập ngày sinh"),
    gender: yup.object().required("Vui lòng nhập giới tính"),
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
        setChildStep((prev) => prev + 1 / 3 / 7);
        checkStepRef.current.name = true;
      }
      if (e.target.value === "" && checkStepRef.current.name) {
        setChildStep((prev) => prev - 1 / 3 / 7);
        checkStepRef.current.name = false;
      }
    }
    if (e.target.dataset.testid === "phone") {
      if (e.target.value !== "" && !checkStepRef.current.phone) {
        setChildStep((prev) => prev + 1 / 3 / 7);
        checkStepRef.current.phone = true;
      }
      if (e.target.value === "" && checkStepRef.current.phone) {
        setChildStep((prev) => prev - 1 / 3 / 7);
        checkStepRef.current.phone = false;
      }
    }
    if (e.target.dataset.testid === "birthday") {
      if (e.target.value !== "" && !checkStepRef.current.birthday) {
        setChildStep((prev) => prev + 1 / 3 / 7);
        checkStepRef.current.birthday = true;
      }
      if (e.target.value === "" && checkStepRef.current.birthday) {
        setChildStep((prev) => prev - 1 / 3 / 7);
        checkStepRef.current.birthday = false;
      }
    }

    if (e.target.dataset.testid === "email") {
      if (e.target.value !== "" && !checkStepRef.current.email) {
        setChildStep((prev) => prev + 1 / 3 / 7);
        checkStepRef.current.email = true;
      }
      if (e.target.value === "" && checkStepRef.current.email) {
        setChildStep((prev) => prev - 1 / 3 / 7);
        checkStepRef.current.email = false;
      }
    }
    if (e.target.dataset.testid === "password") {
      if (e.target.value !== "" && !checkStepRef.current.password) {
        setChildStep((prev) => prev + 1 / 3 / 7);
        checkStepRef.current.password = true;
      }
      if (e.target.value === "" && checkStepRef.current.password) {
        setChildStep((prev) => prev - 1 / 3 / 7);
        checkStepRef.current.password = false;
      }
    }
    if (e.target.dataset.testid === "confirmPassword") {
      if (e.target.value !== "" && !checkStepRef.current.confirmPassword) {
        setChildStep((prev) => prev + 1 / 3 / 7);
        checkStepRef.current.confirmPassword = true;
      }
      if (e.target.value === "" && checkStepRef.current.confirmPassword) {
        setChildStep((prev) => prev - 1 / 3 / 7);
        checkStepRef.current.confirmPassword = false;
      }
    }
  }
  function handleCheckInputSelect(e) {
    if (e !== null && !checkStepRef.current.gender) {
      setChildStep((prev) => prev + 1 / 3 / 7);
      checkStepRef.current.gender = true;
      setValue("gender", e);
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        <div className='form-group'>
          <p>Họ và tên</p>
          <input
            type='text'
            className={
              checkStepRef.current.name
                ? "form-control small filled"
                : "form-control small"
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
          <p>Ngày sinh</p>
          <input
            type='date'
            className={
              checkStepRef.current.birthday
                ? "form-control small filled"
                : "form-control small"
            }
            placeholder='Nhập ngày sinh'
            {...register("birthday")}
            data-testid='birthday'
            onBlur={handleCheckInput}
          />
          <div className='text-danger'>
            {errors.birthday?.message && <div>{errors.birthday.message}</div>}
          </div>
        </div>
        <div className='form-group'>
          <p>Giới tính</p>
          <div className='select-style'>
            {" "}
            <Controller
              name='gender'
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  onChange={(e) => handleCheckInputSelect(e)}
                  placeholder='Chọn giới tính'
                  options={genderOptions}
                  className={checkStepRef.current.gender ? " filled" : ""}
                />
              )}
            />
          </div>

          <div className='text-danger'>
            {errors.gender?.message && <div>{errors.gender.message}</div>}
          </div>
        </div>
        <div className='form-group'>
          <p>Email</p>
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
          <p>Mật khẩu</p>
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
          <p>Nhập lại mật khẩu</p>
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
        <div className='form-group text-right register-btn'>
          <button type='submit' className='site-button dz-xs-flex m-r5 btn'>
            Tiếp tục <i className='fa fa-arrow-right' aria-hidden='true'></i>
          </button>
        </div>
      </form>
    </>
  );
};

export default PersonalInfo;
