import React from 'react';
import MuiDatePicker from '../../../../customComponents/MuiDatePicker/index.jsx';
const VisaCard = () => {
  return (
    <div className='visacard-container font-size-14'>
      <form>
        <div className='row'>
          {' '}
          <div className='col-sm-12'>
            <div className='form-group'>
              <input placeholder='Số thẻ' className='form-control' />
              {/* <i class='fa fa-credit-card-alt' aria-hidden='true'></i> */}
              <div className='text-danger'>
                {/* {errors?.mainIndustry?.message && (
              <div>{errors.mainIndustry.message}</div>
            )} */}
              </div>
            </div>
          </div>
          <div className='col-sm-12'>
            <div className='form-group'>
              <input placeholder='Họ và tên chủ thẻ' className='form-control' />
              <div className='text-danger'>
                {/* {errors?.mainIndustry?.message && (
              <div>{errors.mainIndustry.message}</div>
            )} */}
              </div>
            </div>
          </div>
          <div className='col-sm-6'>
            <div className='form-group'>
              <MuiDatePicker
                className='form-control'
                format={'MM-YYYY'}
                value={null}
              />
              <div className='text-danger'>
                {/* {errors?.mainIndustry?.message && (
              <div>{errors.mainIndustry.message}</div>
            )} */}
              </div>
            </div>
          </div>
          <div className='col-sm-6'>
            <div className='form-group'>
              <input placeholder='CVV' className='form-control' />
              {/* <i class='fa fa-credit-card-alt' aria-hidden='true'></i> */}
              <div className='text-danger'>
                {/* {errors?.mainIndustry?.message && (
              <div>{errors.mainIndustry.message}</div>
            )} */}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default VisaCard;
