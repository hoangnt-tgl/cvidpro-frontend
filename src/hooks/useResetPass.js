import React from 'react';
import { useState } from 'react';
import {
  getOtpCompany,
  resetPasswordCompany,
  getOtpEmployee,
  resetPasswordEmployee,
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
  async function resetPasswordFc(password) {
    if (isCompany) {
      await resetPasswordCompany({ email, otp, password });
    } else {
      await resetPasswordEmployee({ email, otp, password });
    }
  }
  return { getOtpFc, resetPasswordFc, setOtp };
};

export default useResetPass;
