import React from "react";

const FormAssess = ({ setInput, register, setValue }) => {
  return (
    <>
      {" "}
      <div class='form-row-custom'>
        <div class='name'>Đánh giá :</div>
        <div class='value'>
          <div class='input-group'>
            <textarea
              class='textarea--style-6'
              name='Đánh giá'
              placeholder='Đánh giá ứng viên'
              onChange={(e) => {
                // setInput(e.target.value);
                setValue("comment", e.target.value);
              }}
              register={register}
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormAssess;
