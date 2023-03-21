import React, { useState } from "react";

const BigSizeInput = ({
  register,
  errors,
  title,
  placeholder,
  getValues,
  type,
}) => {
  const [focus, setFocus] = useState(false);
  return (
    <>
      <div
        className={
          focus || getValues()["name"]
            ? "form-group form-group-login focus"
            : "form-group form-group-login"
        }
      >
        <p>{title}</p>
        <input
          {...register}
          type={type}
          onFocus={() => setFocus(true)}
          onBlur={() => {
            setFocus(false);
          }}
          className='form-control small login-input '
          placeholder={placeholder}
        />
      </div>
      <div className='text-danger'>
        {errors?.name?.message && <div>{errors.name.message}</div>}
      </div>
    </>
  );
};

export default BigSizeInput;
