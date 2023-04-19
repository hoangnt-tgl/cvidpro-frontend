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
//firebase
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../config/firbase.js';
const useUpdateProfile = (props) => {
  const [userInformation, setUserInformation] = useState({});
  const [openUpdate, setOpenUpdate] = useState(false);
  const schema = yup.object().shape({
    name: yup.string().required('Vui lòng nhập tên'),
    birthday: yup.string().required('Vui lòng nhập ngày sinh'),
    gender: yup.string().required('Vui lòng nhập giới tính'),
    address: yup.string().required('Vui lòng nhập địa chỉ'),
    ward: yup.string().required('Vui lòng nhập phường'),
    district: yup.string().required('Vui lòng nhập quận'),
    province: yup.string().required('Vui lòng nhập tỉnh'),
    avatar: yup.string().required('Vui lòng nhập ảnh đại diện'),
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
      return userInformation;
    }, [userInformation]),
    resolver: yupResolver(schema),
  });
  function uploadAvatar(e) {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    if (file) {
      const sotrageRef = ref(storage, `web/${file.name}`);
      const uploadTask = uploadBytesResumable(sotrageRef, file);
      uploadTask.on(
        'state_changed',
        () => {},
        (error) => console.log('err ', error),
        async () => {
          let url = await getDownloadURL(uploadTask.snapshot.ref);
          setValue('avatar', url);
        }
      );
    }
  }

  async function handleOnSubmit(data) {
    try {
      await updateMyPersonalInformation({ ...data, country: '121233' });
      toast.success('Cập nhật thành công');
    } catch (error) {
      toast.error(error.response?.data?.message || '');
    }
    console.log(data);
  }
  useEffect(() => {
    console.log(errors);
  }, [errors]);
  useEffect(() => {
    async function fetchData() {
      const response = await getMyResume(props.history);
      console.log(response);
      reset({
        name: response.name,
        birthday: response.birthday,
        gender: response.gender,
        address: response.address,
        district: response.district,
        province: response.province,
        avatar: response.avatar,
        ward: response.ward,
      });
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
    uploadAvatar,
    control,
  };
};

export default useUpdateProfile;
