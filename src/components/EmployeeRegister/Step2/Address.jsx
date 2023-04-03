import React from 'react';
import ReactSelectShowType from '../../../customComponents/ReactSelectShowType/ReactSelectShowType';
//hookform
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRef } from 'react';
import { selectStyle } from '../../../constants/common';
// import '../RegisterStyles.css'
import Select from 'react-select';
import Datepicker from '../../../customComponents/DatePickerMonth';
const Address = ({
  setStep,
  setInfoRegister2,
  optionsSelect,
  fetchDistric,
  fetchWard,
  setChildStep,
}) => {
  const genderOptions = [
    { value: 'Nam', label: 'Nam' },
    { value: 'Nữ', label: 'Nữ' },
  ];
  const checkStepRef = useRef({
    city: false,
    district: false,
    ward: false,
    address: false,
    birthday: false,
    gender: false,
  });
  const schema = yup.object().shape({
    city: yup.object().required('Vui lòng chọn tỉnh/thành phố'),
    district: yup.object().required('Vui lòng chọn quận/huyện'),
    ward: yup.object().required('Vui lòng chọn phường/xã'),
    address: yup.string().required('Vui lòng nhập địa chỉ'),
    birthday: yup
      .date()
      .required('Vui lòng nhập ngày sinh')
      .typeError('Vui lòng nhập ngày sinh'),
    gender: yup.object().required('Vui lòng nhập giới tính'),
  });
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    clearErrors,
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
    if (e.target.dataset.testid === 'address') {
      if (e.target.value !== '' && !checkStepRef.current.address) {
        setChildStep((prev) => prev + 1 / 3 / 6);
        checkStepRef.current.address = true;
      }
      if (e.target.value === '' && checkStepRef.current.address) {
        setChildStep((prev) => prev - 1 / 3 / 6);
        checkStepRef.current.address = false;
      }
    }
    if (e.target.dataset.testid === 'birthday') {
      if (e.target.value !== '' && !checkStepRef.current.birthday) {
        setChildStep((prev) => prev + 1 / 3 / 6);
        checkStepRef.current.birthday = true;
      }
      if (e.target.value === '' && checkStepRef.current.birthday) {
        setChildStep((prev) => prev - 1 / 3 / 6);
        checkStepRef.current.birthday = false;
      }
    }
  }
  function handleCheckInputSelect(e) {
    if (e !== null && !checkStepRef.current.gender) {
      setChildStep((prev) => prev + 1 / 3 / 6);
      checkStepRef.current.gender = true;
      setValue('gender', e);
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
            {' '}
            <Controller
              name='city'
              control={control}
              render={({ field }) => (
                <ReactSelectShowType
                  {...field}
                  value={getValues('city')?.value ? getValues('city') : null}
                  placeholder='Chọn tỉnh/thành phố'
                  options={optionsSelect?.provinces}
                  minInput={1}
                  onChange={(value) => {
                    setValue('ward', null);
                    setValue('district', null);
                    setValue('city', value);
                    if (checkStepRef.current.city === false) {
                      setChildStep((prev) => prev + 1 / 3 / 6);
                      checkStepRef.current.city = true;
                    }
                    if (checkStepRef.current.ward === true) {
                      setChildStep((prev) => prev - 1 / 3 / 6);
                      checkStepRef.current.ward = false;
                    }
                    if (checkStepRef.current.district === true) {
                      setChildStep((prev) => prev - 1 / 3 / 6);
                      checkStepRef.current.district = false;
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
          <p>
            Quận/huyện <span className='asterisk'></span>
          </p>
          <div className='select-style'>
            {' '}
            <Controller
              name='district'
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  styles={selectStyle}
                  value={
                    getValues('district')?.value ? getValues('district') : null
                  }
                  placeholder='Chọn quận/huyện'
                  options={optionsSelect?.districts || []}
                  minInput={1}
                  onChange={(value) => {
                    setValue('ward', null);
                    setValue('district', value);
                    let city = getValues('city').value;
                    if (checkStepRef.current.district === false) {
                      setChildStep((prev) => prev + 1 / 3 / 6);
                      checkStepRef.current.district = true;
                    }
                    if (checkStepRef.current.ward === true) {
                      setChildStep((prev) => prev - 1 / 3 / 6);
                      checkStepRef.current.ward = false;
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
          <p>
            Phường/xã <span className='asterisk'></span>
          </p>
          <div className='select-style'>
            {' '}
            <Controller
              name='ward'
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  styles={selectStyle}
                  value={getValues('ward')?.value ? getValues('ward') : null}
                  placeholder='Chọn phường/xã'
                  options={optionsSelect?.wards || []}
                  minInput={1}
                  onChange={(value) => {
                    setValue('ward', value);
                    if (value !== null && !checkStepRef.current.ward) {
                      setChildStep((prev) => prev + 1 / 3 / 6);
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
          <p>
            Địa chỉ <span className='asterisk'></span>
          </p>
          <input
            // className='form-control'
            className={
              checkStepRef.current.address
                ? 'form-control filled'
                : 'form-control'
            }
            placeholder='Nhập số nhà, tên đường'
            {...register('address')}
            data-testid='address'
            onBlur={handleCheckInput}
          />
          <div className='text-danger'>
            {errors?.address?.message && <div>{errors.address.message}</div>}
          </div>
        </div>
        <div className='form-group'>
          <p>
            Ngày sinh <span className='asterisk'></span>
          </p>
          <div
            className={
              checkStepRef.current.birthday
                ? 'form-control filled d-flex'
                : 'form-control d-flex'
            }
          >
            <Datepicker
              register={{ ...register('birthday') }}
              name='birthday'
              getValues={getValues}
              testId='birthday'
              placeholder='dd/mm/yyyy'
              dateFormat='dd/MM/yyyy'
              showMonthYearPicker={false}
              handleOnChange={(date) => {
                console.log(date);
                console.log(
                  date.toString().split(' ')[1] + date.toString().split(' ')[3]
                );
                setValue('birthday', date);
                let e = { target: { dataset: { testid: 'birthday' } } };
                handleCheckInput(e);
                clearErrors('birthday');
              }}
            />
            <i class='fa fa-calendar-o calendar-icon' aria-hidden='true'></i>
          </div>

          {/* <input
            type='date'
            className={
              checkStepRef.current.birthday
                ? 'form-control  filled'
                : 'form-control '
            }
            placeholder='Nhập ngày sinh'
            {...register('birthday')}
            data-testid='birthday'
            onBlur={handleCheckInput}
          /> */}
          <div className='text-danger'>
            {errors.birthday?.message && <div>{errors.birthday.message}</div>}
          </div>
        </div>
        <div className='form-group'>
          <p>
            Giới tính <span className='asterisk'></span>
          </p>
          <div className='select-style'>
            {' '}
            <Controller
              name='gender'
              control={control}
              render={({ field }) => (
                <Select
                  styles={selectStyle}
                  {...field}
                  onChange={(e) => handleCheckInputSelect(e)}
                  placeholder='Chọn giới tính'
                  options={genderOptions}
                  className={checkStepRef.current.gender ? ' filled' : ''}
                />
              )}
            />
          </div>

          <div className='text-danger'>
            {errors.gender?.message && <div>{errors.gender.message}</div>}
          </div>
        </div>
        <div className='form-group text-right register-btn'>
          <button
            type='button'
            className='site-button dz-xs-flex m-r5 btn'
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
