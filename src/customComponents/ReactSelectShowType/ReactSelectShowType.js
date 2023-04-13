import React from 'react';
import Select, { createFilter } from 'react-select';
import { selectStyle } from '../../../src/constants/common';
const ReactSelectShowType = ({
  register,
  options,
  placeholder,
  minInput,
  isMulti = false,
  onChange = () => {},
  isDisabled = false,
  value = null,
  className = '',
}) => {
  const filterOption = (candidate, input) => {
    // console.log('candidate', candidate);
    // console.log('input', input);
    // console.log(candidate.label.search(input));
    return (
      // Min input length
      input.length >= minInput &&
        candidate.label.toLowerCase().search(input.toLowerCase()) !== -1
        ? true
        : false
    );
    // return (
    //   // Min input length
    //   input.length >= minInput &&
    //   // Use Select's default filtering for string matching by creating filter
    //   createFilter({})(candidate, input)
    // );
  };

  // Only show no options when at min length or can create custom message
  // or return null if no minLength message desired
  const noOptionsMessage = (input) =>
    input.length >= minInput ? 'Không có lựa chọn phù hợp' : 'Gõ để tìm kiếm';

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
      styles={selectStyle}
      isDisabled={isDisabled}
      className={className}
    />
  );
};

export default ReactSelectShowType;
