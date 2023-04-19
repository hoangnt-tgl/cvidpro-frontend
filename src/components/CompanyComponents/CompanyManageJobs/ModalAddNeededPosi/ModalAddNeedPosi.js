import React, { useMemo } from 'react';
import { Modal, Card, Accordion, Form, Nav } from 'react-bootstrap';
import Select from 'react-select';
import ReactQuill from 'react-quill';
import icon from '../../../../images/logo/icon2.png';
import ModalMoreOption from '../ModalMoreOption/ModalMoreOption';
import { useState, useEffect } from 'react';
//hook form
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ReactSelectShowType from '../../../../customComponents/ReactSelectShowType/ReactSelectShowType';
import { selectStyle } from '../../../../constants/common';
import DropDownSelect from '../../../../customComponents/DropDownSelect/DropDownSelect';
import { useRef } from 'react';
import './styles.css';
import { getLanguageDes } from '../../../../services/GetListService';
import ModalInfoLanguage from '../ModalInfoLanguage/ModalInfoLanguage';
const ModalAddNeedPosi = ({
  showAddJob,
  setShowAddJob,
  setNewJob,
  newJob,
  jobTitleOption,
  positionOptions,
  levelOptions,
  majorOptions,
  languagesOptions,
  industryOptions,
  provinceOptions,
  environmentOption,
  questionOptions,
  handleAddJob,
  handleUpdateJob,
  newQuestion,
  setNewQuestion,
  childQuestion,
  setChildQuestion,
  handleAddQuestion,
  deleteAddOnQuestion,
  addOnQuestionOptions,
  setAddOnQuestionOptions,
  isAddNew,
  preloadValue,
}) => {
  const checkStepRef = useRef({
    position: false,
    level: false,
    industry: false,
    major: false,
    environment: false,
    experience: false,
    title: false,
    quantity: false,
    salaryMin: false,
    salaryMax: false,
    description: false,
    location: false,
    language: false,
    languageLevel: false,
  });
  const formRef = useRef();
  const [step, setStep] = useState(1);
  const [preAddOnQuestion, setPreAddOnQuestion] = useState([]);
  const [isShowModal, setIsShowModal] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [amountLanguage, setAmountLanguage] = useState([]);
  const [requiredLanguage, setRequiredLanguage] = useState([]);
  const [openModalLanguagueInfo, setOpenModalLanguagueInfo] = useState(false);
  const schema = yup
    .object({
      position: yup.mixed().required('Vui lòng nhập '),
      level: yup.array().required('Vui lòng nhập ').typeError('Vui lòng nhập '),
      industry: yup.mixed().required('Vui lòng nhập '),
      major: yup.array().required('Vui lòng nhập ').typeError('Vui lòng nhập '),
      environment: yup.mixed().required('Vui lòng nhập '),
      experience: yup.string().required('Vui lòng nhập '),
      title: yup.mixed().required('Vui lòng nhập '),
      quantity: yup
        .number()
        .min(1, 'Vui lòng nhập số lớn hơn 1')
        .required('Vui lòng nhập ')
        .typeError('Vui lòng nhập'),
      salaryMin: yup
        .number()
        .min(1, 'Vui lòng nhập số lớn hơn 1')
        .required('Vui lòng nhập ')
        .typeError('Vui lòng nhập'),
      salaryMax: yup
        .number()
        .min(1, 'Vui lòng nhập số lớn hơn 1')
        .required('Vui lòng nhập ')
        .typeError('Vui lòng nhập'),
      description: yup.string().required('Vui lòng nhập '),
      location: yup.mixed().required('Vui lòng nhập '),
      question0: yup.string(),
      question1: yup.string(),
      question2: yup.string(),
      question3: yup.string(),
      question4: yup.string(),
      question5: yup.string(),
      question6: yup.string(),
      question7: yup.string(),
      question8: yup.string(),
      question9: yup.string(),
      question10: yup.string(),
      question11: yup.string(),
      question12: yup.string(),
      question13: yup.string(),
      question14: yup.string(),
    })
    .required();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    clearErrors,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: useMemo(() => {
      if (isAddNew) return;
      return preloadValue;
    }, [preloadValue]),
  });
  function handleOnSubmit(data) {
    console.log(data);
    const objJob = {
      title: data.title.value,
      position: data.position.value,
      level: data.level.map((item) => item.value),
      major: data.major.map((item) => item.value),
      language: data.language?.map((item) => item.value),
      industry: data.industry.value,
      location: data.location.value,
      workingEnvironment: data.environment.value,
      experience: data.experience.toString(),
      quantity: data.quantity.toString(),
      minSalary: data.salaryMin.toString(),
      maxSalary: data.salaryMax.toString(),
      description: data.description,
      questions: [
        Number(data.question0),
        Number(data.question1),
        Number(data.question2),
        Number(data.question3),
        Number(data.question4),
        Number(data.question5),
        Number(data.question6),
        Number(data.question7),
        Number(data.question8),
        Number(data.question9),
        Number(data.question10),
        Number(data.question11),
        Number(data.question12),
        Number(data.question13),
        Number(data.question14),
      ],
      extendQuestions: addOnQuestionOptions,
    };
    console.log(objJob);
    if (isAddNew) {
      handleAddJob(objJob);
      setStep(1);
      reset({
        position: [],
        level: [],
        industry: [],
        location: [],
        environment: [],
        major: [],
        experience: '',
        salaryMin: '',
        salaryMax: '',
        description: '',
        quantity: '',
        title: [],
        question0: '',
        question1: '',
        question2: '',
        question3: '',
        question4: '',
        question5: '',
        question6: '',
        question7: '',
        question8: '',
        question9: '',
        question10: '',
        question11: '',
        question12: '',
        question13: '',
        question14: '',
      });
    } else {
      // console.log('123');
      const objJob = {
        title: data.title.value,
        position: data.position.value,
        level: data.level.map((item) => item.value),
        major: data.major.map((item) => item.value),
        language: data.language?.map((item) => item.value),
        industry: data.industry.value,
        location: data.location.value,
        workingEnvironment: data.environment.value,
        experience: data.experience.toString(),
        quantity: data.quantity.toString(),
        minSalary: data.salaryMin.toString(),
        maxSalary: data.salaryMax.toString(),
        description: data.description,
        questions: [
          Number(data.question0),
          Number(data.question1),
          Number(data.question2),
          Number(data.question3),
          Number(data.question4),
          Number(data.question5),
          Number(data.question6),
          Number(data.question7),
          Number(data.question8),
          Number(data.question9),
          Number(data.question10),
          Number(data.question11),
          Number(data.question12),
          Number(data.question13),
          Number(data.question14),
        ],
        extendQuestions: preAddOnQuestion,
      };
      handleUpdateJob(preloadValue.id, objJob);
    }
    checkStepRef.current = {
      position: false,
      level: false,
      industry: false,
      major: false,
      environment: false,
      experience: false,
      title: false,
      quantity: false,
      salaryMin: false,
      salaryMax: false,
      description: false,
      location: false,
    };
  }
  const handleAddPreQuestion = () => {
    let question = newQuestion;
    question.detail.push(childQuestion);
    setPreAddOnQuestion([...preAddOnQuestion, question]);
    setChildQuestion('');
    setNewQuestion({
      name: '',
      detail: [],
      point: '',
    });
  };
  const deletePreAddOnQuestion = (index) => {
    let question = preAddOnQuestion;
    question.splice(index, 1);
    let newQuestion = new Array(...question);
    setPreAddOnQuestion(newQuestion);
  };
  useEffect(() => {
    if (languagesOptions.length > 0) {
      setAmountLanguage([[languagesOptions, []]]);
    }
  }, [languagesOptions]);
  useEffect(() => {
    // console.log(preloadValue);
    if (isAddNew) return;
    reset(preloadValue);
  }, [preloadValue]);
  useEffect(() => {
    if (!isAddNew && preloadValue?.addOnQuestionOptions?.length > 0) {
      setPreAddOnQuestion(preloadValue.addOnQuestionOptions);
    }
  }, [preloadValue]);

  function handleCheckInput(e) {
    if (e.target.dataset.testid === 'salaryMin') {
      if (e.target.value !== '' && !checkStepRef.current.salaryMin) {
        checkStepRef.current.salaryMin = true;
      }
      if (e.target.value === '' && checkStepRef.current.salaryMin) {
        checkStepRef.current.salaryMin = false;
      }
    }
    if (e.target.dataset.testid === 'salaryMax') {
      if (e.target.value !== '' && !checkStepRef.current.salaryMax) {
        checkStepRef.current.salaryMax = true;
      }
      if (e.target.value === '' && checkStepRef.current.salaryMax) {
        checkStepRef.current.salaryMax = false;
      }
    }
    if (e.target.dataset.testid === 'quantity') {
      if (e.target.value !== '' && !checkStepRef.current.quantity) {
        checkStepRef.current.quantity = true;
      }
      if (e.target.value === '' && checkStepRef.current.quantity) {
        checkStepRef.current.quantity = false;
      }
    }
    if (e.target.dataset.testid === 'experience') {
      if (e.target.value !== '' && !checkStepRef.current.experience) {
        checkStepRef.current.experience = true;
      }
      if (e.target.value === '' && checkStepRef.current.experience) {
        checkStepRef.current.experience = false;
      }
    }
    setTrigger(!trigger);
  }

  return (
    <>
      {' '}
      <Modal
        show={showAddJob}
        onHide={() => setShowAddJob(false)}
        className='modal fade modal-bx-info'
      >
        <div className='modal-dialog my-0 w-100' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <div className='logo-img'>{/* <img alt='' src={icon} /> */}</div>
              <h5 className='modal-title text-center'>Tạo vị trí tuyển dụng</h5>
              <button
                type='button'
                className='close'
                onClick={() => setShowAddJob(false)}
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <form onSubmit={handleSubmit(handleOnSubmit)}>
              <div
                className='modal-body font-size-14 lessbold'
                style={{ maxHeight: '70vh', overflow: 'auto' }}
                ref={formRef}
              >
                <div className={step === 1 ? 'd-block appear' : 'd-none'}>
                  {' '}
                  <h5>Yêu cầu </h5>
                  <div className='form-group'>
                    <p>
                      Chức danh công việc<span className='asterisk'></span>
                    </p>
                    <div className='select-style'>
                      {' '}
                      <Controller
                        name='title'
                        control={control}
                        render={({ field }) => (
                          <ReactSelectShowType
                            {...field}
                            placeholder='Chọn chức danh công việc'
                            options={jobTitleOption}
                            minInput={1}
                            className={
                              checkStepRef.current.title ? 'filled' : ''
                            }
                            onChange={(value) => {
                              console.log(value);
                              setValue('title', value);
                              setNewJob({ ...newJob, title: value.label });
                              if (checkStepRef.current.title === false) {
                                checkStepRef.current.title = true;
                              }
                            }}
                          />
                        )}
                      />
                    </div>
                    <div className='text-danger'>
                      {errors?.title?.message && (
                        <p>
                          <>{errors?.title?.message}</>
                        </p>
                      )}
                    </div>
                  </div>
                  <div className='form-group'>
                    <p>
                      Chức vụ<span className='asterisk'></span>
                    </p>
                    <div className='select-style'>
                      {' '}
                      <Controller
                        name='position'
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            styles={selectStyle}
                            placeholder='Chọn chức vụ'
                            options={positionOptions}
                            className={
                              checkStepRef.current.position ? 'filled' : ''
                            }
                            onChange={(value) => {
                              setValue('position', value);
                              setNewJob({ ...newJob, position: value.label });
                              if (checkStepRef.current.position === false) {
                                checkStepRef.current.position = true;
                              }
                            }}
                          />
                        )}
                      />
                    </div>
                    <div className='text-danger'>
                      {' '}
                      {errors?.position?.message && (
                        <p>
                          <>{errors?.position?.message}</>
                        </p>
                      )}
                    </div>
                  </div>
                  <div className='form-group'>
                    <p>
                      Cấp bậc<span className='asterisk'></span>
                    </p>{' '}
                    <div className='select-style'>
                      <div
                        className={checkStepRef.current.level ? 'filled' : ''}
                      >
                        {' '}
                        <DropDownSelect
                          clearErrors={clearErrors}
                          setValueForm={setValue}
                          setChildStep1={() => {}}
                          checkStepRef={checkStepRef}
                          placeholder='Chọn cấp bậc'
                          options={levelOptions}
                          register='level'
                          preValue={preloadValue?.level}
                        />
                      </div>
                    </div>
                    <div className='text-danger'>
                      {' '}
                      {errors?.level?.message && (
                        <p>
                          <>{errors?.level?.message}</>
                        </p>
                      )}
                    </div>
                  </div>
                  <div className='form-group'>
                    <p>
                      Chuyên nghành ứng viên<span className='asterisk'></span>
                    </p>
                    <div className='select-style'>
                      <div
                        className={checkStepRef.current.major ? 'filled' : ''}
                      >
                        {' '}
                        <DropDownSelect
                          clearErrors={clearErrors}
                          setValueForm={setValue}
                          setChildStep1={() => {}}
                          checkStepRef={checkStepRef}
                          placeholder='Chọn chuyên ngành ứng viên'
                          options={majorOptions}
                          register='major'
                          preValue={preloadValue?.major}
                        />
                      </div>
                    </div>
                    <div className='text-danger'>
                      {' '}
                      {errors?.major?.message && (
                        <p>
                          <>{errors?.major?.message}</>
                        </p>
                      )}
                    </div>
                  </div>
                  <div className='form-group'>
                    <p>
                      Lĩnh vực kinh doanh<span className='asterisk'></span>
                    </p>
                    <div className='select-style'>
                      {' '}
                      <Controller
                        name='industry'
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            styles={selectStyle}
                            placeholder='Chọn lĩnh vực kinh doanh'
                            options={industryOptions}
                            className={
                              checkStepRef.current.industry ? 'filled' : ''
                            }
                            onChange={(value) => {
                              setValue('industry', value);
                              setNewJob({ ...newJob, industry: value.label });
                              if (checkStepRef.current.industry === false) {
                                checkStepRef.current.industry = true;
                              }
                            }}
                          />
                        )}
                      />
                    </div>
                    <div className='text-danger'>
                      {errors?.industry?.message && (
                        <p>
                          <>{errors?.industry?.message}</>
                        </p>
                      )}
                    </div>
                  </div>
                  <div className='form-group'>
                    <p>
                      Nơi làm việc<span className='asterisk'></span>
                    </p>
                    <div className='select-style'>
                      <Controller
                        name='location'
                        control={control}
                        render={({ field }) => (
                          <ReactSelectShowType
                            {...field}
                            placeholder='Chọn nơi làm việc'
                            options={provinceOptions}
                            minInput={1}
                            className={
                              checkStepRef.current.location ? 'filled' : ''
                            }
                            onChange={(value) => {
                              setValue('location', value);
                              setNewJob({ ...newJob, location: value.label });
                              if (checkStepRef.current.location === false) {
                                checkStepRef.current.location = true;
                              }
                            }}
                          />
                        )}
                      />
                    </div>
                    <div className='text-danger'>
                      {' '}
                      {errors?.location?.message && (
                        <p>
                          <>{errors?.location?.message}</>
                        </p>
                      )}
                    </div>
                  </div>
                  <div className='form-group'>
                    <p>
                      Môi trường làm việc<span className='asterisk'></span>
                    </p>
                    <div className='select-style'>
                      {' '}
                      <Controller
                        name='environment'
                        control={control}
                        onChange={(e) => {
                          setNewJob({ ...newJob, environment: e.label });
                          if (!checkStepRef.current.environment) {
                            checkStepRef.current.environment = true;
                          }
                        }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            styles={selectStyle}
                            placeholder='Chọn môi trường làm việc'
                            options={environmentOption}
                            className={
                              checkStepRef.current.environment ? 'filled' : ''
                            }
                            onChange={(value) => {
                              setValue('environment', value);
                              setNewJob({
                                ...newJob,
                                environment: value.label,
                              });
                              if (checkStepRef.current.environment === false) {
                                checkStepRef.current.environment = true;
                              }
                            }}
                          />
                        )}
                      />
                    </div>
                    <div className='text-danger'>
                      {errors?.environment?.message && (
                        <p>
                          <>{errors?.position?.message}</>
                        </p>
                      )}
                    </div>
                  </div>
                  <div className='form-group'>
                    <p>
                      Yêu cầu kinh nghiệm<span className='asterisk'></span>
                    </p>
                    <input
                      data-testid='experience'
                      name='experience'
                      onChange={(e) => {
                        console.log('123');
                        setNewJob({
                          ...newJob,
                          experience: e.target.value,
                        });
                      }}
                      {...register('experience')}
                      type='text'
                      className={
                        checkStepRef.current.experience
                          ? 'form-control filled'
                          : 'form-control'
                      }
                      placeholder='Nhập yêu cầu kinh nghiệm'
                      onBlur={(e) => {
                        handleCheckInput(e);
                      }}
                    />
                    <div className='text-danger'>
                      {' '}
                      {errors?.experience?.message && (
                        <p>
                          <>{errors?.experience?.message}</>
                        </p>
                      )}
                    </div>
                  </div>
                  <div className='form-group'>
                    <p>
                      Số lượng<span className='asterisk'></span>
                    </p>
                    <input
                      data-testid='quantity'
                      name='quantity'
                      onChange={(e) => {
                        setNewJob({
                          ...newJob,
                          quantity: e.target.value,
                        });
                      }}
                      {...register('quantity')}
                      type='number'
                      className={
                        checkStepRef.current.quantity
                          ? 'form-control filled'
                          : 'form-control'
                      }
                      placeholder='Nhập số lượng'
                      value={newJob.quantity}
                      onBlur={(e) => {
                        handleCheckInput(e);
                      }}
                    />
                    <div className='text-danger'>
                      {' '}
                      {errors?.quantity?.message && (
                        <p>
                          <>{errors?.quantity?.message}</>
                        </p>
                      )}
                    </div>
                  </div>
                  <div className='form-group'>
                    <p>
                      Mức lương tối thiểu<span className='asterisk'></span>
                    </p>
                    <input
                      data-testid='salaryMin'
                      name='salaryMin'
                      onChange={(e) => {
                        setNewJob({
                          ...newJob,
                          salaryMin: e.target.value,
                        });
                      }}
                      {...register('salaryMin')}
                      type='number'
                      className={
                        checkStepRef.current.salaryMin
                          ? 'form-control filled'
                          : 'form-control'
                      }
                      placeholder='Nhập mức lương tối thiểu'
                      value={newJob.salaryMin}
                      onBlur={(e) => {
                        handleCheckInput(e);
                      }}
                    />
                    <div className='text-danger'>
                      {' '}
                      {errors?.salaryMin?.message && (
                        <p>
                          <>{errors?.salaryMin?.message}</>
                        </p>
                      )}
                    </div>
                  </div>
                  <div className='form-group'>
                    <p>
                      Mức lương tối đa<span className='asterisk'></span>
                    </p>
                    <input
                      data-testid='salaryMax'
                      name='salaryMax'
                      onChange={(e) => {
                        setNewJob({
                          ...newJob,
                          salaryMax: e.target.value,
                        });
                      }}
                      {...register('salaryMax')}
                      type='number'
                      className={
                        checkStepRef.current.salaryMax
                          ? 'form-control filled'
                          : 'form-control'
                      }
                      placeholder='Nhập mức lương tối đa'
                      value={newJob.salaryMax}
                      onBlur={(e) => {
                        handleCheckInput(e);
                      }}
                    />
                    <div className='text-danger'>
                      {' '}
                      {errors?.salaryMax?.message && (
                        <p>
                          <>{errors?.salaryMax?.message}</>
                        </p>
                      )}
                    </div>
                    {errors?.salaryMax?.message && (
                      <p>
                        <>{errors?.salaryMax?.message}</>
                      </p>
                    )}
                  </div>
                  <div className='form-group'>
                    <p>
                      Mô tả công việc<span className='asterisk'></span>
                    </p>
                    <ReactQuill
                      name='description'
                      {...register('description')}
                      theme='snow'
                      defaultValue={
                        preloadValue?.description && preloadValue.description
                      }
                      // value={newJob.description}
                      onChange={(e) => {
                        // console.log(e);
                        setValue('description', e);
                        setNewJob({ ...newJob, description: e });
                      }}
                    />
                    <div className='text-danger'>
                      {' '}
                      {errors?.description?.message && (
                        <p>
                          <>{errors?.description?.message}</>
                        </p>
                      )}
                    </div>
                  </div>
                  <div className='form-group'>
                    <h5>Kỹ năng</h5>
                    {amountLanguage.map((item, index) => {
                      return (
                        <div key={index}>
                          {' '}
                          <div className='form-group'>
                            <p className='d-flex justify-content-between'>
                              Ngoại ngữ {index + 1}
                              {index === 0 ? (
                                <span
                                  className='btn-add expired success'
                                  onClick={() => {
                                    setAmountLanguage((prev) => [
                                      ...prev,
                                      [languagesOptions, 0],
                                    ]);
                                  }}
                                >
                                  Thêm ngoại ngữ
                                </span>
                              ) : (
                                <div>
                                  <span
                                    className='btn-add mx-1 expired success'
                                    onClick={() => {
                                      setAmountLanguage((prev) => [
                                        ...prev,
                                        [languagesOptions, 0],
                                      ]);
                                    }}
                                  >
                                    Thêm ngoại ngữ
                                  </span>
                                  <span
                                    className='btn-add mx-1 text-danger'
                                    onClick={() => {
                                      console.log(index);
                                      let arr = [...amountLanguage];
                                      let arrRequired = [...requiredLanguage];
                                      arr.splice(index, 1);
                                      arrRequired.splice(index, 1);
                                      setAmountLanguage(arr);
                                      setRequiredLanguage(arrRequired);
                                    }}
                                  >
                                    Xóa ngoại ngữ
                                  </span>
                                </div>
                              )}
                            </p>
                            <div className='select-style'>
                              <Select
                                styles={selectStyle}
                                placeholder='Chọn ngoại ngữ ứng viên'
                                options={item[0]}
                                className={
                                  requiredLanguage[index]?.length > 0
                                    ? 'filled'
                                    : ''
                                }
                                onChange={async (value) => {
                                  let languageDes = await getLanguageDes(
                                    value.value
                                  );
                                  setRequiredLanguage((prev) => [
                                    ...prev,
                                    [value.label],
                                  ]);
                                  console.log(languageDes);
                                  let arr = [...amountLanguage];
                                  arr[index][1] = languageDes.levels.map(
                                    (item) => {
                                      return {
                                        value: item.description,
                                        label: item.name,
                                      };
                                    }
                                  );
                                  setAmountLanguage(arr);
                                }}
                              />
                            </div>
                            <div className='text-danger'>
                              {' '}
                              {errors?.language?.message && (
                                <p>
                                  <>{errors?.language?.message}</>
                                </p>
                              )}
                            </div>
                          </div>
                          <div className='form-group'>
                            <div className='d-flex justify-content-between mb-2'>
                              <p>
                                Trình độ{' '}
                                <span>
                                  {' '}
                                  {requiredLanguage[index]?.length > 0
                                    ? `${requiredLanguage[index][0]}`
                                    : 'ngoại ngữ'}
                                </span>
                              </p>
                              <span
                                className='btn-add'
                                onClick={() => {
                                  setOpenModalLanguagueInfo(true);
                                }}
                              >
                                xem chi tiết trình độ
                              </span>
                            </div>

                            <div className='select-style'>
                              <Select
                                styles={selectStyle}
                                placeholder='Chọn trình độ ngoại ngữ'
                                options={item[1]}
                                className={
                                  requiredLanguage[index]?.length > 1
                                    ? 'filled'
                                    : ''
                                }
                                onChange={(value) => {
                                  setRequiredLanguage((prev) => {
                                    let arr = [...prev];
                                    arr[index][1] = value;
                                    return arr;
                                  });
                                }}
                              />
                            </div>
                            <div>
                              {' '}
                              {requiredLanguage[index]?.length > 0 && (
                                <p>{requiredLanguage[index][1]?.value}</p>
                              )}
                            </div>
                            <div className='text-danger'>
                              {' '}
                              {errors?.language?.message && (
                                <p>
                                  <>{errors?.language?.message}</>
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <button
                      type='button'
                      className='btn btn-primary mt-2'
                      // onClick={() => setIsShowModal(true)}
                    >
                      Thêm kỹ năng
                    </button>
                  </div>
                </div>

                <div className={step === 2 ? 'd-block appear' : 'd-none'}>
                  {' '}
                  <h5>Tiêu chí</h5>
                  <div className='form-group'>
                    <Accordion>
                      <p>Tiêu chí đánh giá</p>
                      <Card>
                        <Card.Header className='d-flex w-100 p-1'>
                          <Nav.Item
                            className='mr-auto h5 pl-3 pt-2'
                            as={Nav.Item}
                          >
                            Tiêu chí đánh giá đề xuất
                          </Nav.Item>
                          <Nav.Item
                            className='align-self-center'
                            style={{ width: '70px' }}
                          >
                            Điểm
                          </Nav.Item>
                        </Card.Header>
                      </Card>
                      {questionOptions?.map((question, index) => (
                        <Card key={index}>
                          <Card.Header className='d-flex align-items-center w-100 item-score'>
                            <Accordion.Toggle
                              as={'div'}
                              eventKey={index + 1}
                              className='mr-auto px-2 score-info'
                            >
                              {index + 1 + '. ' + question.name}{' '}
                              <i className='fa fa-question-circle mx-1'></i>
                              {/* trash */}
                              {index >= 15 && (
                                <i
                                  className='fa fa-trash mx-1 text-red'
                                  onClick={() => deleteAddOnQuestion(index)}
                                ></i>
                              )}
                            </Accordion.Toggle>
                            <Form.Control
                              name={`question${index}`}
                              {...register(`question${index}`)}
                              className='align-self-center mr-0'
                              placeholder='0-10'
                              value={newJob.question[index]}
                              style={{ width: '70px', textAlign: 'center' }}
                              onChange={(e) => {
                                if (isNaN(e.target.value)) e.target.value = 0;
                                if (e.target.value > 10) e.target.value = 10;
                                let question = newJob.question;
                                question[index] = e.target.value;
                                // console.log(question);
                                // console.log(questionOptions);
                                let regiserIndex = `question${index}`;
                                console.log(regiserIndex);
                                setValue(`${regiserIndex}`, e.target.value);
                                setNewJob({
                                  ...newJob,
                                  question: question,
                                });
                              }}
                              type='number'
                              min='0'
                              max='10'
                            ></Form.Control>
                          </Card.Header>
                          <Accordion.Collapse eventKey={index + 1}>
                            <Card.Body className='border-top'>
                              {question.detail?.map((item, index2) => {
                                return (
                                  <>
                                    <Nav.Item>{item}</Nav.Item>
                                  </>
                                );
                              })}
                            </Card.Body>
                          </Accordion.Collapse>
                          <div className='text-danger'>
                            {' '}
                            {errors[`question${index}`]?.message && (
                              <p>
                                <>{errors[`question${index}`]?.message}</>
                              </p>
                            )}
                          </div>
                        </Card>
                      ))}
                      {isAddNew ? (
                        <>
                          {' '}
                          {addOnQuestionOptions?.map((question, index) => (
                            <Card key={index}>
                              <Card.Header className='d-flex align-items-center w-100 item-score'>
                                <Accordion.Toggle
                                  as={'div'}
                                  eventKey={index + 1}
                                  className='mr-auto px-2 score-info'
                                >
                                  {index + 16 + '. ' + question.name}{' '}
                                  <i className='fa fa-question-circle mx-1'></i>
                                  {/* trash */}
                                  <i
                                    className='fa fa-trash ml-2 text-red'
                                    onClick={() => deleteAddOnQuestion(index)}
                                  ></i>
                                </Accordion.Toggle>
                                <Form.Control
                                  className='align-self-center mr-0'
                                  value={question.point}
                                  style={{
                                    width: '70px',
                                    textAlign: 'center',
                                  }}
                                  onChange={(e) => {
                                    if (isNaN(e.target.value))
                                      e.target.value = 0;
                                    if (e.target.value > 10)
                                      e.target.value = 10;
                                    let arrCopy = new Array(
                                      ...addOnQuestionOptions
                                    );
                                    arrCopy[index].point = e.target.value;
                                    setAddOnQuestionOptions(arrCopy);
                                  }}
                                  type='number'
                                  min='0'
                                  max='10'
                                ></Form.Control>
                              </Card.Header>
                              <Accordion.Collapse eventKey={index + 1}>
                                <Card.Body className='border-top'>
                                  {question.detail?.map((item, index2) => {
                                    return (
                                      <>
                                        <Nav.Item>{item}</Nav.Item>
                                      </>
                                    );
                                  })}
                                </Card.Body>
                              </Accordion.Collapse>
                            </Card>
                          ))}
                        </>
                      ) : (
                        <>
                          {' '}
                          {preAddOnQuestion?.map((question, index) => (
                            <Card key={index}>
                              <Card.Header className='d-flex align-items-center w-100 item-score'>
                                <Accordion.Toggle
                                  as={'div'}
                                  eventKey={index + 1}
                                  className='mr-auto px-2 score-info'
                                >
                                  {index + 16 + '. ' + question.name}{' '}
                                  <i className='fa fa-question-circle mx-1'></i>
                                  {/* trash */}
                                  <i
                                    className='fa fa-trash ml-2 text-red'
                                    onClick={() =>
                                      deletePreAddOnQuestion(index)
                                    }
                                  ></i>
                                </Accordion.Toggle>
                                <Form.Control
                                  className='align-self-center mr-0'
                                  value={question.point}
                                  style={{
                                    width: '70px',
                                    textAlign: 'center',
                                  }}
                                  onChange={(e) => {
                                    if (isNaN(e.target.value))
                                      e.target.value = 0;
                                    if (e.target.value > 10)
                                      e.target.value = 10;
                                    let arrCopy = new Array(
                                      ...preAddOnQuestion
                                    );
                                    arrCopy[index].point = e.target.value;
                                    setPreAddOnQuestion(arrCopy);
                                  }}
                                  type='number'
                                  min='0'
                                  max='10'
                                ></Form.Control>
                              </Card.Header>
                              <Accordion.Collapse eventKey={index + 1}>
                                <Card.Body className='border-top'>
                                  {question.detail?.map((item, index2) => {
                                    return (
                                      <>
                                        <Nav.Item>{item}</Nav.Item>
                                      </>
                                    );
                                  })}
                                </Card.Body>
                              </Accordion.Collapse>
                            </Card>
                          ))}
                        </>
                      )}
                    </Accordion>
                    <button
                      type='button'
                      className='btn btn-primary mt-2'
                      onClick={() => setIsShowModal(true)}
                    >
                      Thêm tiêu chí
                    </button>
                  </div>
                </div>
              </div>
              <div className='modal-footer'>
                {step === 2 && (
                  <button
                    type='button'
                    className='btn btn-secondary'
                    onClick={(e) => {
                      e.preventDefault();
                      setStep(1);
                      formRef.current.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: 'instant',
                      });
                    }}
                  >
                    Trở lại
                  </button>
                )}
                {step === 1 ? (
                  <button
                    type='button'
                    className='btn btn-primary'
                    // disabled={
                    //   getValues('position') &&
                    //   getValues('level') &&
                    //   getValues('major') &&
                    //   getValues('industry') &&
                    //   getValues('environment') &&
                    //   getValues('experience') &&
                    //   getValues('title') &&
                    //   getValues('quantity') &&
                    //   getValues('salaryMin') &&
                    //   getValues('description') &&
                    //   getValues('salaryMax') &&
                    //   getValues('location')
                    //     ? false
                    //     : true
                    // }
                    onClick={(e) => {
                      e.preventDefault();
                      setStep(2);
                      formRef.current.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: 'instant',
                      });
                    }}
                  >
                    Tiếp theo
                  </button>
                ) : (
                  <button type='submit' className='btn btn-primary'>
                    Lưu
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </Modal>
      <ModalMoreOption
        isShowModal={isShowModal}
        setIsShowModal={setIsShowModal}
        setShowAddJob={setShowAddJob}
        newQuestion={newQuestion}
        setNewQuestion={setNewQuestion}
        childQuestion={childQuestion}
        setChildQuestion={setChildQuestion}
        handleAddQuestion={isAddNew ? handleAddQuestion : handleAddPreQuestion}
      />
      <ModalInfoLanguage
        open={openModalLanguagueInfo}
        setOpen={setOpenModalLanguagueInfo}
      />
    </>
  );
};

export default ModalAddNeedPosi;
