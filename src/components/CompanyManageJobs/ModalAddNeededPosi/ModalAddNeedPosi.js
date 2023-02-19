import React from "react";
import { Modal, Card, Accordion, Form, Nav } from "react-bootstrap";
import Select from "react-select";
import ReactQuill from "react-quill";
import icon from "../../../images/logo/icon2.png";
import ModalMoreOption from "../ModalMoreOption/ModalMoreOption";
import { useState } from "react";
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
  setQuestionOptions,
  handleAddJob,
  newQuestion,
  setNewQuestion,
  childQuestion,
  setChildQuestion,
  handleAddQuestion,
  deleteAddOnQuestion,
}) => {
  const [isShowModal, setIsShowModal] = useState(false);
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
            <div
              className='modal-body'
              style={{ maxHeight: "70vh", overflow: "auto" }}
            >
              <div className='form-group'>
                <label>Chức danh công việc</label>
                <Select
                  placeholder='Chọn chức danh công việc'
                  onChange={(e) => setNewJob({ ...newJob, title: e.label })}
                  options={jobTitleOption}
                />
              </div>
              <div className='form-group'>
                <label>Chức vụ</label>
                <Select
                  placeholder='Chọn chức vụ'
                  onChange={(e) => setNewJob({ ...newJob, position: e.label })}
                  options={positionOptions}
                />
              </div>
              <div className='form-group'>
                <label>Cấp bậc</label>
                <Select
                  isMulti
                  closeMenuOnSelect={false}
                  placeholder='Chọn cấp bậc'
                  onChange={(e) =>
                    setNewJob({
                      ...newJob,
                      level: e.map((item) => item.label),
                    })
                  }
                  options={levelOptions}
                />
              </div>
              <div className='form-group'>
                <label for=''>Chuyên nghành ứng viên</label>
                <Select
                  isMulti
                  closeMenuOnSelect={false}
                  placeholder='Chọn chuyên ngành ứng viên'
                  onChange={(e) =>
                    setNewJob({
                      ...newJob,
                      major: e.map((item) => item.label),
                    })
                  }
                  options={majorOptions}
                />
              </div>
              <div className='form-group'>
                <label for=''>Lĩnh vực kinh doanh</label>
                <Select
                  placeholder='Chọn lĩnh vực kinh doanh'
                  onChange={(e) => setNewJob({ ...newJob, industry: e.label })}
                  options={industryOptions}
                />
              </div>
              <div className='form-group'>
                <label for=''>Nơi làm việc</label>
                <Select
                  placeholder='Chọn nơi làm việc'
                  onChange={(e) => {
                    setNewJob({ ...newJob, location: e.label });
                  }}
                  options={provinceOptions}
                />
              </div>
              <div className='form-group'>
                <label for=''>Môi trường làm việc</label>
                <Select
                  placeholder='Chọn môi trường làm việc'
                  onChange={(e) => {
                    setNewJob({
                      ...newJob,
                      workingEnvironment: e.label,
                    });
                  }}
                  options={environmentOption}
                />
              </div>
              <div className='form-group'>
                <label for=''>Yêu cầu kinh nghiệm</label>
                <input
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
              </div>
              <div className='form-group'>
                <label for=''>Số lượng</label>
                <input
                  type='number'
                  className='form-control'
                  placeholder='Nhập số lượng'
                  value={newJob.quantity}
                  min='1'
                  onChange={(e) => {
                    setNewJob({
                      ...newJob,
                      quantity: e.target.value,
                    });
                  }}
                />
              </div>

              <div className='form-group'>
                <label for=''>Mức lương tối thiểu</label>
                <input
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
              </div>
              <div className='form-group'>
                <label for=''>Mức lương tối đa</label>
                <input
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
              </div>
              <div className='form-group'>
                <label for=''>Mô tả công việc</label>
                <ReactQuill
                  theme='snow'
                  value={newJob.description}
                  onChange={(e) => setNewJob({ ...newJob, description: e })}
                />
              </div>
              <div className='form-group'>
                <Accordion>
                  <label>Tiêu chí đánh giá</label>
                  <Card border='primary'>
                    <Card.Header className='d-flex w-100 p-1'>
                      <Nav.Item className='mr-auto h5 pl-3 pt-2' as={Nav.Item}>
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
                              onClick={deleteAddOnQuestion}
                            ></i>
                          )}
                        </Accordion.Toggle>
                        <Form.Control
                          className='align-self-center mr-0'
                          // value={userInformation.pointList[index]}
                          style={{ width: "50px" }}
                          // onChange={(e) => {
                          //   if (isNaN(e.target.value)) e.target.value = 0;
                          //   if (e.target.value > 10) e.target.value = 10;
                          //   let pointList = userInformation.pointList;
                          //   pointList[index] = e.target.value;
                          //   setUserInformation({
                          //     ...userInformation,
                          //     pointList: pointList,
                          //   });
                          // }}
                          type='number'
                          min='0'
                          max='10'
                        ></Form.Control>
                      </Card.Header>
                      <Accordion.Collapse eventKey={index + 1}>
                        <Card.Body className='border-top'>
                          {question.detail.map((item, index2) => {
                            return (
                              <>
                                <Nav.Item>{item}</Nav.Item>
                              </>
                            );
                          })}
                        </Card.Body>
                      </Accordion.Collapse>
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
                onClick={handleAddJob}
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
