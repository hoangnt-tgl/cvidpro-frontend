import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRef } from "react";
const ValidateOtp = ({ setStep }) => {
  const checkStepRef = useRef({
    otp: false,
  });
  const schema = yup
    .object({
      otp: yup.string().required("Vui lòng nhập mã OTP"),
    })
    .required();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });
  function handleCheckInput(e) {
    if (e.target.dataset.testid === "otp") {
      if (e.target.value !== "" && !checkStepRef.current.otp) {
        checkStepRef.current.otp = true;
      }
      if (e.target.value === "" && checkStepRef.current.otp) {
        checkStepRef.current.otp = false;
      }
    }
  }
  function handleOnSubmit() {
    //function validate opt
    setStep(2);
  }
  return (
    <>
      {" "}
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div className='form-group'>
          <p>
            Mã OTP <span className='asterisk'></span>
          </p>
          <input
            {...register("otp")}
            className={
              checkStepRef.current.otp ? "form-control filled" : "form-control"
            }
            placeholder='Nhập otp'
            data-testid='otp'
            onBlur={handleCheckInput}
          />
          <div className='text-danger'>
            {errors?.otp?.message && <div>{errors.otp.message}</div>}
          </div>
        </div>
        <div className='form-group text-right register-btn btn-opt'>
          <button type='submit' className='site-button dz-xs-flex m-r5 btn'>
            Xác nhận
          </button>
        </div>
      </form>
    </>
  );
};

export default ValidateOtp;
