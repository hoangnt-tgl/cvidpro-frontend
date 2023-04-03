import React from "react";

const BigRoundedBtn = ({ type, title }) => {
  return (
    <div className='form-group text-right register-btn w-100 '>
      <button
        type={type}
        className='site-button dz-xs-flex m-r5 btn w-100 btn-login'
      >
        {title}
      </button>
    </div>
  );
};

export default BigRoundedBtn;
