import React from 'react';

const Index = ({
  name,
  register,
  errors,
  title,
  placeholder,
  type,
  isFilled,
  onBlur,
  accept,
  onChange,
}) => {
  return (
    <>
      <div className='form-group '>
        <p>
          {title} <span className='asterisk'></span>
        </p>
        <input
          {...register}
          type={type}
          className={isFilled ? 'filled form-control' : ' form-control'}
          placeholder={placeholder}
          data-testid={name}
          onBlur={onBlur}
        />
        <div className='text-danger'>
          {errors[name]?.message && <div>{errors[name].message}</div>}
        </div>
      </div>
    </>
  );
};

export default Index;
