import React, { useMemo } from "react";
import { Modal, Card, Accordion, Form, Nav } from "react-bootstrap";
import Select from "react-select";
import ReactQuill from "react-quill";
import icon from "../../../images/logo/icon2.png";
import ModalMoreOption from "../ModalMoreOption/ModalMoreOption";
import { useState, useEffect } from "react";
//hook form
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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
  const [isShowModal, setIsShowModal] = useState(false);
  const schema = yup
    .object({
      position: yup.mixed().required("Vui lòng nhập "),
      level: yup.array().required("Vui lòng nhập "),
      industry: yup.mixed().required("Vui lòng nhập "),
      major: yup.array().required("Vui lòng nhập "),
      environment: yup.mixed().required("Vui lòng nhập "),
      experience: yup.string().required("Vui lòng nhập "),
      title: yup.mixed().required("Vui lòng nhập "),
      quantity: yup
        .number()
        .min(1, "Vui lòng nhập số lượng lớn hơn 1")
        .required("Vui lòng nhập ")
        .typeError("Vui lòng nhập"),
      salaryMin: yup
        .number()
        .min(1, "Vui lòng nhập số lượng lớn hơn 1")
        .required("Vui lòng nhập ")
        .typeError("Vui lòng nhập"),
      salaryMax: yup
        .number()
        .min(1, "Vui lòng nhập số lượng lớn hơn 1")
        .required("Vui lòng nhập ")
        .typeError("Vui lòng nhập"),
      description: yup.string().required("Vui lòng nhập "),
      location: yup.mixed().required("Vui lòng nhập "),
      question0: yup
        .number()
        .min(1, "Vui lòng nhập số lượng lớn hơn 1")
        .required("Vui lòng nhập ")
        .typeError("Vui lòng nhập"),
      question1: yup.number().required("Vui lòng nhập "),
      question2: yup.number().required("Vui lòng nhập "),
      question3: yup.number().required("Vui lòng nhập "),
      question4: yup.number().required("Vui lòng nhập "),
      question5: yup.number().required("Vui lòng nhập "),
      question6: yup.number().required("Vui lòng nhập "),
      question7: yup.number().required("Vui lòng nhập "),
      question8: yup.number().required("Vui lòng nhập "),
      question9: yup.number().required("Vui lòng nhập "),
      question10: yup.number().required("Vui lòng nhập "),
      question11: yup.number().required("Vui lòng nhập "),
      question12: yup.number().required("Vui lòng nhập "),
      question13: yup.number().required("Vui lòng nhập "),
      question14: yup.number().required("Vui lòng nhập "),
    })
    .required();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: useMemo(() => {
      if (isAddNew) return;
      return preloadValue;
    }, [preloadValue]),
  });
  useEffect(() => {
    // console.log(preloadValue);
  }, [preloadValue]);
  function handleOnSubmit(data) {
    console.log(data);
    const objJob = {
      title: data.title.value,
      position: data.position.value,
      level: data.level.value,
      major: data.major.value,
      industry: data.industry.value,
      location: data.location.value,
      workingEnvironment: data.environment.value,
      experience: data.experience,
      quantity: data.quantity,
      salaryMin: data.salaryMin,
      salaryMax: data.salaryMax,
      description: data.description,
      question: data.question,
      addOnQuestionOptions,
    };
    if (isAddNew) {
      handleAddJob(objJob);
    } else {
      handleAddJob(objJob);
    }
  }
  useEffect(() => {
    reset(preloadValue);
  }, [preloadValue]);
  useEffect(() => {
    // console.log(errors);
  }, [errors]);
  return (
    <>
      {" "}
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
                className='modal-body'
                style={{ maxHeight: "70vh", overflow: "auto" }}
              >
                <div className='form-group'>
                  <label>Chức danh công việc</label>
                  <Controller
                    name='title'
                    control={control}
                    onChange={(e) => {
                      setNewJob({ ...newJob, title: e.label });
                    }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        placeholder='Chọn chức danh công việc'
                        options={jobTitleOption}
                      />
                    )}
                  />
                  {/* <Select
                    name='title'
                    {...register("title")}
                    placeholder='Chọn chức danh công việc'
                    onChange={(e) => {
                      setValue("title", e.label);
                      setNewJob({ ...newJob, title: e.label });
                    }}
                    value={
                      preloadValue?.title.length > 0 && preloadValue?.title
                    }
                    options={jobTitleOption}
                  /> */}
                  {errors?.title?.message && (
                    <p>
                      <>{errors?.title?.message}</>
                    </p>
                  )}
                </div>
                <div className='form-group'>
                  <label>Chức vụ</label>
                  <Controller
                    name='position'
                    control={control}
                    onChange={(e) => {
                      setNewJob({ ...newJob, position: e.label });
                    }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        placeholder='Chọn chức vụ'
                        options={positionOptions}
                      />
                    )}
                  />
                  {/* <Select
                    name='position'
                    {...register("position")}
                    placeholder='Chọn chức vụ'
                    onChange={(e) => {
                      setValue("position", e.label);
                      setNewJob({ ...newJob, position: e.label });
                    }}
                    value={
                      preloadValue?.position.length > 0 &&
                      preloadValue?.position
                    }
                    options={positionOptions}
                  /> */}
                  {errors?.position?.message && (
                    <p>
                      <>{errors?.position?.message}</>
                    </p>
                  )}
                </div>
                <div className='form-group'>
                  <label>Cấp bậc</label>{" "}
                  <Controller
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
                        placeholder='Chọn cấp bậc'
                        isMulti
                        options={levelOptions}
                      />
                    )}
                  />
                  {/* <Select
                    name='level'
                    {...register("level")}
                    isMulti
                    closeMenuOnSelect={false}
                    placeholder='Chọn cấp bậc'
                    onChange={(e) => {
                      setValue(
                        "level",
                        e.map((item) => item.label)
                      );
                      setNewJob({
                        ...newJob,
                        level: e.map((item) => item.label),
                      });
                    }}
                    value={
                      preloadValue?.level.length > 0 && preloadValue?.level
                    }
                    options={levelOptions}
                  /> */}
                  {errors?.level?.message && (
                    <p>
                      <>{errors?.level?.message}</>
                    </p>
                  )}
                </div>
                <div className='form-group'>
                  <label for=''>Chuyên nghành ứng viên</label>
                  <Controller
                    name='major'
                    control={control}
                    onChange={(e) => {
                      setNewJob({
                        ...newJob,
                        major: e.map((item) => item.label),
                      });
                    }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isMulti
                        placeholder='Chọn chuyên ngành ứng viên'
                        options={majorOptions}
                      />
                    )}
                  />
                  {/* <Select
                    name='major'
                    {...register("major")}
                    isMulti
                    closeMenuOnSelect={false}
                    placeholder='Chọn chuyên ngành ứng viên'
                    onChange={(e) => {
                      setValue(
                        "major",
                        e.map((item) => item.label)
                      );
                      setNewJob({
                        ...newJob,
                        major: e.map((item) => item.label),
                      });
                    }}
                    value={
                      preloadValue?.major.length > 0 && preloadValue?.major
                    }
                    options={majorOptions}
                  /> */}
                  {errors?.major?.message && (
                    <p>
                      <>{errors?.major?.message}</>
                    </p>
                  )}
                </div>
                <div className='form-group'>
                  <label for=''>Lĩnh vực kinh doanh</label>
                  <Controller
                    name='industry'
                    control={control}
                    onChange={(e) => {
                      setNewJob({ ...newJob, industry: e.label });
                    }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        placeholder='Chọn lĩnh vực kinh doanh'
                        options={industryOptions}
                      />
                    )}
                  />
                  {/* <Select
                    name='industry'
                    {...register("industry")}
                    placeholder='Chọn lĩnh vực kinh doanh'
                    onChange={(e) => {
                      setValue("industry", e.label);
                      setNewJob({ ...newJob, industry: e.label });
                    }}
                    value={
                      preloadValue?.industry.length > 0 &&
                      preloadValue?.industry
                    }
                    options={industryOptions}
                  /> */}
                  {errors?.industry?.message && (
                    <p>
                      <>{errors?.industry?.message}</>
                    </p>
                  )}
                </div>
                <div className='form-group'>
                  <label for=''>Nơi làm việc</label>
                  <Controller
                    name='location'
                    control={control}
                    onChange={(e) => {
                      setNewJob({ ...newJob, location: e.label });
                    }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={provinceOptions}
                        placeholder='Chọn nơi làm việc'
                      />
                    )}
                  />
                  {/* <Select
                    name='location'
                    {...register("location")}
                    placeholder='Chọn nơi làm việc'
                    onChange={(e) => {
                      setValue("location", e.label);
                      setNewJob({ ...newJob, location: e.label });
                    }}
                    value={
                      preloadValue?.location.length > 0 &&
                      preloadValue?.location
                    }
                    options={provinceOptions}
                  /> */}
                  {errors?.location?.message && (
                    <p>
                      <>{errors?.location?.message}</>
                    </p>
                  )}
                </div>
                <div className='form-group'>
                  <label for=''>Môi trường làm việc</label>
                  <Controller
                    name='environment'
                    control={control}
                    onChange={(e) => {
                      setNewJob({ ...newJob, environment: e.label });
                    }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        placeholder='Chọn môi trường làm việc'
                        options={environmentOption}
                      />
                    )}
                  />
                  {/* <Select
                    name='environment'
                    {...register("environment")}
                    placeholder='Chọn môi trường làm việc'
                    onChange={(e) => {
                      setValue("environment", e.label);
                      setNewJob({
                        ...newJob,
                        workingEnvironment: e.label,
                      });
                    }}
                    value={
                      preloadValue?.environment.length > 0 &&
                      preloadValue?.environment
                    }
                    options={environmentOption}
                  /> */}
                  {errors?.environment?.message && (
                    <p>
                      <>{errors?.position?.message}</>
                    </p>
                  )}
                </div>
                <div className='form-group'>
                  <label for=''>Yêu cầu kinh nghiệm</label>
                  <input
                    name='experience'
                    {...register("experience")}
                    type='text'
                    className='form-control'
                    placeholder='Nhập yêu cầu kinh nghiệm'
                    value={newJob.experience}
                    onChange={(e) => {
                      setNewJob({
                        ...newJob,
                        experience: e.target.value,
                      });
                    }}
                  />
                  {errors?.experience?.message && (
                    <p>
                      <>{errors?.experience?.message}</>
                    </p>
                  )}
                </div>
                <div className='form-group'>
                  <label for=''>Số lượng</label>
                  <input
                    name='quantity'
                    {...register("quantity")}
                    type='number'
                    className='form-control'
                    placeholder='Nhập số lượng'
                    value={newJob.quantity}
                    onChange={(e) => {
                      setNewJob({
                        ...newJob,
                        quantity: e.target.value,
                      });
                    }}
                  />
                  {errors?.quantity?.message && (
                    <p>
                      <>{errors?.quantity?.message}</>
                    </p>
                  )}
                </div>
                <div className='form-group'>
                  <label for=''>Mức lương tối thiểu</label>
                  <input
                    name='salaryMin'
                    {...register("salaryMin")}
                    type='number'
                    className='form-control'
                    placeholder='Nhập mức lương tối thiểu'
                    value={newJob.salaryMin}
                    onChange={(e) => {
                      setNewJob({
                        ...newJob,
                        salaryMin: e.target.value,
                      });
                    }}
                  />
                  {errors?.salaryMin?.message && (
                    <p>
                      <>{errors?.salaryMin?.message}</>
                    </p>
                  )}
                </div>
                <div className='form-group'>
                  <label for=''>Mức lương tối đa</label>
                  <input
                    name='salaryMax'
                    {...register("salaryMax")}
                    type='number'
                    className='form-control'
                    placeholder='Nhập mức lương tối đa'
                    value={newJob.salaryMax}
                    onChange={(e) => {
                      setNewJob({
                        ...newJob,
                        salaryMax: e.target.value,
                      });
                    }}
                  />
                  {errors?.salaryMax?.message && (
                    <p>
                      <>{errors?.salaryMax?.message}</>
                    </p>
                  )}
                </div>
                <div className='form-group'>
                  <label for=''>Mô tả công việc</label>
                  <ReactQuill
                    name='description'
                    {...register("description")}
                    theme='snow'
                    defaultValue={
                      preloadValue?.description && preloadValue.description
                    }
                    value={newJob.description}
                    onChange={(e) => {
                      // console.log(e);
                      setValue("description", e);
                      setNewJob({ ...newJob, description: e });
                    }}
                  />
                  {errors?.description?.message && (
                    <p>
                      <>{errors?.description?.message}</>
                    </p>
                  )}
                </div>
                <div className='form-group'>
                  <Accordion>
                    <label>Tiêu chí đánh giá</label>
                    <Card border='primary'>
                      <Card.Header className='d-flex w-100 p-1'>
                        <Nav.Item
                          className='mr-auto h5 pl-3 pt-2'
                          as={Nav.Item}
                        >
                          Tiêu chí đánh giá đề xuất
                        </Nav.Item>
                        <Nav.Item
                          className='align-self-center'
                          style={{ width: "50px" }}
                        >
                          Điểm
                        </Nav.Item>
                      </Card.Header>
                    </Card>
                    {questionOptions?.map((question, index) => (
                      <Card border='primary' key={index}>
                        <Card.Header className='d-flex w-100 p-1'>
                          <Accordion.Toggle
                            as={Nav.Link}
                            eventKey={index + 1}
                            className='mr-auto'
                          >
                            {index + 1 + ". " + question.name}{" "}
                            <i className='fa fa-question-circle ms-0'></i>
                            {/* trash */}
                            {index >= 15 && (
                              <i
                                className='fa fa-trash ml-2 text-red'
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
                            style={{ width: "70px", textAlign: "center" }}
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
                        {/* {errors?.question0?.message && (
                          <p>
                            <>{errors?.question0?.message}</>
                          </p>
                        )} */}
                        {errors[`question${index}`]?.message && (
                          <p>
                            <>{errors[`question${index}`]?.message}</>
                          </p>
                        )}
                      </Card>

                      // <li className="list-group-item">
                      //   <div className="row">
                      //     <div className="col-10">

                      //     </div>
                      //     <div className="col-2">
                      //       <button
                      //         className="btn btn-danger btn-sm"
                      //         onClick={() => {
                      //           let newCriteria = [
                      //             ...newJob.criteria,
                      //           ];
                      //           newCriteria.splice(index, 1);
                      //           setNewJob({
                      //             ...newJob,
                      //             criteria: newCriteria,
                      //           });
                      //         }}
                      //       >
                      //         Xóa
                      //       </button>
                      //     </div>
                      //   </div>
                      // </li>
                    ))}
                    {addOnQuestionOptions?.map((question, index) => (
                      <Card border='primary' key={index}>
                        <Card.Header className='d-flex w-100 p-1'>
                          <Accordion.Toggle
                            as={Nav.Link}
                            eventKey={index + 1}
                            className='mr-auto'
                          >
                            {index + 16 + ". " + question.name}{" "}
                            <i className='fa fa-question-circle ms-0'></i>
                            {/* trash */}
                            <i
                              className='fa fa-trash ml-2 text-red'
                              onClick={() => deleteAddOnQuestion(index)}
                            ></i>
                          </Accordion.Toggle>
                          <Form.Control
                            className='align-self-center mr-0'
                            value={question.point}
                            style={{ width: "50px" }}
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
                    className='btn btn-primary mt-2'
                    onClick={() => setIsShowModal(true)}
                  >
                    Thêm tiêu chí
                  </button>
                </div>

                {/* <input
              type="number"
              className="form-control"
              placeholder="Nhập mức lương tối đa"
              value={newJob.salaryMax}
              onChange={(e) => {
                setNewJob({
                  ...newJob,
                  salaryMax: e.target.value,
                });
              }}
            /> */}
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
