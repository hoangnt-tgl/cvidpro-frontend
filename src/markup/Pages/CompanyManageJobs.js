import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Select from "react-select";
import Header2 from "../Layout/HeaderDepartment";
import Footer from "../Layout/Footer";
import { Modal, Card, Accordion, Form, Nav } from "react-bootstrap";
import CompanySidebar from "../Element/DepartmentSidebar";
import { deleteJobForDepartment } from "../../services/CompanyApi";

import { getDepartmentByKey } from "../../services/DepartmentApi";
import {
  getListSchools,
  getListProvince,
  getListJobTitle,
  getListIndustry,
  getListLevel,
  getListPosition,
  getListEnvironment,
  getAllListMajor,
  getListQuestion,
} from "../../services/GetListService";
import { createJob, getJobForDepartment } from "../../services/JobApi";

function Companymanage(props) {
  let search = props.location.search;
  let params = new URLSearchParams(search);
  let key = params.get("key");
  if (key) {
    localStorage.setItem("key", key);
  }
  key = localStorage.getItem("key");
  const objJob = {
    title: "",
    position: "",
    level: [],
    major: [],
    industry: "",
    location: "",
    workingEnvironment: "",
    experience: "",
    quantity: 0,
    salaryMin: 0,
    salaryMax: 0,
    description: "",
    question: [],
  };
  const initQuestion = {
    name: "",
    detail: [],
    point: 0,
  };
  const [reload, setReload] = useState(false);
  const [newJob, setNewJob] = useState(objJob);
  const [listJob, setListJob] = useState([]);
  const [company, setCompany] = useState(false);
  const [showAddJob, setShowAddJob] = useState(false);
  const [department, setDepartment] = useState({});
  const [levelOptions, setLevelOptions] = useState([]);
  const [provinceOptions, setProvinceOption] = useState([]);
  const [jobTitleOption, setJobTitleOption] = useState([]);
  const [industryOptions, setIndustryOptions] = useState([]);
  const [positionOptions, setPositionOptions] = useState([]);
  const [majorOptions, setMajorOptions] = useState([]);
  const [questionOptions, setQuestionOptions] = useState([]);
  const [newQuestion, setNewQuestion] = useState(initQuestion);
  const [childQuestion, setChildQuestion] = useState("");
  const [environmentOption, setEnvironmentOption] = useState([]);

  const [isShowModal, setIsShowModal] = useState(false);

  //   let key = localStorage.getItem("key");
  useEffect(() => {
    async function fetchData() {
      let departmentInfo = await getDepartmentByKey(key);
      setDepartment(departmentInfo.data);
      console.log(departmentInfo.data);
    }
    fetchData();
  }, [key]);

  useEffect(() => {
   
    if (!department._id) return;
    async function fetchData() {
      let data = await getJobForDepartment(department._id, key);
      setListJob(data.data);
    }
    fetchData();
  }, [reload, department]);

  useEffect(() => {
    getListLevel()
      .then((res) => res.data)
      .then((res) => {
        setLevelOptions(res.map((item) => ({ value: item, label: item })));
      });

    getListProvince()
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
        setProvinceOption(
          res.map((item) => ({
            value: item,
            label: item,
          }))
        );
      });

    getListJobTitle()
      .then((res) => res.data)
      .then((res) => {
        setJobTitleOption(
          res.map((item) => ({
            value: item.name,
            label: item.name,
          }))
        );
      });
    getListPosition()
      .then((res) => res.data)
      .then((res) => {
        setPositionOptions(
          res.map((item) => ({
            value: item.name,
            label: item.name,
          }))
        );
      });

    getListIndustry()
      .then((res) => res.data)
      .then((res) => {
        setIndustryOptions(
          res.map((item) => ({
            value: item.name,
            label: item.name,
          }))
        );
      });

    getAllListMajor()
      .then((res) => res.data)
      .then((res) => {
        setMajorOptions(
          res.map((item) => ({
            value: item,
            label: item,
          }))
        );
      });

    getListEnvironment()
      .then((res) => res.data)
      .then((res) => {
        setEnvironmentOption(
          res.map((item) => ({
            value: item.name,
            label: item.name,
          }))
        );
      });

    getListQuestion()
      .then((res) => res.data)
      .then((res) => {
        setQuestionOptions(res);
        setNewJob({ ...newJob, question: res });
      });
  }, []);

  const handleAddQuestion = async () => {
    let question = newQuestion;
    question.detail.push(childQuestion);
    setNewJob({ ...newJob, question: [...questionOptions, newQuestion] });
    setQuestionOptions([...questionOptions, newQuestion]);
    setChildQuestion("");
    setNewQuestion(initQuestion);
  };

  const handleAddJob = async () => {
    await createJob({
      ...newJob,
      departmentId: department._id,
      companyId: department.companyId,
    });
    setShowAddJob(false);
    setNewJob(objJob);
    setReload(!reload);
  };
  const handleDeleteJob = async (idJob) => {
    await deleteJobForDepartment(key, idJob);
    setReload(!reload);
  };
  function getStatusJob(job) {
    if (job.confirm1.confirmed === -1) return "Không được duyệt";
    if (job.confirm2.confirmed !== 1) return "Đang chờ duyệt";
    if (job.status === 0) return "Dừng tuyển";
    if (job.status === 1) return "Đang tuyển";
  }

  return (
    <>
      <Header2 />
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white p-t50 p-b20">
            <div className="container">
              <div className="m-b30">
                <div className="job-bx browse-job clearfix">
                  <div className="job-bx-title clearfix">
                    <h5 className="font-weight-700 pull-left text-uppercase my-2">
                      Vị trí tuyển dụng{" "}
                      <i
                        className="fa fa-plus text-primary"
                        onClick={() => setShowAddJob(true)}
                      ></i>
                    </h5>
                  </div>

                  <table className="table-job-bx cv-manager company-manage-job">
                    <thead>
                      <tr>
                        <th>Chức danh</th>
                        {/* <th>Chưa có tên</th> */}
                        <th>Trạng thái</th>
                        <th>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listJob?.map((item) => (
                        <tr>
                          <td className="job-name">
                            <Link to={`company/job-detail/${item._id}`} target="_blank">
                              {item.title}
                            </Link>
                            <ul className="job-post-info">
                              {/* <li>
                                  <i className="fa fa-map-marker"></i>{" "}
                                  Sacramento, California
                                </li> */}
                              <li>
                                <i className="fa fa-bookmark-o"></i>{" "}
                                {item.position}
                              </li>
                              {/* <li>
                                  <i className="fa fa-filter"></i> Web Designer
                                </li> */}
                            </ul>
                          </td>
                          {/* <td className="application text-primary">
                              (5) Applications
                            </td> */}
                          <td className="expired pending">
                            {getStatusJob(item)}{" "}
                          </td>
                          <td className="job-links">
                            <Link to={"#"} onClick={() => setCompany(true)}>
                              <i className="fa fa-eye"></i>
                            </Link>
                            <Link
                              to={"#"}
                              onClick={() => handleDeleteJob(item._id)}
                            >
                              <i className="ti-trash"></i>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <Modal
                    show={company}
                    onHide={setCompany}
                    className="modal fade modal-bx-info"
                  >
                    <div className="modal-dialog my-0" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <div className="logo-img">
                            <img
                              alt=""
                              src={require("./../../images/logo/icon2.png")}
                            />
                          </div>
                          <h5 className="modal-title">Company Name</h5>
                          <button
                            type="button"
                            className="close"
                            onClick={() => setCompany(false)}
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <ul>
                            <li>
                              <strong>Job Title :</strong>
                              <p> Web Developer – PHP, HTML, CSS </p>
                            </li>
                            <li>
                              <strong>Experience :</strong>
                              <p>5 Year 3 Months</p>
                            </li>
                            <li>
                              <strong>Deseription :</strong>
                              <p>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry has been the industry's
                                standard dummy text ever since.
                              </p>
                            </li>
                          </ul>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setCompany(false)}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </Modal>

                  {/* Modal tạo vị trí tuyển dụng */}
                  <Modal
                    show={showAddJob}
                    onHide={setShowAddJob}
                    className="modal fade modal-bx-info"
                  >
                    <div className="modal-dialog my-0 w-100" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <div className="logo-img">
                            <img
                              alt=""
                              src={require("./../../images/logo/icon2.png")}
                            />
                          </div>
                          <h5 className="modal-title">Tạo vị trí tuyển dụng</h5>
                          <button
                            type="button"
                            className="close"
                            onClick={() => setShowAddJob(false)}
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div
                          className="modal-body"
                          style={{ maxHeight: "70vh", overflow: "auto" }}
                        >
                          <div className="form-group">
                            <label>Chức danh công việc</label>
                            <Select
                              placeholder="Chọn chức danh công việc"
                              onChange={(e) =>
                                setNewJob({ ...newJob, title: e.label })
                              }
                              options={jobTitleOption}
                            />
                          </div>
                          <div className="form-group">
                            <label>Chức vụ</label>
                            <Select
                              placeholder="Chọn chức vụ"
                              onChange={(e) =>
                                setNewJob({ ...newJob, position: e.label })
                              }
                              options={positionOptions}
                            />
                          </div>
                          <div className="form-group">
                            <label>Cấp bậc</label>
                            <Select
                              isMulti
                              closeMenuOnSelect={false}
                              placeholder="Chọn cấp bậc"
                              onChange={(e) =>
                                setNewJob({
                                  ...newJob,
                                  level: e.map((item) => item.label),
                                })
                              }
                              options={levelOptions}
                            />
                          </div>
                          <div className="form-group">
                            <label for="">Chuyên nghành ứng viên</label>
                            <Select
                              isMulti
                              closeMenuOnSelect={false}
                              placeholder="Chọn chuyên ngành ứng viên"
                              onChange={(e) =>
                                setNewJob({
                                  ...newJob,
                                  major: e.map((item) => item.label),
                                })
                              }
                              options={majorOptions}
                            />
                          </div>
                          <div className="form-group">
                            <label for="">Lĩnh vực kinh doanh</label>
                            <Select
                              placeholder="Chọn lĩnh vực kinh doanh"
                              onChange={(e) =>
                                setNewJob({ ...newJob, industry: e.label })
                              }
                              options={industryOptions}
                            />
                          </div>
                          <div className="form-group">
                            <label for="">Nơi làm việc</label>
                            <Select
                              placeholder="Chọn nơi làm việc"
                              onChange={(e) => {
                                setNewJob({ ...newJob, location: e.label });
                              }}
                              options={provinceOptions}
                            />
                          </div>
                          <div className="form-group">
                            <label for="">Môi trường làm việc</label>
                            <Select
                              placeholder="Chọn môi trường làm việc"
                              onChange={(e) => {
                                setNewJob({
                                  ...newJob,
                                  workingEnvironment: e.label,
                                });
                              }}
                              options={environmentOption}
                            />
                          </div>
                          <div className="form-group">
                            <label for="">Yêu cầu kinh nghiệm</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Nhập yêu cầu kinh nghiệm"
                              value={newJob.experience}
                              onChange={(e) => {
                                setNewJob({
                                  ...newJob,
                                  experience: e.target.value,
                                });
                              }}
                            />
                          </div>
                          <div className="form-group">
                            <label for="">Số lượng</label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Nhập số lượng"
                              value={newJob.quantity}
                              min="1"
                              onChange={(e) => {
                                setNewJob({
                                  ...newJob,
                                  quantity: e.target.value,
                                });
                              }}
                            />
                          </div>

                          <div className="form-group">
                            <label for="">Mức lương tối thiểu</label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Nhập mức lương tối thiểu"
                              value={newJob.salaryMin}
                              onChange={(e) => {
                                setNewJob({
                                  ...newJob,
                                  salaryMin: e.target.value,
                                });
                              }}
                            />
                          </div>
                          <div className="form-group">
                            <label for="">Mức lương tối đa</label>
                            <input
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
                            />
                          </div>
                          <div className="form-group">
                            <label for="">Mô tả công việc</label>
                            <ReactQuill
                              theme="snow"
                              value={newJob.description}
                              onChange={(e) =>
                                setNewJob({ ...newJob, description: e })
                              }
                            />
                          </div>
                          <div className="form-group">
                            <Accordion>
                              <label>Tiêu chí đánh giá</label>
                              <Card border="primary">
                                <Card.Header className="d-flex w-100 p-1">
                                  <Nav.Item
                                    className="mr-auto h5 pl-3 pt-2"
                                    as={Nav.Item}
                                  >
                                    Tiêu chí đánh giá đề xuất
                                  </Nav.Item>
                                  <Nav.Item
                                    className="align-self-center"
                                    style={{ width: "50px" }}
                                  >
                                    Điểm
                                  </Nav.Item>
                                </Card.Header>
                              </Card>
                              {questionOptions?.map((question, index) => (
                                <Card border="primary">
                                  <Card.Header className="d-flex w-100 p-1">
                                    <Accordion.Toggle
                                      as={Nav.Link}
                                      eventKey={index + 1}
                                      className="mr-auto"
                                    >
                                      {index + 1 + ". " + question.name}{" "}
                                      <i className="fa fa-question-circle ms-0"></i>
                                      {/* trash */}
                                      {index >= 15 && (
                                        <i
                                          className="fa fa-trash ml-2 text-red"
                                          onClick={() => {
                                            let newQuestionOptions =
                                              questionOptions;
                                            newQuestionOptions.splice(index, 1);
                                            setQuestionOptions(
                                              newQuestionOptions
                                            );
                                          }}
                                        ></i>
                                      )}
                                    </Accordion.Toggle>
                                    <Form.Control
                                      className="align-self-center mr-0"
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
                                      type="number"
                                      min="0"
                                      max="10"
                                    ></Form.Control>
                                  </Card.Header>
                                  <Accordion.Collapse eventKey={index + 1}>
                                    <Card.Body className="border-top">
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
                              className="btn btn-primary mt-2"
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
                        <div className="modal-footer">
                          <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={handleAddJob}
                          >
                            Lưu
                          </button>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setShowAddJob(false)}
                          >
                            Hủy
                          </button>
                        </div>
                      </div>
                    </div>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Modal
        show={isShowModal}
        onHide={() => setIsShowModal(false)}
        className="modal fade modal-bx-info"
      >
        <Modal.Header closeButton>
          <Modal.Title>Thêm tiêu chí đánh giá</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label for="">Tên tiêu chí</label>
            <input
              type="text"
              className="form-control" //form-control-sm
              value={newQuestion.name}
              onChange={(e) => {
                setNewQuestion({ ...newQuestion, name: e.target.value });
              }}
            />
          </div>
          <div className="form-group">
            <label for="">Tiêu chí con</label>
            {newQuestion.detail.map((item, index) => {
              return (
                <>
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={item}
                  />
                </>
              );
            })}
            <input
              type="text"
              className="form-control"
              value={childQuestion}
              onChange={(e) => setChildQuestion(e.target.value)}
            />
            <button
              className="btn btn-primary mt-2"
              onClick={() => {
                if (childQuestion === "") return;
                setNewQuestion({
                  ...newQuestion,
                  detail: [...newQuestion.detail, childQuestion],
                });
                setChildQuestion("");
              }}
            >
              Thêm tiêu chí con
            </button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAddQuestion}
          >
            Lưu
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setIsShowModal(false)}
          >
            Hủy
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Companymanage;
