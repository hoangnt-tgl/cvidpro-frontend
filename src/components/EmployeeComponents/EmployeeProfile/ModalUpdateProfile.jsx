import React from 'react';
import { Modal } from 'react-bootstrap';
// import NormalInput from '../../../customComponents/NormalInput/Index.jsx'
import MuiDatePicker from '../../../customComponents/MuiDatePicker/index.jsx';
import { Controller } from 'react-hook-form';
import MuiDate from '../../../customComponents/MuiDatePicker';
import moment from 'moment';
const ModalUpdateProfile = ({
  openUpdate,
  setOpenUpdate,
  register,
  handleOnSubmit,
  handleSubmit,
  uploadAvatar,
  control,
  birthday,
}) => {
  const inputField = [
    {
      register: 'name',
      placeholder: 'Nhập họ tên',
      title: 'Họ và tên',
      type: 'text',
      accept: '',
    },
    // {
    //   register: 'birthday',
    //   placeholder: 'Nhập ngày sinh',
    //   title: 'Ngày sinh',
    //   type: 'text',
    //   accept: '',
    // },
    {
      register: 'gender',
      placeholder: 'Nhập giới tính',
      title: 'Giới tính',
      type: 'text',
      accept: '',
    },
    {
      register: 'address',
      placeholder: 'Nhập địa chỉ',
      title: 'Địa chỉ',
      type: 'text',
      accept: '',
    },
    {
      register: 'ward',
      placeholder: 'Nhập phường,xã',
      title: 'Phường xã',
      type: 'text',
      accept: '',
    },
    {
      register: 'district',
      placeholder: 'Nhập quận,huyện',
      title: 'Quận huyện',
      type: 'text',
      accept: '',
    },
    {
      register: 'province',
      placeholder: 'Nhập tỉnh, thành phố',
      title: 'Tỉnh thành phố',
      type: 'text',
      accept: '',
    },
  ];
  console.log(birthday);
  return (
    <Modal
      fullscreen={true}
      size='lg'
      dialogClassName='modal-90w'
      show={openUpdate}
      onHide={setOpenUpdate}
      className='modal fade modal-bx-info'
    >
      <Modal.Header closeButton>
        <div className='logo-img'>{/* <img alt='' src={icon} /> */}</div>
        <h5 className='modal-title text-center'>Cập nhật thông tin cá nhân</h5>
      </Modal.Header>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <Modal.Body>
          <div class='row font-size-14 lessbold'>
            {inputField.map((item, idx) => {
              return (
                <div
                  className='col-6 col-lg-6 col-md-12 m-b20 form-group'
                  key={idx}
                >
                  <p style={{ color: '#232323' }}>{item.title}</p>
                  <input
                    type={item.type}
                    className='form-control'
                    {...register(item.register)}
                  />
                </div>
              );
            })}
            <div className='col-6 col-lg-6 col-md-12 m-b20 form-group'>
              <p style={{ color: '#232323' }}>Ảnh đại diện</p>
              <input
                type='file'
                accept='image/*'
                className='form-control'
                {...register('avatar')}
                onChange={uploadAvatar}
                style={{ paddingTop: '7px', paddingBottom: '7px' }}
              />
            </div>
            <div className='col-6 col-lg-6 col-md-12 m-b20 form-group'>
              {' '}
              <p style={{ color: '#232323' }}>Ngày sinh</p>
              <Controller
                name='birthday'
                control={control}
                render={({ field: { onChange } }) => (
                  <MuiDate
                    format={'DD-MM-YYYY'}
                    className={'form-control'}
                    defaultValue={moment(birthday)}
                    onChange={(date, validationError) => {
                      onChange(date);
                    }}
                  />
                )}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {' '}
          <button type='submit' className='btn btn-primary'>
            Lưu
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalUpdateProfile;
