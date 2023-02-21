import React from "react";

const FormAssess = ({ setInput }) => {
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
              onChange={(e) => setInput(e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormAssess;
