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
  // useEffect(() => {
  //   if (isGetOtp) {
  //     setIsOtpStillValid(true);
  //   }
  // }, [isGetOtp]);
  async function getOtpFc(email) {
    setEmail(email);
    if (isCompany) {
      try {
        if (isGetAgain) {
          setIsOtpStillValid(false);
        }
        await getOtpCompany({ email: email });
        setIsGetOtp(true);
        setIsGetAgain(true);
        setIsOtpStillValid(true);
        // new Promise((resolve) => {
        //   setTimeout(() => {
        //     resolve();
        //   }, duaration);
        // }).then(() => {
        //   setIsGetOtp(false);
        // });
      } catch (error) {
        if (error.response.data.message.toLowerCase() === 'không tìm thấy') {
          setIsMailExist(error.response.data.message);
        }
      }
    } else {
      try {
        await getOtpEmployee({ email: email });
        setIsGetOtp(true);
        new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, duaration);
        }).then(() => {
          setIsGetOtp(false);
        });
      } catch (error) {}
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
  // useEffect(() => {
  //   if (isGetOtp) {
  //     new Promise((resolve) => {
  //       setTimeout(() => {
  //         resolve();
  //       }, duarationOtp);
  //     }).then(() => {
  //       setIsOtpStillValid(false);
  //     });
  //   }
  // }, [isGetOtp]);
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
