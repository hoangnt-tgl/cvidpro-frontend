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
const ModalAddNeedPosi = ({
  showAddJob,
  setShowAddJob,
  setNewJob,
  newJob,
  jobTitleOption,
  positionOptions,
  levelOptions,
  majorOptions,
  industryOptions,
  provinceOptions,
  environmentOption,
  questionOptions,
  handleAddJob,
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
  });
  const [isShowModal, setIsShowModal] = useState(false);
  const [trigger, setTrigger] = useState(false);
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
      industry: data.industry.value,
      location: data.location.value,
      workingEnvironment: data.environment.value,
      experience: data.experience.toString(),
      quantity: data.quantity.toString(),
      salaryMin: data.salaryMin.toString(),
      salaryMax: data.salaryMax.toString(),
      description: data.description,
      questions: [
        data.question0.toString(),
        data.question1.toString(),
        data.question2.toString(),
        data.question3.toString(),
        data.question4.toString(),
        data.question5.toString(),
        data.question6.toString(),
        data.question7.toString(),
        data.question8.toString(),
        data.question9.toString(),
        data.question10.toString(),
        data.question11.toString(),
        data.question12.toString(),
        data.question13.toString(),
        data.question14.toString(),
      ],
      addOnQuestionOptions,
    };
    console.log(objJob);
    if (isAddNew) {
      handleAddJob(objJob);
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
      handleAddJob(objJob);
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
  useEffect(() => {
    reset(preloadValue);
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
  useEffect(() => {
    console.log(errors);
  }, [errors]);
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
              <div className='logo-img'>
                <img alt='' src={icon} />
              </div>
              <h5 className='modal-title'>Tạo vị trí tuyển dụng</h5>
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
                className='modal-body font-size-14'
                style={{ maxHeight: '70vh', overflow: 'auto' }}
              >
                <div className='form-group'>
                  <p>Chức danh công việc</p>
                  <div className='select-style'>
                    {' '}
                    <Controller
                      name='title'
                      control={control}
                      // onChange={(e) => {
                      //   console.log('chay');
                      //   setNewJob({ ...newJob, title: e.label });
                      //   if (checkStepRef.current.title === false) {
                      //     console.log('chay');
                      //     checkStepRef.current.title = true;
                      //   }
                      // }}
                      render={({ field }) => (
                        <ReactSelectShowType
                          {...field}
                          placeholder='Chọn chức danh công việc'
                          options={jobTitleOption}
                          minInput={1}
                          className={checkStepRef.current.title ? 'filled' : ''}
                          onChange={(value) => {
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
                  <p>Chức vụ</p>
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
                  <p>Cấp bậc</p>{' '}
                  <div className='select-style'>
                    {' '}
                    {/* <Controller
                      name='level'
                      control={control}
                      onChange={(e) => {
                        setNewJob({
                          ...newJob,
                          level: e.map((item) => item.label),
                        });
                      }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          styles={selectStyle}
                          placeholder='Chọn cấp bậc'
                          isMulti
                          options={levelOptions}
                        />
                      )}
                    /> */}
                    <div className={checkStepRef.current.level ? 'filled' : ''}>
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
                  <p>Chuyên nghành ứng viên</p>
                  <div className='select-style'>
                    {' '}
                    {/* <Controller
                      name='major'
                      control={control}
                      onChange={(e) => {
                        setNewJob({
                          ...newJob,
                          major: e.map((item) => item.label),
                        });
                      }}
                      render={({ field }) => (
                        <ReactSelectShowType
                          {...field}
                          // register={{ ...field }}
                          isMulti={true}
                          placeholder='Chọn chuyên ngành ứng viên'
                          options={majorOptions}
                          minInput={1}
                        />
                      )}
                    /> */}
                    <div className={checkStepRef.current.major ? 'filled' : ''}>
                      {' '}
                      <DropDownSelect
                        clearErrors={clearErrors}
                        setValueForm={setValue}
                        setChildStep1={() => {}}
                        checkStepRef={checkStepRef}
                        placeholder='Chọn cấp bậc'
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
                  <p>Lĩnh vực kinh doanh</p>
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
                  <p>Nơi làm việc</p>
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
                  <p>Môi trường làm việc</p>
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
                            setNewJob({ ...newJob, environment: value.label });
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
                  <p>Yêu cầu kinh nghiệm</p>
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
                  <p>Số lượng</p>
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
                  <p>Mức lương tối thiểu</p>
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
                  <p>Mức lương tối đa</p>
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
                  <p>Mô tả công việc</p>
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
                            style={{ width: '70px', textAlign: 'center' }}
                            onChange={(e) => {
                              if (isNaN(e.target.value)) e.target.value = 0;
                              if (e.target.value > 10) e.target.value = 10;
                              let arrCopy = new Array(...addOnQuestionOptions);
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
              <div className='modal-footer'>
                <button
                  type='submit'
                  className='btn btn-primary'
                  // onClick={handleAddJob}
                >
                  Lưu
                </button>
                <button
                  type='button'
                  className='btn btn-secondary'
                  onClick={() => setShowAddJob(false)}
                >
                  Hủy
                </button>
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
        handleAddQuestion={handleAddQuestion}
      />
    </>
  );
};

export default ModalAddNeedPosi;
