import React, { useState, useMemo, useRef } from 'react';
import './styles.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  updateEmailCompany,
  updatePhoneCompany,
} from '../../../../services/CompanyApi';
import ModalOtp from './ModalOtp';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import useUpdatePresenterCompany from '../../../../hooks/useUpdatePresenterCompany';
import ModalUpdatePresenter from './ModalUpdatePresenter';
const EditableField = ({
  errors,
  register,
  type,
  label,
  confirm,
  isUpdate,
  isUpdatePresenter,
  name,
}) => {
  return (
    <div className='form-group'>
      <label className='border-bottom w-100 pb-1 mb-3'>{label}</label>
      <div
        className={`row align-items-center edit-able ${
          isUpdatePresenter && confirm && 'editing'
        } `}
      >
        <input {...register} type={type} />{' '}
        <>
          {' '}
          {label === 'Email' || label === 'Phone' ? (
            <>
              {isUpdatePresenter ? (
                <>
                  {!confirm && (
                    <div className='row align-items-center pr-3'>
                      <p className='col mb-0 text-danger font-14'>
                        {/* <i class='fa fa-times-circle' aria-hidden='true'></i> */}
                        Chưa xác thực
                      </p>
                      <button className='btn btn-primary btn-md' type='button'>
                        Xác thực
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {' '}
                  {confirm ? (
                    <div className='row align-items-center pr-3'>
                      {isUpdate !== label && (
                        <p className='col mb-0 text-success font-14'>
                          {/* <i class='fa fa-check-circle' aria-hidden='true'></i> */}
                          Đã xác thực
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className='row align-items-center pr-3'>
                      <p className='col mb-0 text-danger font-14'>
                        {/* <i class='fa fa-times-circle' aria-hidden='true'></i> */}
                        Chưa xác thực
                      </p>
                      <button className='btn btn-primary btn-md' type='button'>
                        Xác thực
                      </button>
                    </div>
                  )}
                </>
              )}{' '}
              {/* {confirm ? (
                  <div className='row align-items-center pr-3'>
                    {isUpdate !== label && (
                      <p className='col mb-0 text-success font-14'>
                        Đã xác thực
                      </p>
                    )}
                  </div>
                ) : (
                  <div className='row align-items-center pr-3'>
                    <p className='col mb-0 text-danger font-14'>
                      Chưa xác thực
                    </p>
                    <button className='btn btn-primary btn-md' type='button'>
                      Xác thực
                    </button>
                  </div>
                )} */}
            </>
          ) : (
            <></>
          )}
        </>
      </div>
      <div className='text-danger'>
        {errors[name]?.message && <span>{errors[name].message}</span>}
      </div>
    </div>
  );
};
const Index = ({ companyInfo, selectUpdate, isUpdate }) => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Vui lòng nhập email')
      .email('Email không hợp lệ'),
    phone: yup.string().required('Vui lòng nhập số điện thoại').length(10),
    name: yup.string().required('Vui lòng nhập tên'),
    position: yup.string().required('Vui lòng nhập chức vụ'),
  });
  const {
    register,
    handleSubmit,
    errors,
    openUpdate,
    setOpenUpdate,
    handleOnSubmit,
    openModalOtp,
    setOpenModalOtp,
  } = useUpdatePresenterCompany(companyInfo, schema);
  const [isUpdatePresenter, setIsUpdatePresenter] = useState(false);
  const [newValue, setNewValue] = useState('');
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);

  function getNew(data) {
    console.log(data);
    setIsUpdatePresenter(false);
    setOpenModalOtp(true);
    // setNewValue(data);
    // if (isUpdate === 'Email') {
    //   if (data !== companyInfo.email) {
    //     setOpenModalOtp(true);
    //   } else {
    //     let e = { target: { dataset: { update: '' } } };
    //     selectUpdate(e);
    //   }
    // } else {
    //   if (data !== companyInfo.phone) {'
    //     setOpenModalOtp(true);
    //   } else {
    //     let e = { target: { dataset: { update: '' } } };
    //     selectUpdate(e);
    //   }
    // }
  }

  async function handeUpdateEmail(data) {
    let body = { email: newValue, id: companyInfo._id, otp: data };
    let e = { target: { dataset: { update: '' } } };
    try {
      await updateEmailCompany(body);
      setIsUpdateSuccess(true);
      selectUpdate(e);
      setOpenModalOtp(false);
      toast.success('Cập nhật thành công');
    } catch (error) {
      toast.error(error.response.data.message);
      setIsUpdateSuccess(false);
      setOpenModalOtp(false);
    }
  }
  async function handeUpdatePhone(data) {
    let body = { phone: newValue, id: companyInfo._id, otp: data };
    let e = { target: { dataset: { update: '' } } };
    console.log(body);
    try {
      await updatePhoneCompany(body);
      setIsUpdateSuccess(true);
      selectUpdate(e);
      setOpenModalOtp(false);
      toast.success('Cập nhật thành công');
    } catch (error) {
      toast.error(error.response.data.message);
      setIsUpdateSuccess(false);
      setOpenModalOtp(false);
    }
  }
  return (
    <>
      {' '}
      <div className='col-lg-6 col-md-12'>
        <div className='border-bottom  mb-4 d-flex justify-content-between align-items-center flex-wrap'>
          <h5 className='font-weight-700 pull-left text-uppercase'>
            Thông tin người quản lý tài khoản
          </h5>
          <button
            type='button'
            className='btn btn-primary btn-md'
            onClick={(e) => {
              e.preventDefault();
              setOpenUpdate(true);
            }}
          >
            Thay đổi
          </button>
        </div>

        <div
          className={
            isUpdatePresenter
              ? 'presenter-editing row m-b30 form-presenter'
              : 'row m-b30 form-presenter '
          }
        >
          <div className='col-lg-12'>
            <EditableField
              errors={errors}
              register={{ ...register('name') }}
              label={'Họ và tên'}
              name='name'
              type='text'
              confirm={true}
              selectUpdate={selectUpdate}
              isUpdate={isUpdate}
              handleUpdate={getNew}
              openModalOtp={openModalOtp}
              isUpdateSuccess={isUpdateSuccess}
              isUpdatePresenter={isUpdatePresenter}
            />
          </div>
          <div className='col-lg-12'>
            <EditableField
              errors={errors}
              register={{ ...register('phone') }}
              label={'Phone'}
              name='phone'
              type='text'
              confirm={companyInfo.confirmPhone}
              selectUpdate={selectUpdate}
              isUpdate={isUpdate}
              handleUpdate={getNew}
              openModalOtp={openModalOtp}
              isUpdateSuccess={isUpdateSuccess}
              isUpdatePresenter={isUpdatePresenter}
            />
          </div>
          <div className='col-lg-12'>
            <EditableField
              errors={errors}
              register={{ ...register('email') }}
              label={'Email'}
              name='email'
              type='email'
              confirm={companyInfo.confirmEmail}
              selectUpdate={selectUpdate}
              isUpdate={isUpdate}
              handleUpdate={getNew}
              openModalOtp={openModalOtp}
              isUpdateSuccess={isUpdateSuccess}
              isUpdatePresenter={isUpdatePresenter}
            />
          </div>
          <div className='col-lg-12'>
            <EditableField
              errors={errors}
              register={{ ...register('position') }}
              label={'Chức vụ'}
              name='position'
              type='text'
              confirm={true}
              selectUpdate={selectUpdate}
              isUpdate={isUpdate}
              handleUpdate={getNew}
              openModalOtp={openModalOtp}
              isUpdateSuccess={isUpdateSuccess}
              isUpdatePresenter={isUpdatePresenter}
            />
          </div>
        </div>
      </div>
      <ModalUpdatePresenter
        openUpdate={openUpdate}
        setOpenUpdate={setOpenUpdate}
        errors={errors}
        register={register}
        handleSubmit={handleSubmit}
        handleOnSubmit={handleOnSubmit}
        phoneConfirm={!companyInfo.confirmPhone}
        emailConfirm={!companyInfo.confirmEmail}
      />
      <ModalOtp
        defaultValues={
          'Email' === 'Email' ? companyInfo.email : companyInfo.phone
        }
        openModal={openModalOtp}
        setOpenModal={setOpenModalOtp}
        isCompany={true}
        handeUpdate={isUpdate === 'Email' ? handeUpdateEmail : handeUpdatePhone}
      />
    </>
  );
};

export default Index;
