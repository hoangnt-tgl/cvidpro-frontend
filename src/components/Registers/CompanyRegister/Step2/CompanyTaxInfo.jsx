import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
//hookform
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const CompanyTaxInfo = ({
  infoRegister1,
  setStep,
  optionsSelect,
  setInfoRegister2,
  setChildStep1,
}) => {
  const checkStepRef = useRef({
    companyType: false,
    field: false,
    mainIndustry: false,
    businessLicense: false,
  });
  const schema = yup.object().shape({
    companyType: yup.object().required("Vui lòng chọn loại hình công ty"),
    field: yup.array().required("Vui lòng nhập lĩnh vực kinh doanh"),
    mainIndustry: yup.string().required("Vui lòng nhập ngành nghề chính"),
    businessLicense: yup.mixed().required("Vui lòng tải giấy phép kinh doanh"),
  });
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  function uploadBusinessLicense(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64 = reader.result;
        setValue("businessLicense", base64);
      };
      if (!checkStepRef.current.businessLicense) {
        setChildStep1((prev) => prev + 1 / 3 / 4);
        checkStepRef.current.businessLicense = true;
      }
    } else {
      if (checkStepRef.current.businessLicense) {
        setChildStep1((prev) => prev - 1 / 3 / 4);
        checkStepRef.current.businessLicense = false;
      }
    }
  }

  function handleCheckInput(e) {
    if (e.target.dataset.testid === "mainIndustry") {
      if (e.target.value !== "" && !checkStepRef.current.mainIndustry) {
        setChildStep1((prev) => prev + 1 / 3 / 4);
        checkStepRef.current.mainIndustry = true;
      }
      if (e.target.value === "" && checkStepRef.current.mainIndustry) {
        setChildStep1((prev) => prev - 1 / 3 / 4);
        checkStepRef.current.mainIndustry = false;
      }
    }
  }
  function onHandleSubmit(data) {
    setInfoRegister2(data);
    setStep(3);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        <div className='form-group'>
          <p>Loại hình công ty</p>
          <div className='select-style'>
            <Controller
              name='companyType'
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  onChange={(value) => {
                    setValue("companyType", value);
                    if (checkStepRef.current.companyType === false) {
                      setChildStep1((prev) => prev + 1 / 3 / 4);
                      checkStepRef.current.companyType = true;
                    }
                  }}
                  placeholder='Chọn loại hình công ty'
                  options={optionsSelect.companyTypes}
                  className={checkStepRef.current.companyType ? " filled" : ""}
                />
              )}
            />
          </div>
          <div className='text-danger'>
            {errors?.companyType?.message && (
              <div>{errors.companyType.message}</div>
            )}
          </div>
        </div>
        <div className='form-group'>
          <p>Lĩnh vực hoạt động</p>
          <div className='select-style'>
            {" "}
            <Controller
              name='field'
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  onChange={(value) => {
                    setValue("field", value);
                    if (checkStepRef.current.field === false) {
                      setChildStep1((prev) => prev + 1 / 3 / 4);
                      checkStepRef.current.field = true;
                    }
                  }}
                  placeholder='Chọn lĩnh vực hoạt động'
                  options={optionsSelect?.field}
                  isMulti={true}
                  closeMenuOnSelect={false}
                  className={checkStepRef.current.field ? " filled" : ""}
                />
              )}
            />
          </div>

          <div className='text-danger'>
            {errors?.field?.message && <div>{errors.field.message}</div>}
          </div>
        </div>

        {infoRegister1?.companyInfo?.companyName && (
          <>
            <div className='form-group'>
              <p>Tên công ty</p>
              <input
                value={infoRegister1?.companyInfo?.companyName}
                className='form-control filled'
              />
            </div>
            <div className='form-group'>
              <p>Địa chỉ</p>
              <input
                value={infoRegister1?.companyInfo?.address}
                className='form-control filled'
              />
            </div>
          </>
        )}
        <div className='form-group'>
          <p>Ngành nghề chính</p>
          <input
            className={
              checkStepRef.current.mainIndustry
                ? "form-control filled"
                : "form-control"
            }
            placeholder='Nhập ngành nghề chính'
            {...register("mainIndustry")}
            data-testid='mainIndustry'
            onBlur={(e) => handleCheckInput(e)}
          />
          <div className='text-danger'>
            {errors?.mainIndustry?.message && (
              <div>{errors.mainIndustry.message}</div>
            )}
          </div>
        </div>
        <div className='form-group'>
          <p>Giấy phép kinh doanh</p>
          <input
            type='file'
            className={
              checkStepRef.current.businessLicense
                ? "form-control filled"
                : "form-control"
            }
            accept='image/*'
            onChange={uploadBusinessLicense}
          />
          <div className='text-danger'>
            {errors?.businessLicense?.message && (
              <div>{errors.businessLicense.message}</div>
            )}
          </div>
        </div>
        {/* Next Step Button */}
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
            Tiếp tục <i className='fa fa-arrow-right' aria-hidden='true'></i>
          </button>
        </div>
      </form>
    </>
  );
};

export default CompanyTaxInfo;
