import React from "react";
import Select, { createFilter } from "react-select";

const ReactSelectShowType = ({
  register,
  options,
  placeholder,
  minInput,
  isMulti = false,
  onChange = () => {},
  isDisabled = false,
  value = null,
}) => {
  const filterOption = (candidate, input) => {
    return (
      // Min input length
      input.length >= minInput &&
      // Use Select's default filtering for string matching by creating filter
      createFilter({ matchFrom: "start" })(candidate, input)
    );
  };

  // Only show no options when at min length or can create custom message
  // or return null if no minLength message desired
  const noOptionsMessage = (input) =>
    input.length >= minInput ? "Không có lựa chọn phù hợp" : "Gõ để tìm kiếm";

  return (
    <Select
      {...register}
      value={value}
      isMulti={isMulti}
      closeMenuOnSelect={!isMulti}
      onChange={onChange}
      noOptionsMessage={noOptionsMessage}
      filterOption={filterOption}
      placeholder={placeholder}
      options={options}
      styles={{
        noOptionsMessage: (baseStyles, state) => ({
          ...baseStyles,
          color: "black",
          fontWeight: "550",
        }),
        singleValue: (baseStyles, state) => ({
          ...baseStyles,
          color: "black",
          fontWeight: "550",
        }),
        optionsSelect: (baseStyles, state) => ({
          ...baseStyles,
          color: "black",
          fontWeight: "550",
        }),
      }}
      isDisabled={isDisabled}
    />
  );
};

export default ReactSelectShowType;
