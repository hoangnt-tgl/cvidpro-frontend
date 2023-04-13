import React, { useState, useMemo } from 'react';
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
const EditableField = ({
  type,
  label,
  value,
  confirm,
  isUpdate,
  selectUpdate,
  handleUpdate,
  openModalOtp,
  isUpdateSuccess,
}) => {
  const schemaEmail = yup.object().shape({
    Email: yup
      .string()
      .required('Vui lòng nhập email')
      .email('Email không hợp lệ'),
  });
  const schemaPhone = yup.object().shape({
    Phone: yup.string().required('Vui lòng nhập số điện thoại').length(10),
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: useMemo(() => {
      return { [label]: value };
    }, []),
    resolver: yupResolver(label === 'Email' ? schemaEmail : schemaPhone),
  });
  function handleOnSubmit(data) {
    console.log(data);
    handleUpdate(data.Email);
    // let e = { target: { dataset: { update: '' } } };
    // selectUpdate(e);
  }
  useEffect(() => {
    if (!isUpdateSuccess && !openModalOtp) {
      let e = { target: { dataset: { update: '' } } };
      selectUpdate(e);
      setValue(label, value);
    }
  }, [isUpdateSuccess, openModalOtp]);
  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <div className='form-group'>
        <label className='border-bottom w-100 pb-1 mb-3'>{label}</label>
        <div
          className={`row align-items-center edit-able ${
            isUpdate === label && 'editing'
          } `}
        >
          <input {...register(label)} type={type} />{' '}
          <span className='input-underline' />
          {confirm ? (
            <div className='row align-items-center pr-3'>
              {isUpdate !== label && (
                <p className='col mb-0 text-success font-20'>
                  <i class='fa fa-check-circle' aria-hidden='true'></i>
                </p>
              )}

              {isUpdate === label ? (
                <button
                  className='btn btn-primary btn-md'
                  data-update=''
                  type='submit'
                >
                  Đồng ý
                </button>
              ) : (
                <button
                  type='button'
                  className='btn btn-primary btn-md'
                  data-update={label}
                  onClick={(e) => {
                    e.preventDefault();
                    selectUpdate(e);
                  }}
                >
                  Cập nhật
                </button>
              )}
            </div>
          ) : (
            <div className='row align-items-center pr-3'>
              <p className='col mb-0 text-danger font-20'>
                <i class='fa fa-times-circle' aria-hidden='true'></i>
              </p>
              <button className='btn btn-primary btn-md'>Xác thực</button>
            </div>
          )}
        </div>
        <div className='text-danger'>
          {errors[label]?.message && <span>{errors[label].message}</span>}
        </div>
      </div>
    </form>
  );
};
const Index = ({ companyInfo, selectUpdate, isUpdate }) => {
  const [openModalOtp, setOpenModalOtp] = useState(false);
  const [newValue, setNewValue] = useState('');
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);

  function getNew(data) {
    setNewValue(data);
    if (isUpdate === 'Email') {
      if (data !== companyInfo.email) {
        setOpenModalOtp(true);
      } else {
        let e = { target: { dataset: { update: '' } } };
        selectUpdate(e);
      }
    } else {
      if (data !== companyInfo.phone) {
        setOpenModalOtp(true);
      } else {
        let e = { target: { dataset: { update: '' } } };
        selectUpdate(e);
      }
    }
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
        <div className='border-bottom clearfix mb-4'>
          <h5 className='font-weight-700 pull-left text-uppercase'>
            Thông tin người liên hệ
          </h5>
        </div>
        <div className='row m-b30'>
          <div className='col-lg-12'>
            <div className='form-group'>
              <label className='border-bottom w-100 pb-1 mb-3'>Họ và tên</label>
              <p style={{ minHeight: 38 }} className='mb-0'>
                {companyInfo.name}
              </p>
            </div>
          </div>
          <div className='col-lg-12'>
            {companyInfo.phone && (
              <EditableField
                label={'Phone'}
                value={companyInfo.phone}
                type='text'
                confirm={companyInfo.confirmPhone}
                selectUpdate={selectUpdate}
                isUpdate={isUpdate}
                handleUpdate={getNew}
                openModalOtp={openModalOtp}
                isUpdateSuccess={isUpdateSuccess}
              />
            )}
          </div>
          <div className='col-lg-12'>
            {companyInfo.email && (
              <EditableField
                label={'Email'}
                value={companyInfo.email}
                type='email'
                confirm={companyInfo.confirmEmail}
                selectUpdate={selectUpdate}
                isUpdate={isUpdate}
                handleUpdate={getNew}
                openModalOtp={openModalOtp}
                isUpdateSuccess={isUpdateSuccess}
              />
            )}
          </div>
          <div className='col-lg-12'>
            <div className='form-group'>
              <label className='border-bottom w-100 pb-1 mb-3'>Chức vụ</label>
              <p style={{ minHeight: 38 }} className='mb-0'>
                {companyInfo.position}
              </p>
            </div>
          </div>
        </div>
      </div>
      <ModalOtp
        defaultValues={
          isUpdate === 'Email' ? companyInfo.email : companyInfo.phone
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
