import React from "react";
import Select from "react-select";
//hookform
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import '../RegisterStyles.css'
const PersonalInfo = ({ setStep, setInfoRegister1 }) => {
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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  function onHandleSubmit(data) {
    setInfoRegister1(data);
    // console.log(data);
    // console.log(errors);
    if (Object.keys(errors).length === 0) {
      setStep(2);
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        <div className='form-group'>
          <p>Họ và tên</p>
          <input
            type='text'
            className='form-control small'
            placeholder='Nhập họ và tên'
            {...register("name")}
          />
          <div className='text-danger'>
            {errors?.name?.message && <div>{errors.name.message}</div>}
          </div>
        </div>
        <div className='form-group'>
          <p>Số điện thoại</p>
          <input
            type='text'
            className='form-control'
            placeholder='Nhập số điện thoại'
            {...register("phone")}
          />
          <div className='text-danger'>
            {errors?.phone?.message && <div>{errors.phone.message}</div>}
          </div>
        </div>
        <div className='form-group'>
          <p>Ngày sinh</p>
          <input
            type='date'
            className='form-control'
            placeholder='Nhập ngày sinh'
            {...register("birthday")}
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
                  placeholder='Chọn giới tính'
                  options={genderOptions}
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
            className='form-control'
            placeholder='Nhập email'
            {...register("email")}
          />
          <div className='text-danger'>
            {errors.email?.message && <div>{errors.email.message}</div>}
          </div>
        </div>
        <div className='form-group'>
          <p>Mật khẩu</p>
          <input
            className='form-control'
            placeholder='Nhập mật khẩu'
            type="password"
            {...register("password")}
          />
          <div className='text-danger'>
            {errors.password?.message && <div>{errors.password.message}</div>}
          </div>
        </div>
        <div className='form-group'>
          <p>Nhập lại mật khẩu</p>
          <input
            className='form-control'
            type="password"
            placeholder='Nhập lại mật khẩu'
            {...register("confirmPassword")}
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
