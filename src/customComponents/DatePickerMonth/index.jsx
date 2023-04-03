import React from 'react';
import DatePicker from 'react-datepicker';
import '../../../node_modules/react-datepicker/dist/react-datepicker.css';
const Datepicker = ({
  getValues,
  handleOnChange,
  register,
  name,
  placeholder = 'mm/yyyy',
  dateFormat = 'MM/yyyy',
  showMonthYearPicker = true,
}) => {
  return (
    <DatePicker
      {...register}
      showIcon
      selected={getValues()[name]}
      onChange={(date) => {
        handleOnChange(date);
      }}
      placeholderText={placeholder}
      //   timeInputLabel='Month:'
      dateFormat={dateFormat}
      showMonthYearPicker={showMonthYearPicker}
    />
  );
};

export default Datepicker;
