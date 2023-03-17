import React, { useEffect } from "react";
//hookform
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const CompanyInfo = ({ setInfoRegister1, setStep, fetchFieldOptions }) => {
  const schema = yup.object().shape({
    name: yup.string().required("Vui lòng nhập họ và tên"),
    position: yup.string().required("Vui lòng nhập chức vụ"),
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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  async function onHandleSubmit(data) {
    console.log(data);
    setInfoRegister1(data);
    // console.log(data);
    if (Object.keys(errors).length === 0) {
      await fetchFieldOptions();
      setStep(2);
    }
  }
  useEffect(() => {
    fetchFieldOptions();
  }, []);
  return (
    <>
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        {" "}
        <div className='form-group'>
          <input
            className='form-control'
            placeholder='Nhập họ và tên'
            {...register("name")}
          />
          <div className='text-danger'>
            {errors?.name?.message && <div>{errors.name.message}</div>}
          </div>
        </div>
        <div className='form-group'>
          <input
            className='form-control'
            placeholder='Nhập chức vụ'
            {...register("position")}
          />
          <div className='text-danger'>
            {errors?.position?.message && <div>{errors.position.message}</div>}
          </div>
        </div>
        <div className='form-group'>
          <input
            className='form-control'
            placeholder='Nhập số điện thoại'
            {...register("phone")}
          />
          <div className='text-danger'>
            {errors?.phone?.message && <div>{errors.phone.message}</div>}
          </div>
        </div>
        <div className='form-group'>
          <input
            type='email'
            className='form-control'
            placeholder='Nhập email'
            {...register("email")}
          />
          <div className='text-danger'>
            {errors?.email?.message && <div>{errors.email.message}</div>}
          </div>
        </div>
        <div className='form-group'>
          <input
            className='form-control'
            type='password'
            placeholder='Nhập mật khẩu'
            minLength='6'
            {...register("password")}
          />
          <div className='text-danger'>
            {errors?.password?.message && <div>{errors.password.message}</div>}
          </div>
        </div>
        <div className='form-group'>
          <input
            className='form-control'
            type='password'
            placeholder='Nhập lại mật khẩu'
            minLength='6'
            {...register("confirmPassword")}
          />
          <div className='text-danger'>
            {errors?.confirmPassword?.message && (
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

export default CompanyInfo;
