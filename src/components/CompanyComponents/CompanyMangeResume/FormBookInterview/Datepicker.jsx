import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { subDays, setHours, setMinutes } from "date-fns";
import "../../../../../node_modules/react-datepicker/dist/react-datepicker.css";
const Datepicker = ({ startDate, setStartDate, setValue }) => {
  return (
    <DatePicker
      showIcon
      selected={startDate}
      onChange={(date) => {
        setValue("time", date);
        setStartDate(date);
      }}
      timeInputLabel='Time:'
      minDate={subDays(new Date(), 0)}
      dateFormat='MM/dd/yyyy h:mm aa'
      showTimeInput
    />
  );
};

export default Datepicker;
