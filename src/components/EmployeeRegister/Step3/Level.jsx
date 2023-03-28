import React from "react";
import ReactSelectShowType from "../../../customComponents/ReactSelectShowType/ReactSelectShowType";
import Select from "react-select";
//hookform
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRef } from "react";
const Level = ({
  setStep,
  fetchSchoolAndMajor,
  setInfoRegister3,
  optionsSelect,
  registerUser,
  setChildStep,
}) => {
  const checkStepRef = useRef({
    level: false,
    school: false,
    major: false,
    jobTitle: false,
    startYear: false,
    endYear: false,
  });
  const schema = yup.object().shape({
    level: yup.object().required("Vui lòng chọn trình độ"),
    school: yup.object().required("Vui lòng chọn trường"),
    major: yup.object().required("Vui lòng chọn ngành"),
    jobTitle: yup.object().required("Vui lòng nhập chức danh"),
    startYear: yup
      .date()
      .required("Vui lòng chọn năm bắt đầu")
      .typeError("Vui lòng chọn năm bắt đầu"),
    endYear: yup
      .date()
      .required("Vui lòng chọn năm kết thúc")
      .typeError("Vui lòng chọn năm kết thúc"),
    checkBox: yup
      .boolean()
      .required("Vui lòng đồng ý")
      .oneOf([true], "Vui lòng chọn"),
  });
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  function onHandleSubmit(data) {
    setInfoRegister3(data);
    console.log(data);
    // console.log(errors);
    if (Object.keys(errors).length === 0) {
      registerUser(data);
    }
  }
  function handleCheckInput(e) {
    if (e.target.dataset.testid === "startYear") {
      if (e.target.value !== "" && !checkStepRef.current.startYear) {
        setChildStep((prev) => prev + 1 / 3 / 6);
        checkStepRef.current.startYear = true;
      }
      if (e.target.value === "" && checkStepRef.current.startYear) {
        setChildStep((prev) => prev - 1 / 3 / 6);
        checkStepRef.current.startYear = false;
      }
    }
    if (e.target.dataset.testid === "endYear") {
      if (e.target.value !== "" && !checkStepRef.current.endYear) {
        setChildStep((prev) => prev + 1 / 3 / 6);
        checkStepRef.current.endYear = true;
      }
      if (e.target.value === "" && checkStepRef.current.endYear) {
        setChildStep((prev) => prev - 1 / 3 / 6);
        checkStepRef.current.endYear = false;
      }
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        <div className='form-group'>
          <p>
            Trình độ <span className='asterisk'></span>
          </p>
          <div className='select-style'>
            {" "}
            <Controller
              name='level'
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder='Chọn trình độ'
                  options={optionsSelect.levels}
                  onChange={(value) => {
                    console.log(value);
                    setValue("level", value);
                    if (checkStepRef.current.level === false) {
                      setChildStep((prev) => prev + 1 / 3 / 6);
                      checkStepRef.current.level = true;
                    }
                    fetchSchoolAndMajor(value?.value);
                  }}
                  className={checkStepRef.current.level ? "filled" : ""}
                />
              )}
            />
          </div>

          <div className='text-danger'>
            {errors?.level?.message && <div>{errors.level.message}</div>}
          </div>
        </div>
        <div className='form-group'>
          <p>
            Trường <span className='asterisk'></span>
          </p>
          <div className='select-style'>
            {" "}
            <Controller
              name='school'
              control={control}
              render={({ field }) => (
                <ReactSelectShowType
                  {...field}
                  placeholder='Chọn trường'
                  options={optionsSelect.schools}
                  minInput={1}
                  onChange={(value) => {
                    console.log(value);
                    setValue("school", value);
                    if (checkStepRef.current.school === false) {
                      setChildStep((prev) => prev + 1 / 3 / 6);
                      checkStepRef.current.school = true;
                    }
                  }}
                  className={checkStepRef.current.school ? "filled" : ""}
                />
              )}
            />
          </div>

          <div className='text-danger'>
            {errors?.school?.message && <div>{errors.school.message}</div>}
          </div>
        </div>
        <div className='form-group'>
          <p>
           Chuyên ngành <span className='asterisk'></span>
          </p>
          <div className='select-style'>
            {" "}
            <Controller
              name='major'
              control={control}
              render={({ field }) => (
                <ReactSelectShowType
                  {...field}
                  minInput={1}
                  placeholder='Chọn ngành'
                  options={optionsSelect.majors}
                  onChange={(value) => {
                    console.log(value);
                    setValue("major", value);
                    if (checkStepRef.current.major === false) {
                      setChildStep((prev) => prev + 1 / 3 / 6);
                      checkStepRef.current.major = true;
                    }
                  }}
                  className={checkStepRef.current.major ? "filled" : ""}
                />
              )}
            />
          </div>
          <div className='text-danger'>
            {errors?.major?.message && <div>{errors.major.message}</div>}
          </div>
        </div>
        <div className='form-group'>
          <p>
            Chức danh <span className='asterisk'></span>
          </p>
          <div className='select-style'>
            {" "}
            <Controller
              name='jobTitle'
              control={control}
              render={({ field }) => (
                <ReactSelectShowType
                  {...field}
                  minInput={1}
                  placeholder='Chọn chức danh'
                  options={optionsSelect.jobTitles}
                  onChange={(value) => {
                    console.log(value);
                    setValue("jobTitle", value);
                    if (checkStepRef.current.jobTitle === false) {
                      setChildStep((prev) => prev + 1 / 3 / 6);
                      checkStepRef.current.jobTitle = true;
                    }
                  }}
                  className={checkStepRef.current.jobTitle ? "filled" : ""}
                />
              )}
            />
          </div>
          <div className='text-danger'>
            {errors?.jobTitle?.message && <div>{errors.jobTitle.message}</div>}
          </div>
        </div>
        <div className='form-group'>
          <p>
            Năm bắt đầu <span className='asterisk'></span>
          </p>
          <input
            {...register("startYear")}
            type='month'
            className={
              checkStepRef.current.startYear
                ? "form-control filled"
                : "form-control"
            }
            placeholder='Nhập năm bắt đầu'
            data-testid='startYear'
            onChange={(e) => {
              setValue("startYear", e.target.value);
              console.log(getValues("endYear"));
              handleCheckInput(e);
              if (getValues("endYear") < getValues("startYear")) {
                setError("endYear", {
                  type: "manual",
                  message: "Năm kết thúc phải lớn hơn năm bắt đầu",
                });
              }
              clearErrors("endYear");
            }}
          />
          <div className='text-danger'>
            {errors?.startYear?.message && (
              <div>{errors.startYear.message}</div>
            )}
          </div>
        </div>
        <div className='form-group'>
          <p>
            Năm kết thúc <span className='asterisk'></span>
          </p>
          <input
            {...register("endYear")}
            type='month'
            className={
              checkStepRef.current.endYear
                ? "form-control filled"
                : "form-control"
            }
            placeholder='Nhập năm kết thúc'
            data-testid='endYear'
            onChange={(e) => {
              setValue("endYear", e.target.value);
              console.log(getValues("endYear"));
              handleCheckInput(e);
              if (getValues("endYear") < getValues("startYear")) {
                setError("endYear", {
                  type: "manual",
                  message: "Năm kết thúc phải lớn hơn năm bắt đầu",
                });
                return;
              }
              clearErrors("endYear");
            }}
          />
          <div className='text-danger'>
            {errors?.endYear?.message && <div>{errors.endYear.message}</div>}
          </div>
        </div>
        <div className='form-group text-left'>
          <span className='custom-control custom-checkbox'>
            <input
              {...register("checkBox")}
              type='checkbox'
              className='custom-control-input'
              id='check1'
            />
            <label className='custom-control-label' htmlFor='check1'>
              Tôi đồng ý với các điều khoản và điều kiện
            </label>
          </span>
          <div className='text-danger'>
            {errors?.checkBox?.message && <div>{errors.checkBox.message}</div>}
          </div>
        </div>
        <div className='form-group text-right register-btn'>
          <button
            type='button'
            className='site-button dz-xs-flex m-r5 '
            onClick={() => {
              setStep((prev) => prev - 1);
            }}
          >
            <i className='fa fa-arrow-left' aria-hidden='true'></i> Quay lại
          </button>
          <button type='submit' className='site-button dz-xs-flex m-r5 btn'>
            Đăng ký
          </button>
        </div>
      </form>
    </>
  );
};

export default Level;
