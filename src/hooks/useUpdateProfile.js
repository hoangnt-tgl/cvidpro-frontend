import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import {
  getMyResume,
  updateMyPersonalInformation,
} from '../services/EmployeeApi';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMemo } from 'react';
import { toast } from 'react-hot-toast';

const useUpdateProfile = (props) => {
  const [userInformation, setUserInformation] = useState({});
  const [openUpdate, setOpenUpdate] = useState(false);
  const schema = yup.object().shape({
    name: yup.string().required('Vui lòng nhập tên'),
    birthday: yup.string().required('Vui lòng nhập ngày sinh'),
    gender: yup.string().required('Vui lòng nhập giới tính'),
    jobTitle: yup.string().required('Vui lòng nhập chức vụ'),
    school: yup.string().required('Vui lòng nhập trường học'),
    startYear: yup.string().required('Vui lòng nhập năm bắt đầu'),
    endYear: yup.string().required('Vui lòng nhập năm kết thúc'),
    level: yup.string().required('Vui lòng nhập trình độ'),
    position: yup.string().required('Vui lòng nhập chức vụ'),
  });
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
  async function handleOnSubmit(data) {
    try {
      await updateMyPersonalInformation(data.id, data);
      toast.success('Cập nhật thành công');
    } catch (error) {
      toast.error(error.response?.data?.message || '');
    }
  }
  useEffect(() => {
    async function fetchData() {
      const response = await getMyResume(props.history);
      console.log(response);
      reset(response);
      setUserInformation(response);
    }
    fetchData();
  }, []);

  return {
    openUpdate,
    setOpenUpdate,
    userInformation,
    register,
    handleOnSubmit,
    handleSubmit,
  };
};

export default useUpdateProfile;
