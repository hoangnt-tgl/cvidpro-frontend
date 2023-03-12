import React from "react";
import ReactSelectShowType from "../../../customComponents/ReactSelectShowType/ReactSelectShowType";

const Address = () => {
  return (
    <>
      <form>
        <p>Địa chỉ :</p>
        <div className='form-group'>
          <p>Tỉnh/thành phố</p>
          <div className='select-style'>
            {" "}
            <ReactSelectShowType
              placeholder='Chọn tỉnh/thành phố'
              //   options={provinces}
              minInput={1}
            />
          </div>

          <div className='text-danger'>
            {/* {errors.province && <div>{errors.province}</div>} */}
          </div>
        </div>
        <div className='form-group'>
          <p>Quận/huyện</p>
          <div className='select-style'>
            {" "}
            <ReactSelectShowType
              placeholder='Chọn quận/huyện'
              //   options={districts}
              minInput={1}
            />
          </div>

          <div className='text-danger'>
            {/* {errors.district && <div>{errors.district}</div>} */}
          </div>
        </div>
        <div className='form-group'>
          <p>Phường/xã</p>
          <div className='select-style'>
            {" "}
            <ReactSelectShowType
              placeholder='Chọn phường/xã'
              //   options={wards}
              minInput={1}
            />
          </div>

          <div className='text-danger'>
            {/* {errors.ward && <div>{errors.ward}</div>} */}
          </div>
        </div>
        <div className='form-group'>
          <p>Địa chỉ</p>
          <input className='form-control' placeholder='Nhập địa chỉ' />
          <div className='text-danger'>
            {/* {errors.address && <div>{errors.address}</div>} */}
          </div>
        </div>
        <div className='form-group text-right register-btn'>
          <button
            type='button'
            className='site-button dz-xs-flex m-r5 '
            //   onClick={() => setStep(2)}
          >
            <i className='fa fa-arrow-left' aria-hidden='true'></i> Quay lại
          </button>
          <button
            type='button'
            className='site-button dz-xs-flex m-r5 btn'
            //   disabled={!province || !district || !ward || !address}
            //   onClick={onSubmitStep2}
          >
            Tiếp tục <i className='fa fa-arrow-right' aria-hidden='true'></i>
          </button>
        </div>
      </form>
    </>
  );
};

export default Address;
