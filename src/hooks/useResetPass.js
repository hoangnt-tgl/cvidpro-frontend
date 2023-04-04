import React, { useEffect } from 'react';
import { useState } from 'react';

import {
  getOtpCompany,
  resetPasswordCompany,
  getOtpEmployee,
  resetPasswordEmployee,
  validateOtpCompany,
  validateOtpEmployee,
} from '../services/AuthService';

const useResetPass = (isCompany, duaration, duarationOtp) => {
  const [email, setEmail] = useState();
  const [isGetOtp, setIsGetOtp] = useState(false);
  const [otp, setOtp] = useState();
  const [isMailExist, setIsMailExist] = useState('');
  const [isOtpStillValid, setIsOtpStillValid] = useState(false);
  const [isGetAgain, setIsGetAgain] = useState(false);

  async function getOtpFc(email) {
    setEmail(email);
    if (isCompany) {
      try {
        if (isGetAgain) {
          setIsOtpStillValid(false);
        }
        setIsGetOtp(true);
        setIsGetAgain(true);
        await getOtpCompany({ email: email });
        setIsOtpStillValid(true);
      } catch (error) {
        if (error.response.data.message.toLowerCase() === 'không tìm thấy') {
          setIsMailExist(error.response.data.message);
        }
      }
    } else {
      try {
        if (isGetAgain) {
          setIsOtpStillValid(false);
        }
        await getOtpEmployee({ email: email });
        setIsGetOtp(true);
        setIsGetAgain(true);
        setIsOtpStillValid(true);
      } catch (error) {
        if (
          error.response.data.message.toLowerCase() ===
          'không tìm thấy người dùng'
        ) {
          console.log('123');
          setIsMailExist(error.response.data.message);
        }
      }
    }
  }
  async function validateOtpFc(otp) {
    setOtp(otp);
    if (isCompany) {
      await validateOtpCompany({ email, otp });
    } else {
      await validateOtpEmployee({ email, otp });
    }
  }
  async function resetPasswordFc(password) {
    if (isCompany) {
      await resetPasswordCompany({ email, otp, password });
    } else {
      await resetPasswordEmployee({ email, otp, password });
    }
  }

  return {
    getOtpFc,
    resetPasswordFc,
    setOtp,
    validateOtpFc,
    isGetOtp,
    isMailExist,
    setIsMailExist,
    isOtpStillValid,
    setIsGetOtp,
    setIsOtpStillValid,
  };
};

export default useResetPass;
