import React, { useEffect, useState } from "react";
import Select from "react-select";
//hookform
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const CompanyTaxInfo = ({
  setStep,
  optionsSelect,
  registerCompany,
  getCompanyInfo,
}) => {
  let [trigger, setTrigger] = useState(false);
  const schema = yup.object().shape({
    companyType: yup.object().required("Vui lòng chọn loại hình công ty"),
    field: yup.array().required("Vui lòng nhập lĩnh vực kinh doanh"),
    taxCode: yup.string().required("Vui lòng nhập mã số thuế"),
    mainIndustry: yup.string().required("Vui lòng nhập ngành nghề chính"),
    businessLicense: yup.mixed().required("Vui lòng tải giấy phép kinh doanh"),
    checked: yup.boolean().oneOf([true], "Vui lòng đồng ý điều khoản"),
    companyInfo: yup.object().required("Vui lòng đợi lấy thông tin công ty"),
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
  function uploadBusinessLicense(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64 = reader.result;
      setValue("businessLicense", base64);
    };
  }
  function onHandleSubmit(data) {
    console.log(data);
    // console.log(errors);
    if (Object.keys(errors).length === 0) {
      registerCompany(data);
    }
  }
  async function handleGetLegalCompanyInfo(e) {
    if (e.target.value.length < 10) return;
    console.log("chay");
    let companyData = await getCompanyInfo(e.target.value);
    setValue("companyInfo", companyData);
    setTrigger(!trigger);
  }
  useEffect(() => {
    console.log(getValues());
  }, [trigger]);
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
                  placeholder='Chọn loại hình công ty'
                  options={optionsSelect.companyTypes}
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
                  placeholder='Chọn lĩnh vực hoạt động'
                  options={optionsSelect?.field}
                  isMulti={true}
                />
              )}
            />
          </div>

          <div className='text-danger'>
            {errors?.field?.message && <div>{errors.field.message}</div>}
          </div>
        </div>
        <div className='form-group'>
          <p>Mã số thuế</p>
          <input
            {...register("taxCode")}
            onBlur={handleGetLegalCompanyInfo}
            className='form-control'
            placeholder='Nhập mã số thuế'
          />
          <div className='text-danger'>
            {errors?.taxCode?.message && <div>{errors.taxCode.message}</div>}
          </div>
        </div>
        {getValues("companyInfo")?.companyName && (
          <>
            <div className='form-group'>
              <p>Tên công ty</p>
              <input
                value={getValues("companyInfo")?.companyName}
                className='form-control'
              />
            </div>
            <div className='form-group'>
              <p>Địa chỉ</p>
              <input
                value={getValues("companyInfo")?.address}
                className='form-control'
              />
            </div>
          </>
        )}
        <div className='form-group'>
          <p>Ngành nghề chính</p>
          <input
            className='form-control'
            placeholder='Nhập ngành nghề chính'
            {...register("mainIndustry")}
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
            className='form-control'
            accept='image/*'
            onChange={uploadBusinessLicense}
          />
          <div className='text-danger'>
            {errors?.businessLicense?.message && (
              <div>{errors.businessLicense.message}</div>
            )}
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
            Đăng ký
          </button>
        </div>
      </form>
    </>
  );
};

export default CompanyTaxInfo;
