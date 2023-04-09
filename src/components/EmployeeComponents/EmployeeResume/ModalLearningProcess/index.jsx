import React from 'react';
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
const Index = ({ education, setEducation, optionsSelect, handleAddSchool }) => {
  const checkStepRef = useRef({
    level: false,
    school: false,
    major: false,
    jobTitle: false,
    startYear: false,
    endYear: false,
  });
  const schema = yup.object().shape({
    level: yup.object().required('Vui lòng chọn cấp bậc'),
    school: yup.object().required('Vui lòng chọn trường'),
    major: yup.object().required('Vui lòng chọn ngành'),
    jobTitle: yup.string().required('Vui lòng nhập chức danh'),
    startYear: yup
      .date()
      .required('Vui lòng chọn năm bắt đầu')
      .typeError('Vui lòng chọn năm bắt đầu'),
    endYear: yup
      .date()
      .required('Vui lòng chọn năm kết thúc')
      .typeError('Vui lòng chọn năm kết thúc'),
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
  });
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
    if (e.target.dataset.testid === 'jobTitle') {
      if (e.target.value !== '' && !checkStepRef.current.jobTitle) {
        checkStepRef.current.jobTitle = true;
      }
      if (e.target.value === '' && checkStepRef.current.jobTitle) {
        checkStepRef.current.jobTitle = false;
      }
    }
  }
  async function handleOnSubmit(data) {
    console.log(data);
    const dataAddSchool = {
      level: data.level.value,
      school: data.school.label,
      major: data.major.value,
      jobTitle: data.jobTitle,
      start: data.startYear,
      end: data.endYear,
    };
    await handleAddSchool(dataAddSchool);
    reset({
      level: '',
      school: '',
      major: '',
      jobTitle: '',
      startYear: '',
      endYear: '',
    });
    checkStepRef.current = {
      level: false,
      school: false,
      major: false,
      jobTitle: false,
      startYear: false,
      endYear: false,
    };
  }
  return (
    <>
      <Modal
        className='modal fade modal-bx-info editor '
        show={education}
        onHide={setEducation}
      >
        <div className='modal-dialog my-0 ' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='EducationModalLongTitle'>
                Quá trình học tập
              </h5>
              <button
                type='button'
                className='close'
                onClick={() => setEducation(false)}
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>{' '}
            <form onSubmit={handleSubmit(handleOnSubmit)}>
              <div className='modal-body font-size-14'>
                <div className='row'>
                  <div className='col-lg-12 col-md-12'>
                    <div className='form-group'>
                      <p>
                        Cấp bậc <span className='asterisk'></span>
                      </p>
                      <div className='select-style'>
                        {' '}
                        <Controller
                          name='level'
                          control={control}
                          render={({ field }) => (
                            <Select
                              {...field}
                              styles={selectStyle}
                              placeholder='Chọn cấp bậc'
                              // onChange={(e) =>
                              //   setNewSchool((prev) => ({
                              //     ...prev,
                              //     level: e.value,
                              //   }))
                              // }
                              onChange={(value) => {
                                setValue('level', value);
                                if (checkStepRef.current.level === false) {
                                  checkStepRef.current.level = true;
                                }
                              }}
                              options={optionsSelect.levels}
                              className={
                                checkStepRef.current.level ? 'filled' : ''
                              }
                            />
                          )}
                        />
                      </div>
                      <div className='text-danger'>
                        {errors?.level?.message && (
                          <div>{errors.level.message}</div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-12 col-md-12'>
                    <div className='form-group'>
                      <p>
                        Trường <span className='asterisk'></span>
                      </p>
                      <div className='select-style'>
                        {' '}
                        <Controller
                          name='school'
                          control={control}
                          render={({ field }) => (
                            <ReactSelectShowType
                              {...field}
                              minInput={1}
                              styles={selectStyle}
                              placeholder='Chọn trường'
                              // onChange={(e) =>
                              //   setNewSchool((prev) => ({
                              //     ...prev,
                              //     school: e.label,
                              //   }))
                              // }
                              onChange={(value) => {
                                setValue('school', value);
                                if (checkStepRef.current.school === false) {
                                  checkStepRef.current.school = true;
                                }
                              }}
                              options={optionsSelect.schools}
                              className={
                                checkStepRef.current.school ? 'filled' : ''
                              }
                            />
                          )}
                        />
                      </div>
                      <div className='text-danger'>
                        {errors?.school?.message && (
                          <div>{errors.school.message}</div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-12 col-md-12'>
                    <div className='form-group'>
                      <p>
                        Chuyên nghành <span className='asterisk'></span>
                      </p>
                      <div className='select-style'>
                        <Controller
                          name='major'
                          control={control}
                          render={({ field }) => (
                            <ReactSelectShowType
                              {...field}
                              minInput={1}
                              styles={selectStyle}
                              placeholder='Chọn chuyên nghành'
                              onChange={(value) => {
                                setValue('major', value);
                                if (checkStepRef.current.major === false) {
                                  checkStepRef.current.major = true;
                                }
                              }}
                              options={optionsSelect.allMajors}
                              className={
                                checkStepRef.current.major ? 'filled' : ''
                              }
                            />
                          )}
                        />
                      </div>
                      <div className='text-danger'>
                        {errors?.major?.message && (
                          <div>{errors.major.message}</div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-12 col-md-12'>
                    <div className='form-group'>
                      <p>
                        Chức danh chuyên môn <span className='asterisk'></span>
                      </p>
                      <input
                        {...register('jobTitle')}
                        className={
                          checkStepRef.current.jobTitle
                            ? 'filled form-control'
                            : ' form-control'
                        }
                        data-testid='jobTitle'
                        onBlur={handleCheckInput}
                        placeholder='Nhập chức danh chuyên môn'
                      />
                      <div className='text-danger'>
                        {errors?.jobTitle?.message && (
                          <div>{errors.jobTitle.message}</div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-6 col-md-6'>
                    <div className='form-group'>
                      <p>
                        Thời gian nhập học <span className='asterisk'></span>
                      </p>
                      <Controller
                        name='startYear'
                        control={control}
                        render={({ field: { onChange } }) => (
                          <MuiDatePicker
                            value={getValues('startYear')}
                            format={'MM-YYYY'}
                            className={
                              checkStepRef.current.startYear
                                ? 'form-control filled'
                                : 'form-control '
                            }
                            onChange={(date, validationError) => {
                              let e = {
                                target: { dataset: { testid: 'startYear' } },
                              };
                              handleCheckInput(e);
                              onChange(date);

                              if (getValues('endYear')) {
                                if (
                                  new Date(
                                    getValues('startYear')._d
                                  ).getTime() >
                                  new Date(getValues('endYear')._d).getTime()
                                ) {
                                  setError('endYear', {
                                    type: 'manual',
                                    message:
                                      'Năm kết thúc phải lớn hơn năm bắt đầu',
                                  });
                                  return;
                                }
                              }
                              clearErrors('endYear');
                            }}
                          />
                        )}
                      />
                      <div className='text-danger'>
                        {errors?.startYear?.message && (
                          <div>{errors.startYear.message}</div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-6 col-md-6'>
                    <div className='form-group'>
                      <p>
                        Thời gian tốt nghiệp <span className='asterisk'></span>
                      </p>
                      <Controller
                        name='endYear'
                        control={control}
                        render={({ field: { onChange } }) => (
                          <MuiDatePicker
                            value={getValues('endYear')}
                            format={'MM-YYYY'}
                            className={
                              checkStepRef.current.endYear
                                ? 'form-control filled'
                                : 'form-control '
                            }
                            onChange={(date, validationError) => {
                              let e = {
                                target: { dataset: { testid: 'endYear' } },
                              };
                              handleCheckInput(e);
                              onChange(date);
                              if (
                                new Date(getValues('startYear')._d).getTime() >
                                new Date(getValues('endYear')._d).getTime()
                              ) {
                                setError('endYear', {
                                  type: 'manual',
                                  message:
                                    'Năm kết thúc phải lớn hơn năm bắt đầu',
                                });
                                return;
                              }
                              clearErrors('endYear');
                            }}
                          />
                        )}
                      />
                      <div className='text-danger'>
                        {errors?.endYear?.message && (
                          <div>{errors.endYear.message}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='site-button'
                  onClick={() => setEducation(false)}
                >
                  Cancel
                </button>
                <button
                  className='site-button btn'
                  // disabled={
                  //   !newSchool.school ||
                  //   !newSchool.level ||
                  //   !newSchool.major ||
                  //   !newSchool.jobTitle
                  // }
                  // onClick={handleAddSchool}
                  type='submit'
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
