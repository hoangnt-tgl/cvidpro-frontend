import React, { useMemo } from "react";
import { Modal, Card, Accordion, Form, Nav } from "react-bootstrap";
import Select from "react-select";
import ReactQuill from "react-quill";
import icon from "../../../../images/logo/icon2.png";
import ModalMoreOption from "../ModalMoreOption/ModalMoreOption";
import { useState, useEffect } from "react";
//hook form
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ReactSelectShowType from "../../../../customComponents/ReactSelectShowType/ReactSelectShowType";
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
        .min(1, "Vui lòng nhập số lớn hơn 1")
        .required("Vui lòng nhập ")
        .typeError("Vui lòng nhập"),
      salaryMin: yup
        .number()
        .min(1, "Vui lòng nhập số lớn hơn 1")
        .required("Vui lòng nhập ")
        .typeError("Vui lòng nhập"),
      salaryMax: yup
        .number()
        .min(1, "Vui lòng nhập số lớn hơn 1")
        .required("Vui lòng nhập ")
        .typeError("Vui lòng nhập"),
      description: yup.string().required("Vui lòng nhập "),
      location: yup.mixed().required("Vui lòng nhập "),
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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: useMemo(() => {
      if (isAddNew) return;
      return preloadValue;
    }, [preloadValue]),
  });
  function handleOnSubmit(data) {
    // console.log(data);
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
      question: [
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
    if (isAddNew) {
      handleAddJob(objJob);
      reset({
        position: [],
        level: [],
        industry: [],
        location: [],
        environment: [],
        major: [],
        experience: "",
        salaryMin: "",
        salaryMax: "",
        description: "",
        quantity: "",
        title: [],
        question0: "",
        question1: "",
        question2: "",
        question3: "",
        question4: "",
        question5: "",
        question6: "",
        question7: "",
        question8: "",
        question9: "",
        question10: "",
        question11: "",
        question12: "",
        question13: "",
        question14: "",
      });
    } else {
      handleAddJob(objJob);
    }
  }
  useEffect(() => {
    reset(preloadValue);
  }, [preloadValue]);

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
                      <ReactSelectShowType
                        {...field}
                        // register={{ ...field }}
                        placeholder='Chọn chức danh công việc'
                        options={jobTitleOption}
                        minInput={1}
                      />
                      // <Select
                      //   {...field}
                      //   placeholder='Chọn chức danh công việc'
                      //   options={jobTitleOption}
                      // />
                    )}
                  />

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
                      <ReactSelectShowType
                        {...field}
                        // register={{ ...field }}
                        isMulti={true}
                        placeholder='Chọn chuyên ngành ứng viên'
                        options={majorOptions}
                        minInput={1}
                      />
                      // <Select
                      //   {...field}
                      //   isMulti
                      //   placeholder='Chọn chuyên ngành ứng viên'
                      //   options={majorOptions}
                      // />
                    )}
                  />

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
                      <ReactSelectShowType
                        {...field}
                        // register={{ ...field }}
                        placeholder='Chọn nơi làm việc'
                        options={provinceOptions}
                        minInput={1}
                      />
                      // <Select
                      //   {...field}
                      //   options={provinceOptions}
                      //   placeholder='Chọn nơi làm việc'
                      // />
                    )}
                  />

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
                        {errors[`question${index}`]?.message && (
                          <p>
                            <>{errors[`question${index}`]?.message}</>
                          </p>
                        )}
                      </Card>
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
