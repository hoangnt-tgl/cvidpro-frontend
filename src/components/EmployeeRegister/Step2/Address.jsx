import React from "react";
import ReactSelectShowType from "../../../customComponents/ReactSelectShowType/ReactSelectShowType";
//hookform
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRef } from "react";
// import '../RegisterStyles.css'
const Address = ({
  setStep,
  setInfoRegister2,
  optionsSelect,
  fetchDistric,
  fetchWard,
  setChildStep,
}) => {
  const checkStepRef = useRef({
    city: false,
    district: false,
    ward: false,
    address: false,
  });
  const schema = yup.object().shape({
    city: yup.object().required("Vui lòng chọn tỉnh/thành phố"),
    district: yup.object().required("Vui lòng chọn quận/huyện"),
    ward: yup.object().required("Vui lòng chọn phường/xã"),
    address: yup.string().required("Vui lòng nhập địa chỉ"),
  });
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  function onHandleSubmit(data) {
    setInfoRegister2(data);
    if (Object.keys(errors).length === 0) {
      setStep(3);
    }
  }
  function handleCheckInput(e) {
    if (e.target.dataset.testid === "address") {
      if (e.target.value !== "" && !checkStepRef.current.address) {
        setChildStep((prev) => prev + 1 / 3 / 4);
        checkStepRef.current.address = true;
      }
      if (e.target.value === "" && checkStepRef.current.address) {
        setChildStep((prev) => prev - 1 / 3 / 4);
        checkStepRef.current.address = false;
      }
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        <div className='form-group'>
          <p>
            Tỉnh/thành phố <span className='asterisk'></span>
          </p>
          <div className='select-style'>
            {" "}
            <Controller
              name='city'
              control={control}
              render={({ field }) => (
                <ReactSelectShowType
                  {...field}
                  placeholder='Chọn tỉnh/thành phố'
                  options={optionsSelect?.provinces}
                  minInput={1}
                  onChange={(value) => {
                    setValue("city", value);
                    if (checkStepRef.current.city === false) {
                      setChildStep((prev) => prev + 1 / 3 / 4);
                      checkStepRef.current.city = true;
                    }
                    fetchDistric(value?.value);
                  }}
                  className={checkStepRef.current.city ? " filled" : ""}
                />
              )}
            />
          </div>

          <div className='text-danger'>
            {errors?.city?.message && <div>{errors.city.message}</div>}
          </div>
        </div>
        <div className='form-group'>
          <p>
            Quận/huyện <span className='asterisk'></span>
          </p>
          <div className='select-style'>
            {" "}
            <Controller
              name='district'
              control={control}
              render={({ field }) => (
                <ReactSelectShowType
                  {...field}
                  placeholder='Chọn quận/huyện'
                  options={optionsSelect?.districts || []}
                  minInput={1}
                  onChange={(value) => {
                    setValue("district", value);
                    let city = getValues("city").value;
                    if (checkStepRef.current.district === false) {
                      setChildStep((prev) => prev + 1 / 3 / 4);
                      checkStepRef.current.district = true;
                    }
                    fetchWard(city, value?.value);
                  }}
                  className={checkStepRef.current.district ? " filled" : ""}
                />
              )}
            />
          </div>

          <div className='text-danger'>
            {errors?.district?.message && <div>{errors.district.message}</div>}
          </div>
        </div>
        <div className='form-group'>
          <p>
            Phường/xã <span className='asterisk'></span>
          </p>
          <div className='select-style'>
            {" "}
            <Controller
              name='ward'
              control={control}
              render={({ field }) => (
                <ReactSelectShowType
                  {...field}
                  placeholder='Chọn phường/xã'
                  options={optionsSelect?.wards || []}
                  minInput={1}
                  onChange={(value) => {
                    setValue("ward", value);
                    if (value !== null && !checkStepRef.current.ward) {
                      setChildStep((prev) => prev + 1 / 3 / 4);
                      checkStepRef.current.ward = true;
                    }
                  }}
                  className={checkStepRef.current.ward ? " filled" : ""}
                />
              )}
            />
          </div>

          <div className='text-danger'>
            {errors?.ward?.message && <div>{errors.ward.message}</div>}
          </div>
        </div>
        <div className='form-group'>
          <p>
            Địa chỉ <span className='asterisk'></span>
          </p>
          <input
            // className='form-control'
            className={
              checkStepRef.current.address
                ? "form-control filled"
                : "form-control"
            }
            placeholder='Nhập địa chỉ'
            {...register("address")}
            data-testid='address'
            onBlur={handleCheckInput}
          />
          <div className='text-danger'>
            {errors?.address?.message && <div>{errors.address.message}</div>}
          </div>
        </div>
        <div className='form-group text-right register-btn'>
          <button
            type='button'
            className='site-button dz-xs-flex m-r5 '
            onClick={() => setStep((prev) => prev - 1)}
          >
            <i className='fa fa-arrow-left' aria-hidden='true'></i> Quay lại
          </button>
          <button
            type='submit'
            className='site-button dz-xs-flex m-r5 btn'
            disabled={Object.keys(errors).length > 0}
          >
            Tiếp tục <i className='fa fa-arrow-right' aria-hidden='true'></i>
          </button>
        </div>
      </form>
    </>
  );
};

export default Address;
