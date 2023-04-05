import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import './styles.css';
const index = ({ className, format, onChange, value }) => {
  return (
    <>
      {' '}
      <DatePicker
        value={value}
        onChange={onChange}
        className={className}
        format={format}
      />
    </>
  );
};

export default index;
