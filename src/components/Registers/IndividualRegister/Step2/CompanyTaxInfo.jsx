import React, { useEffect, useRef, useState } from 'react';
import Select from 'react-select';
//hookform
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ReactSelectShowType from '../../../../customComponents/ReactSelectShowType/ReactSelectShowType';
import DropDownSelect from '../../../../customComponents/DropDownSelect/DropDownSelect';
import { selectStyle } from '../../../../constants/common';

const CompanyTaxInfo = ({
  setStep,
  optionsSelect,
  registerCompanyIn,
  setChildStep1,
  fetchDistric,
  fetchWard,
}) => {
  const checkStepRef = useRef({
    field: false,
    city: false,
    district: false,
    ward: false,
    address: false,
  });
  const schema = yup.object().shape({
    field: yup.array().required('Vui lòng nhập lĩnh vực kinh doanh'),
    city: yup.object().required('Vui lòng chọn tỉnh/thành phố'),
    district: yup.object().required('Vui lòng chọn quận/huyện'),
    ward: yup.object().required('Vui lòng chọn phường/xã'),
    address: yup.string().required('Vui lòng nhập địa chỉ'),
  });
  const {
    register,
    handleSubmit,
    setValue,
    control,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleCheckInput(e) {
    if (e.target.dataset.testid === 'address') {
      if (e.target.value !== '' && !checkStepRef.current.address) {
        setChildStep1((prev) => prev + 1 / 2 / 5);
        checkStepRef.current.address = true;
      }
      if (e.target.value === '' && checkStepRef.current.address) {
        setChildStep1((prev) => prev - 1 / 2 / 5);
        checkStepRef.current.address = false;
      }
    }
  }
  function onHandleSubmit(data) {
    console.log(data);
    registerCompanyIn(data);
  }
  function setChild() {
    setChildStep1((prev) => prev + 1 / 2 / 5);
  }
  return (
    <>
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        <div className='form-group'>
          <p>Lĩnh vực hoạt động</p>
          <div className='select-style'>
            {' '}
            {/* <Controller
              name='field'
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  styles={{
                    singleValue: (baseStyles, state) => ({
                      ...baseStyles,
                      color: 'black',
                      fontWeight: '550',
                    }),
                    optionsSelect: (baseStyles, state) => ({
                      ...baseStyles,
                      color: 'black',
                      fontWeight: '550',
                    }),
                  }}
                  onChange={(value) => {
                    setValue('field', value);
                    if (checkStepRef.current.field === false) {
                      setChildStep1((prev) => prev + 1 / 2 / 5);
                      checkStepRef.current.field = true;
                    }
                  }}
                  closeMenuOnSelect={false}
                  placeholder='Chọn lĩnh vực hoạt động'
                  options={optionsSelect?.field}
                  isMulti={true}
                  className={checkStepRef.current.field ? ' filled' : ''}
                />
              )}
            /> */}
            <div className={checkStepRef.current.field ? ' filled' : ''}>
              <DropDownSelect
                clearErrors={clearErrors}
                setValueForm={setValue}
                setChildStep1={setChild}
                checkStepRef={checkStepRef}
                placeholder='Chọn lĩnh vực hoạt động'
                options={optionsSelect?.field}
              />
            </div>
          </div>

          <div className='text-danger'>
            {errors?.field?.message && <div>{errors.field.message}</div>}
          </div>
        </div>

        <div className='form-group'>
          <p>Tỉnh/thành phố</p>
          <div className='select-style'>
            {' '}
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
                    setValue('city', value);
                    if (checkStepRef.current.city === false) {
                      setChildStep1((prev) => prev + 1 / 2 / 5);
                      checkStepRef.current.city = true;
                    }
                    fetchDistric(value?.value);
                  }}
                  className={checkStepRef.current.city ? ' filled' : ''}
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
            {' '}
            <Controller
              name='district'
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  styles={selectStyle}
                  placeholder='Chọn quận/huyện'
                  options={optionsSelect?.districts || []}
                  minInput={1}
                  onChange={(value) => {
                    setValue('district', value);
                    let city = getValues('city').value;
                    if (checkStepRef.current.district === false) {
                      setChildStep1((prev) => prev + 1 / 2 / 5);
                      checkStepRef.current.district = true;
                    }
                    fetchWard(city, value?.value);
                  }}
                  className={checkStepRef.current.district ? ' filled' : ''}
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
            {' '}
            <Controller
              name='ward'
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  styles={selectStyle}
                  placeholder='Chọn phường/xã'
                  options={optionsSelect?.wards || []}
                  minInput={1}
                  onChange={(value) => {
                    setValue('ward', value);
                    if (value !== null && !checkStepRef.current.ward) {
                      setChildStep1((prev) => prev + 1 / 2 / 5);
                      checkStepRef.current.ward = true;
                    }
                  }}
                  className={checkStepRef.current.ward ? ' filled' : ''}
                />
              )}
            />
          </div>

          <div className='text-danger'>
            {errors?.ward?.message && <div>{errors.ward.message}</div>}
          </div>
        </div>
        <div className='form-group'>
          <p>Địa chỉ</p>
          <input
            className={
              checkStepRef.current.address
                ? 'form-control filled'
                : 'form-control'
            }
            placeholder='Nhập địa chỉ'
            {...register('address')}
            data-testid='address'
            onBlur={handleCheckInput}
          />
          <div className='text-danger'>
            {errors?.address?.message && <div>{errors.address.message}</div>}
          </div>
        </div>
        {/* Next Step Button */}
        <div className='form-group register-btn'>
          <button
            type='button'
            className='site-button dz-xs-flex m-r5 btn '
            onClick={() => {
              setStep((prev) => prev - 1);
            }}
          >
            <i className='fa fa-arrow-left' aria-hidden='true'></i> Quay lại
          </button>
          <button
            type='submit'
            className='site-button dz-xs-flex m-r5 float-right btn'
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
