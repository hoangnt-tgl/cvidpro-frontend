import React from "react";
import Select from "react-select";
const PersonalInfo = () => {
  return (
    <>
      {" "}
      <form>
        <p>Thông tin cá nhân :</p>
        <div className='form-group'>
          <p>Họ và tên</p>
          <input className='form-control small' placeholder='Nhập họ và tên' />
          <div className='text-danger'>
            {/* {errors.name && <div>{errors.name}</div>} */}
          </div>
        </div>
        <div className='form-group'>
          <p>Số điện thoại</p>
          <input
            text='text'
            className='form-control'
            placeholder='Nhập số điện thoại'
          />
          <div className='text-danger'>
            {/* {errors.username && <div>{errors.username}</div>} */}
          </div>
        </div>
        <div className='form-group'>
          <p>Ngày sinh</p>
          <input
            type='date'
            className='form-control'
            placeholder='Nhập ngày sinh'
          />
          <div className='text-danger'>
            {/* {errors.birthday && <div>{errors.birthday}</div>} */}
          </div>
        </div>
        <div className='form-group'>
          <p>Giới tính</p>
          <div className="select-style">
            {" "}
            <Select
              placeholder='Chọn giới tính'
              // onChange={(e) => setGender(e.label)}
              // options={genderOptions}
            />
          </div>

          <div className='text-danger'>
            {/* {errors.gender && <div>{errors.gender}</div>} */}
          </div>
        </div>
        <div className='form-group'>
          <p>Email</p>
          <input
            type='email'
            className='form-control'
            placeholder='Nhập email'
          />
          <div className='text-danger'>
            {/* {errors.email && <div>{errors.email}</div>} */}
          </div>
        </div>
        <div className='form-group'>
          <p>Mật khẩu</p>
          <input className='form-control' placeholder='Nhập mật khẩu' />
          <div className='text-danger'>
            {/* {errors.password && <div>{errors.password}</div>} */}
          </div>
        </div>
        <div className='form-group'>
          <p>Nhập lại mật khẩu</p>
          <input className='form-control' placeholder='Nhập lại mật khẩu' />
          <div className='text-danger'>
            {/* {errors.confirmPassword && <div>{errors.confirmPassword}</div>} */}
          </div>
        </div>
        <div className='form-group text-right register-btn'>
          <button type='button' className='site-button dz-xs-flex m-r5 btn'>
            Tiếp tục <i className='fa fa-arrow-right' aria-hidden='true'></i>
          </button>
        </div>
      </form>
    </>
  );
};

export default PersonalInfo;
