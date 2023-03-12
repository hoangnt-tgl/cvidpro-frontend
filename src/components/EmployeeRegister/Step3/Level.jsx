import React from "react";
import ReactSelectShowType from "../../../customComponents/ReactSelectShowType/ReactSelectShowType";
import Select from "react-select";
const Level = () => {
  return (
    <>
      <form>
        <p>Thông tin về trình độ :</p>
        <div className='form-group'>
          <p>Trình độ</p>
          <div className='select-style'>
            {" "}
            <Select
              placeholder='Chọn trình độ'
              //   options={levels}
            />
          </div>

          <div className='text-danger'>
            {/* {errors.level && <div>{errors.level}</div>} */}
          </div>
        </div>
        <div className='form-group'>
          <p>Trường</p>
          <div className='select-style'>
            {" "}
            <ReactSelectShowType
              placeholder='Chọn trường'
              //   options={schools}
              minInput={1}
            />
          </div>

          <div className='text-danger'>
            {/* {errors.school && <div>{errors.school}</div>} */}
          </div>
        </div>
        <div className='form-group'>
          <p>Ngành</p>
          <div className='select-style'>
            {" "}
            <ReactSelectShowType
              minInput={1}
              placeholder='Chọn ngành'
              //   options={majors}
            />
          </div>

          <div className='text-danger'>
            {/* {errors.major && <div>{errors.major}</div>} */}
          </div>
        </div>
        <div className='form-group'>
          <p>Chức danh</p>
          <div className='select-style'>
            {" "}
            <ReactSelectShowType
              minInput={1}
              placeholder='Chọn chức danh'
              //   options={jobTitles}
            />
          </div>

          <div className='text-danger'>
            {/* {errors.jobTitle && <div>{errors.jobTitle}</div>} */}
          </div>
        </div>
        <div className='form-group'>
          <p>Năm bắt đầu</p>
          <input
            type='month'
            className='form-control'
            placeholder='Nhập năm bắt đầu'
          />
          <div className='text-danger'>
            {/* {errors.startYear && <div>{errors.startYear}</div>} */}
          </div>
        </div>
        <div className='form-group'>
          <p>Năm kết thúc</p>
          <input
            type='month'
            //   value={endYear}
            //   onChange={(e) => setEndYear(e.target.value)}
            className='form-control'
            placeholder='Nhập năm kết thúc'
          />
          <div className='text-danger'>
            {/* {errors.endYear && <div>{errors.endYear}</div>} */}
          </div>
        </div>
        <div className='form-group text-left'>
          <span className='custom-control custom-checkbox'>
            <input
              type='checkbox'
              className='custom-control-input'
              id='check1'
              // checked={isAgree}
              // onChange={(e) => setIsAgree(e.target.checked)}
            />
            <label className='custom-control-label' htmlFor='check1'>
              Tôi đồng ý với các điều khoản và điều kiện
            </label>
          </span>
        </div>
        <div className='form-group text-right register-btn'>
          <button type='button' className='site-button dz-xs-flex m-r5 '>
            <i className='fa fa-arrow-left' aria-hidden='true'></i> Quay lại
          </button>
          <button type='submit' className='site-button dz-xs-flex m-r5 btn'>
            Đăng ký
          </button>
        </div>
      </form>
    </>
  );
};

export default Level;
