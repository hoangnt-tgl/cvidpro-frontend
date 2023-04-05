import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import ReactSelectShowType from '../../../../customComponents/ReactSelectShowType/ReactSelectShowType';
import Select from 'react-select';
//hookform
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRef } from 'react';
import { selectStyle } from '../../../../constants/common';
import MuiDatePicker from '../../../../customComponents/MuiDatePicker/index.jsx';
import '../../../Layout/RegisterLayout/RegisterStyles.css';
import NormalInput from '../../../../customComponents/NormalInput/Index.jsx';
import { useEffect } from 'react';
//firebase
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../../../config/firbase.js';
const Index = ({
  showShortTraining,
  setShowShortTraining,
  handleAddShortTraining,
}) => {
  const [trigger, setTrigger] = useState(true);
  const checkStepRef = useRef({
    organization: false,
    content: false,
    place: false,
    duaration: false,
    startYear: false,
    endYear: false,
    degree: false,
  });
  const schema = yup.object().shape({
    organization: yup.string().required('Vui lòng nhập đơn vị tổ chức'),
    content: yup.string().required('Vui lòng nhập nội dung đào tạo'),
    place: yup.string().required('Vui lòng nhập nơi đào tạo'),
    duaration: yup.string().required('Vui lòng nhập thời gian đào tạo'),
    startYear: yup
      .date()
      .required('Vui lòng chọn năm bắt đầu')
      .typeError('Vui lòng chọn năm bắt đầu'),
    endYear: yup
      .date()
      .required('Vui lòng chọn năm kết thúc')
      .typeError('Vui lòng chọn năm kết thúc'),
    degree: yup.mixed().required('Vui lòng chọn hình chứng chỉ'),
  });
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });
  const inputField = [
    {
      register: 'organization',
      placeholder: 'Nhập đơn vị tổ chức',
      title: 'Đơn vị tổ chức',
      type: 'text',
      accept: '',
    },
    {
      register: 'content',
      placeholder: 'Nhập nội dung đào tạo',
      title: 'Nội dung đào tạo',
      type: 'text',
      accept: '',
    },
    {
      register: 'place',
      placeholder: 'Nhập nơi đào tạo',
      title: 'Nơi đào tạo',
      type: 'text',
      accept: '',
    },
    {
      register: 'duaration',
      placeholder: 'Nhập thời gian đào tạo',
      title: 'Thời gian đào tạo',
      type: 'text',
      accept: '',
    },
  ];
  const timeFiled = [
    {
      register: 'startYear',
      title: 'Thời gian cấp chứng chỉ',
    },
    {
      register: 'endYear',
      title: 'Thời hạn chứng chỉ',
    },
  ];
  function handleCheckInput(e) {
    if (e.target.dataset.testid === 'startYear') {
      if (e.target.value !== '' && !checkStepRef.current.startYear) {
        checkStepRef.current.startYear = true;
      }
      if (e.target.value === '' && checkStepRef.current.startYear) {
        checkStepRef.current.startYear = false;
      }
    }
    if (e.target.dataset.testid === 'endYear') {
      if (e.target.value !== '' && !checkStepRef.current.endYear) {
        checkStepRef.current.endYear = true;
      }
      if (e.target.value === '' && checkStepRef.current.endYear) {
        checkStepRef.current.endYear = false;
      }
    }
    if (e.target.dataset.testid === 'organization') {
      if (e.target.value !== '' && !checkStepRef.current.organization) {
        checkStepRef.current.organization = true;
      }
      if (e.target.value === '' && checkStepRef.current.organization) {
        checkStepRef.current.organization = false;
      }
    }
    if (e.target.dataset.testid === 'place') {
      if (e.target.value !== '' && !checkStepRef.current.place) {
        checkStepRef.current.place = true;
      }
      if (e.target.value === '' && checkStepRef.current.place) {
        checkStepRef.current.place = false;
      }
    }
    if (e.target.dataset.testid === 'duaration') {
      if (e.target.value !== '' && !checkStepRef.current.duaration) {
        checkStepRef.current.duaration = true;
      }
      if (e.target.value === '' && checkStepRef.current.duaration) {
        checkStepRef.current.duaration = false;
      }
    }
    if (e.target.dataset.testid === 'content') {
      if (e.target.value !== '' && !checkStepRef.current.content) {
        checkStepRef.current.content = true;
      }
      if (e.target.value === '' && checkStepRef.current.content) {
        checkStepRef.current.content = false;
      }
    }
    if (e.target.dataset.testid === 'degree') {
      if (e.target.value !== '' && !checkStepRef.current.degree) {
        checkStepRef.current.degree = true;
      }
      if (e.target.value === '' && checkStepRef.current.degree) {
        checkStepRef.current.degree = false;
      }
    }
    setTrigger(!trigger);
  }
  function uploadDegree(e) {
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
          setValue('degree', url);
          clearErrors('degree');
        }
      );

      if (!checkStepRef.current.degree) {
        checkStepRef.current.degree = true;
      }
    } else {
      if (checkStepRef.current.degree) {
        checkStepRef.current.degree = false;
      }
    }
  }
  function handleOnSubmit(data) {
    console.log(data);
    const dataShortCourse = {
      start: data.startYear,
      end: data.endYear,
      organization: data.organization,
      content: data.content,
      place: data.place,
      duaration: data.duaration,
      degree: data.degree,
    };
    handleAddShortTraining(dataShortCourse);
  }
  useEffect(() => {
    console.log(errors);
  }, [errors]);
  return (
    <>
      {' '}
      <Modal
        className='modal fade modal-bx-info editor'
        show={showShortTraining}
        onHide={setShowShortTraining}
      >
        <div className='modal-dialog my-0' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Khóa đào tạo ngắn hạn</h5>
              <button
                type='button'
                className='close'
                onClick={() => setShowShortTraining(false)}
              >
                <span>&times;</span>
              </button>
            </div>
            <form
              id='addShortTraining'
              onSubmit={handleSubmit(handleOnSubmit)}
              // action='javascript:void(0);'
            >
              <div className='modal-body'>
                <div className='row font-size-14'>
                  {inputField.map((item, idx) => {
                    return (
                      <>
                        <div className='col-lg-12 col-md-6' key={idx}>
                          <NormalInput
                            accept={item.accept}
                            isFilled={checkStepRef.current[item.register]}
                            name={item.register}
                            title={item.title}
                            placeholder={item.placeholder}
                            type={item.type}
                            register={{ ...register(item.register) }}
                            errors={errors}
                            onBlur={handleCheckInput}
                          />
                        </div>
                      </>
                    );
                  })}
                  <div className='col-lg-12 col-md-6'>
                    <div className='form-group'>
                      <p>
                        Ảnh chứng chỉ <span className='asterisk'></span>
                      </p>
                      <input
                        type='file'
                        className={
                          checkStepRef.current.degree
                            ? 'form-control filled'
                            : 'form-control'
                        }
                        accept='image/*'
                        onChange={uploadDegree}
                      />
                      <div className='text-danger'>
                        {errors?.degree?.message && (
                          <div>{errors.degree.message}</div>
                        )}
                      </div>
                    </div>
                  </div>
                  {timeFiled.map((item, idx) => {
                    return (
                      <div className='col-lg-6 col-md-6'>
                        <div className='form-group'>
                          <p>
                            {item.title} <span className='asterisk'></span>
                          </p>
                          <Controller
                            name={item.register}
                            control={control}
                            render={({ field: { onChange } }) => (
                              <MuiDatePicker
                                value={getValues(item.register) || null}
                                format={'MM-YYYY'}
                                className={
                                  checkStepRef.current[item.register]
                                    ? 'form-control filled'
                                    : 'form-control '
                                }
                                onChange={(date, validationError) => {
                                  onChange(date);
                                  let e = {
                                    target: {
                                      dataset: { testid: item.register },
                                    },
                                  };
                                  handleCheckInput(e);

                                  if (
                                    getValues('startYear') &&
                                    getValues('endYear')
                                  ) {
                                    console.log(
                                      new Date(
                                        getValues('startYear')._d
                                      ).getTime()
                                    );
                                    console.log(
                                      new Date(
                                        getValues('endYear')._d
                                      ).getTime()
                                    );
                                    if (
                                      new Date(
                                        getValues('startYear')._d
                                      ).getTime() >
                                      new Date(
                                        getValues('endYear')._d
                                      ).getTime()
                                    ) {
                                      setError('endYear', {
                                        type: 'manual',
                                        message:
                                          'Năm kết thúc phải lớn hơn năm bắt đầu',
                                      });
                                      console.log('123');
                                      return;
                                    }
                                  }
                                  clearErrors('endYear');
                                }}
                              />
                            )}
                          />
                          <div className='text-danger'>
                            {errors[item.register]?.message && (
                              <div>{errors[item.register]?.message}</div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='site-button'
                  onClick={() => setShowShortTraining(false)}
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='site-button btn'
                  form='addShortTraining'
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Index;
