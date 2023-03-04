import React from "react";
import { useEffect } from "react";
import { listOptions } from "../../constants/common";
import "./styles.css";
const CheckBox = ({ check, setCheck, register, setValue }) => {
  return (
    <>
      {listOptions.map((item, idx) => {
        if (idx === 0) {
          return (
            <label class={`checkbox-wrap checkbox-success mx-2`} key={idx}>
              {item.label}
              <input
                type='checkbox'
                checked={check === item.value && true}
                onClick={() => {
                  setCheck(item.value);
                  setValue("rating", item.value);
                }}
                register={register}
              />
              <span class='checkmark-custom'></span>
            </label>
          );
        }
        if (idx === 1) {
          return (
            <label class={`checkbox-wrap checkbox-primary mx-2`} key={idx}>
              {item.label}
              <input
                type='checkbox'
                checked={check === item.value && true}
                onClick={() => {
                  setCheck(item.value);
                  setValue("rating", item.value);
                }}
                register={register}
              />
              <span class='checkmark-custom'></span>
            </label>
          );
        }
        if (idx === 2) {
          return (
            <label class={`checkbox-wrap checkbox-warning mx-2`} key={idx}>
              {item.label}
              <input
                type='checkbox'
                checked={check === item.value && true}
                onClick={() => {
                  setCheck(item.value);
                  setValue("rating", item.value);
                }}
                register={register}
              />
              <span class='checkmark-custom'></span>
            </label>
          );
        }
        if (idx === 3) {
          return (
            <label class={`checkbox-wrap checkbox-danger mx-2`} key={idx}>
              {item.label}
              <input
                type='checkbox'
                checked={check === item.value && true}
                onClick={() => {
                  setCheck(item.value);
                  setValue("rating", item.value);
                }}
                register={register}
              />
              <span class='checkmark-custom'></span>
            </label>
          );
        }
      })}
    </>
  );
};

export default CheckBox;
