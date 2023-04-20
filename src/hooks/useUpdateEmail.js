import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMemo } from 'react';
import { toast } from 'react-hot-toast';
import {
  updateEmailEmployee,
  updatePhoneEmployee,
} from '../services/EmployeeApi';

const useUpdateEmail = (userInformation) => {
  const [openUpdateEmail, setOpenUpdateEmail] = useState(false);
  const [openModalOtpEmail, setOpenModalOtpEmail] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const schemaEmail = yup.object().shape({
    email: yup
      .string()
      .required('Vui lòng nhập email')
      .email('Email không hợp lệ'),
  });

  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: useMemo(() => {
      return { email: userInformation.email };
    }, [userInformation]),
    resolver: yupResolver(schemaEmail),
  });

  function handleOnSubmitEmail(data) {
    setOpenUpdateEmail(false);
    setOpenModalOtpEmail(true);
    setNewEmail(data.email);
  }
  async function updateEmail(data) {
    let body = { email: newEmail, id: userInformation._id, otp: data };
    try {
      await updateEmailEmployee(body);
      setOpenModalOtpEmail(false);
      toast.success('Cập nhật thành công');
    } catch (error) {
      toast.error(error.response.data.message);
      setOpenModalOtpEmail(false);
    }
  }
  useEffect(() => {
    console.log(errors);
  }, [errors]);
  useEffect(() => {
    function fetchData() {
      reset({
        email: userInformation.email,
      });
    }
    fetchData();
  }, [userInformation]);

  return [
    register,
    handleSubmit,
    handleOnSubmitEmail,
    openUpdateEmail,
    setOpenUpdateEmail,
    errors,
    updateEmail,
    openModalOtpEmail,
    setOpenModalOtpEmail,
  ];
};
export const useUpdatePhone = (userInformation) => {
  const [openUpdatePhone, setOpenUpdatePhone] = useState(false);
  const [openModalOtpPhone, setOpenModalOtpPhone] = useState(false);
  const [newPhone, setNewPhone] = useState('');
  const schemaPhone = yup.object().shape({
    phone: yup.string().required('Vui lòng nhập số điện thoại').length(10),
  });

  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: useMemo(() => {
      return { phone: userInformation.username };
    }, [userInformation]),
    resolver: yupResolver(schemaPhone),
  });

  async function handleOnSubmitPhone(data) {
    setOpenUpdatePhone(false);
    setOpenModalOtpPhone(true);
    setNewPhone(data.email);
  }
  async function updatePhone(data) {
    let body = { email: newPhone, id: '', otp: data };
    try {
      await updatePhoneEmployee(body);
      setOpenModalOtpPhone(false);
      toast.success('Cập nhật thành công');
    } catch (error) {
      toast.error(error.response.data.message);
      setOpenModalOtpPhone(false);
    }
  }
  useEffect(() => {
    console.log(errors);
  }, [errors]);
  useEffect(() => {
    async function fetchData() {
      reset({
        phone: userInformation.username,
      });
    }
    fetchData();
  }, [userInformation]);

  return [
    register,
    handleSubmit,
    handleOnSubmitPhone,
    openUpdatePhone,
    setOpenUpdatePhone,
    errors,
    updatePhone,
    openModalOtpPhone,
    setOpenModalOtpPhone,
  ];
};
export default useUpdateEmail;
