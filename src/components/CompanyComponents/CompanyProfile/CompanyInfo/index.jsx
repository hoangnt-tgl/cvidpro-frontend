import React from 'react';

const Index = ({companyInfo}) => {
  return (
    <>
      {' '}
      <div className='col-lg-6 col-md-12'>
        <div className='border-bottom clearfix mb-4'>
          <h5 className='font-weight-700 pull-left text-uppercase'>
            Thông tin nhà tuyển dụng
          </h5>
        </div>
        <form>
          <div className='row m-b30'>
            <div className='col-lg-12'>
              <div className='form-group'>
                <label className='border-bottom w-100 pb-1 mb-3'>
                  Tên công ty
                </label>
                <p style={{ minHeight: 38 }} className='mb-0'>
                  {companyInfo.companyName}
                </p>
              </div>
            </div>
            <div className='col-lg-12'>
              <div className='form-group'>
                <label className='border-bottom w-100 pb-1 mb-3'>Địa chỉ</label>
                <p style={{ minHeight: 38 }} className='mb-0'>
                  {companyInfo.address}
                </p>
              </div>
            </div>
            <div className='col-lg-12'>
              <div className='form-group'>
                <label className='border-bottom w-100 pb-1 mb-3'>Hotline</label>
                <p style={{ minHeight: 38 }} className='mb-0'>
                  {companyInfo.companyPhone}
                </p>
              </div>
            </div>
            <div className='col-lg-12'>
              <div className='form-group'>
                <label className='border-bottom w-100 pb-1 mb-3'>
                  Mã số thuế
                </label>
                <div className='row align-items-center pr-3'>
                  <p className='col mb-0'>{companyInfo.username}</p>
                  <button className='btn btn-primary btn-md'>
                    Đổi mã số thuế
                  </button>
                </div>
              </div>
            </div>
            <div className='col-lg-12'>
              <div className='form-group'>
                <label className='border-bottom w-100 pb-1 mb-3'>
                  Loại hình công ty
                </label>
                <p style={{ minHeight: 38 }} className='mb-0'>
                  {companyInfo.companyType}
                </p>
              </div>
            </div>
            <div className='col-lg-12'>
              <div className='form-group'>
                <label className='border-bottom w-100 pb-1 mb-3'>
                  Nghành nghề chính
                </label>
                <div className='row align-items-center pr-3'>
                  <p className='col mb-0'>{companyInfo.mainIndustry}</p>
                  <button className='btn btn-primary btn-md'>Cập nhật</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Index;
