import React from "react";
import Select from "react-select";
const ReactSelectBlue = ({
  register,
  options,
  placeholder,
  isMulti = false,
  onChange = () => {},
}) => {
  return (
    <Select
      {...register}
      isMulti={isMulti}
      closeMenuOnSelect={isMulti && false}
      onChange={onChange}
      placeholder={placeholder}
      options={options}
      styles={{
        noOptionsMessage: (baseStyles, state) => ({
          ...baseStyles,
          color: "black",
          fontWeight: "550",
        }),
      }}
    />
  );
};

export default ReactSelectBlue;
