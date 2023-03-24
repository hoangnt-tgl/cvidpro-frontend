import React, { useState } from "react";
import QuestionMark from "../QuestionMark.jsx/QuestionMark";

const BigSizeInput = ({
  name,
  register,
  errors,
  title,
  placeholder,
  getValues,
  type,
  description,
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
        <p
          //  onClick={() => setFocus(true)}
          className=''
        >
          {title}{" "}
        </p>
        <div className="question-icon">
          {" "}
          {description.isShow && (
            <QuestionMark
              description={description.content}
              placement='bottom'
            />
          )}
        </div>

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
        <div className='text-danger position-absolute'>
          {errors[name]?.message && <div>{errors[name].message}</div>}
        </div>
      </div>
    </>
  );
};

export default BigSizeInput;
