import React from 'react';
import { useState } from 'react';
import {
  getOtpCompany,
  resetPasswordCompany,
  getOtpEmployee,
  resetPasswordEmployee,
  validateOtpCompany,
  validateOtpEmployee,
} from '../services/AuthService';

const useResetPass = (isCompany) => {
  const [email, setEmail] = useState();
  const [otp, setOtp] = useState();
  async function getOtpFc(email) {
    setEmail(email);
    if (isCompany) {
      await getOtpCompany({ email: email });
    } else {
      await getOtpEmployee({ email: email });
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
  return { getOtpFc, resetPasswordFc, setOtp, validateOtpFc };
};

export default useResetPass;
