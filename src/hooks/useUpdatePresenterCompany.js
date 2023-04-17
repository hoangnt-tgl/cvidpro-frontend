import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMemo } from 'react';
import { useEffect } from 'react';
const useUpdatePresenterCompany = (companyInfo, schema) => {
  const [userInformation, setUserInformation] = useState({});
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openModalOtp, setOpenModalOtp] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: useMemo(() => {
      return userInformation;
    }, [userInformation]),
    resolver: yupResolver(schema),
  });
  function handleOnSubmit(data) {
    console.log(data);
    setOpenUpdate(false);
    setOpenModalOtp(true);
  }
  useEffect(() => {
    async function fetchData() {
      reset(companyInfo);
      setUserInformation(companyInfo);
    }
    fetchData();
  }, []);
  return {
    register,
    handleSubmit,
    errors,
    openUpdate,
    setOpenUpdate,
    handleOnSubmit,
    openModalOtp,
    setOpenModalOtp,
  };
};

export default useUpdatePresenterCompany;
