import React from "react";
import ReactSelectShowType from "../../../customComponents/ReactSelectShowType/ReactSelectShowType";
//hookform
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const Address = ({
  setStep,
  setInfoRegister2,
  optionsSelect,
  fetchDistric,
  fetchWard,
}) => {
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
    console.log(data);
    // console.log(errors);
    if (Object.keys(errors).length === 0) {
      setStep(3);
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        <p>Địa chỉ :</p>
        <div className='form-group'>
          <p>Tỉnh/thành phố</p>
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
                    console.log(value);
                    setValue("city", value);
                    fetchDistric(value?.value);
                  }}
                />
              )}
            />
          </div>

          <div className='text-danger'>
            {errors?.city?.message && <div>{errors.city.message}</div>}
          </div>
        </div>
        <div className='form-group'>
          <p>Quận/huyện</p>
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
                    console.log(city);
                    fetchWard(city, value?.value);
                  }}
                />
              )}
            />
          </div>

          <div className='text-danger'>
            {errors?.district?.message && <div>{errors.district.message}</div>}
          </div>
        </div>
        <div className='form-group'>
          <p>Phường/xã</p>
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
                />
              )}
            />
          </div>

          <div className='text-danger'>
            {errors?.address?.ward && <div>{errors.address.ward}</div>}
          </div>
        </div>
        <div className='form-group'>
          <p>Địa chỉ</p>
          <input
            className='form-control'
            placeholder='Nhập địa chỉ'
            {...register("address")}
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
