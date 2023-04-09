import React from 'react';
import Select from 'react-select';
import { listBank, selectStyle } from '../../../../constants/common';
const Baking = () => {
  return (
    <>
      <div className=''>
        <div className='form-group '>
          <div className='select-style'>
            <Select
              options={listBank}
              placeholder='Chọn ngân hàng'
              styles={selectStyle}
            />
          </div>
        </div>
        <p class='text-muted'>
          {' '}
          Note: After clicking on the button, you will be directed to a secure
          gateway for payment. After completing the payment process, you will be
          redirected back to the website to view details of your order.{' '}
        </p>
        {/* <div className='form-group'>
          <p>
            {' '}
            <button type='button' className='btn btn-primary '>
              <i className='fas fa-mobile-alt mr-2' /> Proceed Payment
            </button>{' '}
          </p>
        </div> */}
      </div>
    </>
  );
};

export default Baking;
