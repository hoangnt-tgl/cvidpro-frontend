import React from 'react';

const VnPay = () => {
  return (
    <>
      <div id='vnpay' className='tab-pane fade pt-3'>
        <h6 className='pb-2'>Select your vnpay account type</h6>
        <div className='form-group '>
          {' '}
          <label className='radio-inline'>
            {' '}
            <input type='radio' name='optradio' defaultChecked /> Domestic{' '}
          </label>{' '}
          <label className='radio-inline'>
            {' '}
            <input type='radio' name='optradio' className='ml-5' />
            International{' '}
          </label>
        </div>
        <p>
          {' '}
          <button type='button' className='btn btn-primary '>
            <i className='fab fa-paypal mr-2' /> Log into my VnPay
          </button>{' '}
        </p>
        <p className='text-muted'>
          {' '}
          Note: After clicking on the button, you will be directed to a secure
          gateway for payment. After completing the payment process, you will be
          redirected back to the website to view details of your order.{' '}
        </p>
      </div>{' '}
    </>
  );
};

export default VnPay;
