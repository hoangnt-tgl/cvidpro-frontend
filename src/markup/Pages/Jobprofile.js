import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Header2 from './../Layout/HeaderEmployee';
import Footer from './../Layout/Footer';
import Profilesidebar from './../Element/Profilesidebar';
import {
  getMyResume,
  addSchool,
  deleteSchool,
  sendOTP,
  confirmPhone,
  addShortTraining,
  deleteShortTraining,
  addWorkExperience,
  deleteWorkExperience,
} from '../../services/EmployeeApi';
import { formatDate } from '../../helperFC/Function';
import useUpdateProfile from '../../hooks/useUpdateProfile';
import ModalUpdateProfile from '../../components/EmployeeComponents/EmployeeProfile/ModalUpdateProfile';
import ModalUpdateEmailOrPhone from '../../components/EmployeeComponents/EmployeeProfile/ModalUpdatePresenter';
import useUpdateEmail, { useUpdatePhone } from '../../hooks/useUpdateEmail';
import ModalOtp from '../../components/CompanyComponents/CompanyProfile/CompanyPresenter/ModalOtp';

function Jobprofile(props) {
  const {
    openUpdate,
    setOpenUpdate,
    userInformation,
    register,
    handleOnSubmit,
    handleSubmit,
    uploadAvatar,
    control,
  } = useUpdateProfile(props);
  const [
    resgisterEmail,
    handleSubmitEmail,
    handleOnSubmitEmail,
    openUpdateEmail,
    setOpenUpdateEmail,
    errorsEmail,
    updateEmail,
    openModalOtpEmail,
    setOpenModalOtpEmail,
  ] = useUpdateEmail(userInformation);
  const [
    resgisterPhone,
    handleSubmitPhone,
    handleOnSubmitPhone,
    openUpdatePhone,
    setOpenUpdatePhone,
    errorsPhone,
    updatePhone,
    openModalOtpPhone,
    setOpenModalOtpPhone,
  ] = useUpdatePhone(userInformation);

  const [isPhone, setIsPhone] = useState(false);
  const inputFieldEmail = [
    {
      register: 'email',
      placeholder: 'Nhập email',
      title: 'Email',
      type: 'text',
      accept: '',
      disable: false,
    },
  ];
  const inputFieldPhone = [
    {
      register: 'phone',
      placeholder: 'Nhập số điện thoại',
      title: 'Số điện thoại',
      type: 'text',
      accept: '',
      disable: false,
    },
  ];
  return (
    <>
      <Header2 />
      <div className='page-content bg-white'>
        <div className='content-block'>
          <div className='section-full bg-white browse-job p-t50 p-b20 px-3'>
            <div className='container'>
              <div className='m-b30'>
                <div className='job-bx submit-resume row'>
                  <div className='col-lg-6 col-md-12'>
                    <div
                      className='border-bottom clearfix m-0 mb-4 row align-items-center'
                      style={{ paddingBottom: 10.5 }}
                    >
                      <h5 className='font-weight-700 pull-left text-uppercase mb-0'>
                        Thông tin cá nhân
                      </h5>
                      <div
                        style={{ cursor: 'pointer', marginLeft: 16 }}
                        onClick={() => {
                          setOpenUpdate(true);
                        }}
                      >
                        <i
                          class='fa fa-pencil-square-o'
                          style={{ fontSize: 20, color: '#0275d8' }}
                          aria-hidden='true'
                        ></i>
                      </div>
                    </div>
                    <form>
                      <div className='row m-b30'>
                        <div className='col-lg-12'>
                          <div className='form-group'>
                            <label className='border-bottom w-100 pb-1 mb-3'>
                              Họ và tên
                            </label>
                            <p style={{ minHeight: 38 }} className='mb-0'>
                              {userInformation.name}
                            </p>
                          </div>
                        </div>
                        <div className='col-lg-12'>
                          <div className='form-group'>
                            <label className='border-bottom w-100 pb-1 mb-3'>
                              Ngày sinh
                            </label>
                            <p style={{ minHeight: 38 }} className='mb-0'>
                              {formatDate(userInformation.birthday)}
                            </p>
                          </div>
                        </div>
                        <div className='col-lg-12'>
                          <div className='form-group'>
                            <label className='border-bottom w-100 pb-1 mb-3'>
                              Giới tính
                            </label>
                            <p style={{ minHeight: 38 }} className='mb-0'>
                              {userInformation.gender}
                            </p>
                          </div>
                        </div>
                        <div className='col-lg-12'>
                          <div className='form-group'>
                            <label className='border-bottom w-100 pb-1 mb-3'>
                              Chức danh
                            </label>
                            <p style={{ minHeight: 38 }} className='mb-0'>
                              {userInformation.jobTitle}
                            </p>
                          </div>
                        </div>
                        <div className='col-lg-12'>
                          <div className='form-group'>
                            <label className='border-bottom w-100 pb-1 mb-3'>
                              Học vấn
                            </label>
                            <p style={{ minHeight: 38 }} className='mb-0'>
                              {userInformation.school}
                            </p>
                          </div>
                        </div>
                        <div className='col-lg-12'>
                          <div className='form-group'>
                            <label className='border-bottom w-100 pb-1 mb-3'>
                              Tốt nghiệp
                            </label>
                            <p style={{ minHeight: 38 }} className='mb-0'>
                              {formatDate(userInformation.startYear)} -{' '}
                              {formatDate(userInformation.endYear)}
                            </p>
                          </div>
                        </div>
                        <div className='col-lg-12'>
                          <div className='form-group'>
                            <label className='border-bottom w-100 pb-1 mb-3'>
                              Trình độ
                            </label>
                            <p style={{ minHeight: 38 }} className='mb-0'>
                              {userInformation.level}
                            </p>
                          </div>
                        </div>
                        {/* <div className="col-lg-12">
                          <div className="form-group">
                            <label className="border-bottom w-100 pb-1 mb-3">
                              Mức lương mong muốn
                            </label>
                            <p style={{ minHeight: 38 }} className="mb-0">
                              Chưa cập nhật
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label className="border-bottom w-100 pb-1 mb-3">
                              Mô tả
                            </label>
                            <p style={{ minHeight: 38 }} className="mb-0">
                              Chưa cập nhật
                            </p>
                          </div>
                        </div> */}
                      </div>
                    </form>
                  </div>
                  <div className='col-lg-6 col-md-12'>
                    <div className='border-bottom mb-4 d-flex justify-content-between align-items-center flex-wrap'>
                      <h5 className='font-weight-700 pull-left text-uppercase'>
                        Thông tin liên hệ
                      </h5>
                    </div>
                    <div className='row m-b30'>
                      <div className='col-lg-12'>
                        <div className='form-group'>
                          <label className='border-bottom w-100 pb-1 mb-3'>
                            Họ và tên
                          </label>
                          <p style={{ minHeight: 38 }} className='mb-0'>
                            {userInformation.name}
                          </p>
                        </div>
                      </div>
                      <div className='col-lg-12'>
                        <div className='form-group'>
                          <label className='border-bottom w-100 pb-1 mb-3'>
                            Số điện thoại
                          </label>
                          <div className='row align-items-center pr-3'>
                            <p className='col mb-0'>
                              {userInformation.username}
                            </p>
                            {userInformation.confirmPhone ? (
                              <div className='row align-items-center pr-3'>
                                <p className='col mb-0 text-success font-14'>
                                  Đã xác thực
                                </p>
                                <button
                                  className='btn btn-primary btn-md'
                                  onClick={() => {
                                    setOpenUpdatePhone(true);
                                    setIsPhone(true);
                                  }}
                                >
                                  Thay đổi
                                </button>
                              </div>
                            ) : (
                              <div className='row align-items-center pr-3'>
                                <p className='col mb-0 text-danger font-14'>
                                  Chưa xác thực
                                </p>
                                <button className='btn btn-primary btn-md'>
                                  Xác thực
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className='col-lg-12'>
                        <div className='form-group'>
                          <label className='border-bottom w-100 pb-1 mb-3'>
                            Email
                          </label>
                          <div className='row align-items-center pr-3'>
                            <p className='col mb-0'>{userInformation.email}</p>
                            {userInformation.confirmEmail ? (
                              <div className='row align-items-center pr-3'>
                                <p className='col mb-0 text-success font-14'>
                                  Đã xác thực
                                </p>
                                <button
                                  className='btn btn-primary btn-md'
                                  onClick={() => {
                                    setOpenUpdateEmail(true);
                                    setIsPhone(false);
                                  }}
                                >
                                  Thay đổi
                                </button>
                              </div>
                            ) : (
                              <div className='row align-items-center pr-3'>
                                <p className='col mb-0 text-danger font-14'>
                                  Chưa xác thực
                                </p>
                                <button className='btn btn-primary btn-md'>
                                  Xác thực
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className='col-lg-12'>
                        <div className='form-group'>
                          <label className='border-bottom w-100 pb-1 mb-3'>
                            Địa chỉ
                          </label>
                          <p style={{ minHeight: 38 }} className='mb-0'>
                            {userInformation.address}, phường{' '}
                            {userInformation.ward}, huyện{' '}
                            {userInformation.district}, tỉnh{' '}
                            {userInformation.province}
                          </p>
                        </div>
                      </div>
                      {/* <div className="col-lg-12">
                        <div className="form-group">
                          <label className="border-bottom w-100 pb-1 mb-3">
                            Tỉnh
                          </label>
                          <p style={{ minHeight: 38 }} className="mb-0">
                            {userInformation.province}
                          </p>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalUpdateProfile
        openUpdate={openUpdate}
        setOpenUpdate={setOpenUpdate}
        userInformation={userInformation}
        register={register}
        handleSubmit={handleSubmit}
        handleOnSubmit={handleOnSubmit}
        uploadAvatar={uploadAvatar}
        control={control}
        birthday={userInformation.birthday}
      />
      <ModalUpdateEmailOrPhone
        openUpdate={openUpdateEmail}
        setOpenUpdate={setOpenUpdateEmail}
        register={resgisterEmail}
        handleSubmit={handleSubmitEmail}
        handleOnSubmit={handleOnSubmitEmail}
        inputField={inputFieldEmail}
        errors={errorsEmail}
        titleModal='Cập nhật email'
      />{' '}
      <ModalUpdateEmailOrPhone
        openUpdate={openUpdatePhone}
        setOpenUpdate={setOpenUpdatePhone}
        register={resgisterPhone}
        handleSubmit={handleSubmitPhone}
        handleOnSubmit={handleOnSubmitPhone}
        inputField={inputFieldPhone}
        errors={errorsPhone}
        titleModal='Cập nhật số điện thoại'
      />{' '}
      <ModalOtp
        isOtpPhone={isPhone ? true : false}
        defaultValues={
          isPhone ? userInformation.username : userInformation.email
        }
        openModal={isPhone ? openModalOtpPhone : openModalOtpEmail}
        setOpenModal={isPhone ? setOpenModalOtpPhone : setOpenModalOtpEmail}
        isCompany={true}
        handeUpdate={isPhone ? updatePhone : updateEmail}
      />
      <Footer />
    </>
  );
}
export default Jobprofile;
