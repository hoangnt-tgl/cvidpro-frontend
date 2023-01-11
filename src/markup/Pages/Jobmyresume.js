import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./../Layout/Header";
import Footer from "./../Layout/Footer";
import swal from "sweetalert";
import {
  Modal,
  Button,
  Accordion,
  Form,
  Nav,
  Card,
  InputGroup,
  FormControl,
  Col,
} from "react-bootstrap";
import Select from "react-select";
import {
  getMyResume,
  addSchool,
  deleteSchool,
  sendOTP,
  confirmPhone,
  addShortTraining,
  deleteShortTraining,
  addWorkExperience,
  deleteWorkExperience
} from "../../services/EmployeeApi";
import {
  getSortTime,
  formatTimeInput,
  getMonthYear,
} from "../../services/TimeService";
import Listingsidebar from "./../Element/Listingsidebar";
import {
  getListLevel,
  getListSchools,
  getAllListMajor,
  getListQuestion,
  getListJobTitle,
} from "../../services/GetListService";
var bnr2 = require("./../../images/banner/bnr1.jpg");
var bnr = require("./../../images/background/bg3.jpg");
function Jobmyresume(props) {
  const objSchool = {
    school: "",
    major: "",
    level: "",
    start: "",
    end: "",
    jobTitle: "",
  };
  const objShortTraining = {
    start: "",
    end: "",
    organization: "",
    certificate: "",
  };
  const objWork = {
    company: "",
    address: "",
    process: [],
    start: "",
    end: "",
    leaving: "",
  };
  const objProcess = {
    jobTitle: "",
    from: "",
    to: "",
    isCurrent: false,
    major: "",
    address: "",
    result: "",
    workDescription: "",
  };

  // option lý do nghỉ việc
  const listLeaving = [
    { value: "Nghỉ theo mong muốn", label: "Nghỉ theo mong muốn" },
    { value: "Nghỉ theo yêu cầu", label: "Nghỉ theo yêu cầu" },
    { value: "Tự nghỉ", label: "Tự nghỉ" },
  ];

  const resultOption = [
    { value: "Trên mức đề ra", label: "Trên mức đề ra" },
    { value: "Đạt mức đề ra", label: "Đạt mức đề ra" },
    { value: "Dưới mức đề ra", label: "Dưới mức đề ra" },
  ];

  const getValueSelect = (value) => {
    return value ? { label: value, value: value } : "";
  };
  const [userInformation, setUserInformation] = useState({});
  const [reload, setReload] = useState(false);
  const [levels, setLevels] = useState([]);
  const [majors, setMajors] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [jobTitleOption, setJobTitleOption] = useState([]);
  const [listProvince, setListProvince] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [listWard, setListWard] = useState([]);
  const [newSchool, setNewSchool] = useState(objSchool);
  const [newWork, setNewWork] = useState(objWork);
  const [newProcess, setNewProcess] = useState(objProcess);

  const [newShortTraining, setNewShortTraining] = useState(objShortTraining);

  const [schools, setSchools] = useState([]);
  const [basicdetails, setBasicDetails] = useState(false);
  const [resume, setResume] = useState(false);
  const [education, setEducation] = useState(false);
  const [showModalConfirmPhone, setShowModalConfirmPhone] = useState(false);
  const [showShortTraining, setShowShortTraining] = useState(false);
  const [itskills, setItSkills] = useState(false);
  const [otherSkill, setOtherSkill] = useState(false);

  const [countDown, setCountDown] = useState(60);
  const [otp, setOtp] = useState("");
  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchData() {
      let listLevel = await getListLevel();
      setLevels(listLevel.data.map((item) => ({ value: item, label: item })));
      let listSchool = await getListSchools();
      setSchools(
        listSchool.data.map((item) => ({ value: item._id, label: item.name }))
      );
      let listMajor = await getAllListMajor();
      setMajors(listMajor.data.map((item) => ({ value: item, label: item })));
      let listQuestion = await getListQuestion();
      setQuestions(listQuestion.data);

      let listJobTitle = await getListJobTitle();
      setJobTitleOption(
        listJobTitle.data.map((item) => ({
          value: item.name,
          label: item.name,
        }))
      );
    }
    fetchData();
  }, []);
  useEffect(() => {
    async function fetchData() {
      const response = await getMyResume(props.history);
      console.log(response);
      setUserInformation(response);
    }
    fetchData();
  }, [reload]);
  function handleSendOTP() {
    let timeWait = 10;
    sendOTP(userInformation._id, userInformation.username).then((res) => {
      if (res) {
        setShowModalConfirmPhone(true);
        setCountDown(timeWait);
        let interval = setInterval(() => {
          timeWait -= 1;
          setCountDown(timeWait);
          if (timeWait === 0) {
            clearInterval(interval);
          }
        }, 1000);
      }
    });
  }
  function handleConfirmPhone() {
    confirmPhone(userInformation._id, otp).then((res) => {
      if (res) {
        setShowModalConfirmPhone(false);
        setReload(!reload);
      }
    });
  }
  const uploadAvatar = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64 = reader.result;
      setUserInformation({ ...userInformation, avatar: base64 });
    };
  };
  const handleAddSchool = async () => {
    await addSchool(userInformation._id, newSchool);
    setNewSchool(objSchool);
    setEducation(false);
    setReload(!reload);
  };
  const handleDeleteSchool = async (id) => {
    await deleteSchool(userInformation._id, id);
    setReload(!reload);
  };

  const handleAddShortTraining = async () => {
    console.log(newShortTraining);
    await addShortTraining(userInformation._id, newShortTraining);
    setShowShortTraining(false);
    setNewShortTraining(objShortTraining);
    setReload(!reload);
  };
  const handleDeleteShortTraining = async (id) => {
    console.log(id);
    await deleteShortTraining(userInformation._id, id);
    setReload(!reload);
  };

  const handleAddProcess = async (e) => {
    let listProcess = newWork.process;
    if (
      newWork.process.length > 0 &&
      newWork.process[newWork.process.length - 1].isCurrent === true
    ) {
      swal("Alert!", "Thời gian đã đến hiện tại", "error");
    }
    listProcess.push(newProcess);
    setNewWork({ ...newWork, process: listProcess });
    setNewProcess({ ...objProcess, from: newProcess.to });
  };

  const handleDeleteProcess = async (index) => {};

  const handleAddWorkExperience = async () => {
    await addWorkExperience(userInformation._id, newWork);
    setNewWork(objWork);
    setResume(false);
    setNewProcess(objProcess);
    setReload(!reload);
  };
  const handleDeleteWorkExperience = async (id) => {
    await deleteWorkExperience(userInformation._id, id);
    setReload(!reload);
  };
  return (
    <>
      <Header />
      <div className="page-content">
        <div
          className="overlay-black-dark profile-edit p-t50 p-b20"
          style={{ backgroundImage: "url(" + bnr + ")" }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-7 candidate-info">
                <div className="candidate-detail">
                  <div className="canditate-des text-center">
                    <Link to={"#"}>
                      <img alt="" src={`${userInformation.avatar}`} />
                    </Link>
                    <div
                      className="upload-link"
                      title="update"
                      data-toggle="tooltip"
                      data-placement="right"
                    >
                      <input
                        type="file"
                        className="update-flie"
                        accept="image/*"
                        onChange={uploadAvatar}
                      />
                      <i className="fa fa-camera"></i>
                    </div>
                  </div>
                  <div className="text-white browse-job text-left">
                    <h4 className="m-b0">
                      {userInformation?.name}
                      <Link
                        to={"#"}
                        onClick={() => setBasicDetails(true)}
                        className="m-l15 font-16 text-white"
                      >
                        <i className="fa fa-pencil"></i>
                      </Link>
                    </h4>
                    <p className="m-b15">{userInformation.jobTitle}</p>
                    <ul className="clearfix">
                      <li>
                        <i className="ti-calendar"></i>{" "}
                        {getSortTime(userInformation.birthday)}
                      </li>
                      <li>
                        <i className="ti-user"></i> {userInformation.gender}
                      </li>
                      <li>
                        <i className="ti-mobile"></i> {userInformation.username}
                      </li>
                      <li>
                        <i className="ti-agenda"></i> {userInformation.level}
                      </li>
                      <li className="w-100">
                        <i className="ti-briefcase"></i>{" "}
                        {userInformation.school}
                      </li>
                      <br />
                      <li className="w-100">
                        <i className="ti-id-badge"></i> {userInformation.major}
                      </li>
                      <br />
                      <li className="w-100">
                        <i className="ti-location-pin"></i>{" "}
                        {userInformation.address +
                          ", " +
                          userInformation.ward +
                          ", " +
                          userInformation.district +
                          ", " +
                          userInformation.province}
                      </li>
                      <li className="w-100">
                        <i className="ti-email"></i> {userInformation.email}
                      </li>
                    </ul>
                    <div className="progress-box m-t10">
                      <div className="progress-info">
                        Điểm CV:<span>{userInformation.points}</span>
                      </div>
                      <div className="progress">
                        <div
                          className="progress-bar bg-primary"
                          style={{ width: userInformation.points * 10 + "%" }}
                          role="progressbar"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-5">
                <Link to={"#"}>
                  <div className="pending-info text-white p-a25">
                    <h5>Trạng thái CVID</h5>
                    <ul className="list-check secondry">
                      {userInformation.confirmEmail && (
                        <li>Đã xác thực E-mail</li>
                      )}
                      {userInformation.confirmPhone ? (
                        <>
                          {" "}
                          <li>Đã xác thực số điện thoại</li>
                          {userInformation.confirm1?.confirmed === -1 ? (
                            <li>CV không được duyệt</li>
                          ) : userInformation.confirm2?.confirmed === 0 ? (
                            <li>CV đang chờ duyệt</li>
                          ) : (
                            <li>CV đã được duyệt</li>
                          )}
                        </>
                      ) : (
                        <li onClick={handleSendOTP}>
                          Chưa xác thực số điện thoại
                        </li>
                      )}
                    </ul>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <Modal
            className="modal fade browse-job modal-bx-info editor"
            show={showModalConfirmPhone}
            onHide={() => setShowModalConfirmPhone(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Xác thực số điện thoại</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="form-group">
                <label htmlFor="phone">Số điện thoại</label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  placeholder="Nhập số điện thoại"
                  value={userInformation.username}
                  disabled
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Nhập mã xác thực"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={handleSendOTP}
                    disabled={countDown !== 0}
                  >
                    {countDown === 0 ? "Gửi lại" : "00 : " + countDown}
                  </button>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowModalConfirmPhone(false)}
              >
                Đóng
              </Button>
              <Button
                variant="primary"
                disabled={otp.length !== 6}
                onClick={handleConfirmPhone}
              >
                Xác thực
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal
            className="modal fade browse-job modal-bx-info editor"
            show={basicdetails}
            onHide={setBasicDetails}
          >
            <div className="modal-dialog my-0" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="ProfilenameModalLongTitle">
                    Thông tin cơ bản
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setBasicDetails(false)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        <div className="form-group">
                          <label>Họ và tên</label>
                          <input
                            type="text"
                            value={userInformation.name}
                            className="form-control"
                            placeholder="Nhập họ và tên"
                            onChange={(e) => {
                              setUserInformation({
                                ...userInformation,
                                name: e.target.value,
                              });
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12">
                        <div className="form-group">
                          <label className="m-b0">Giới tính</label>
                          <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                              <div
                                className="custom-control custom-radio"
                                onClick={() => {
                                  setUserInformation({
                                    ...userInformation,
                                    gender: "Nam",
                                  });
                                }}
                              >
                                <input
                                  type="radio"
                                  className="custom-control-input"
                                  checked={userInformation.gender === "Nam"}
                                />
                                <label className="custom-control-label">
                                  Nam
                                </label>
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                              <div
                                className="custom-control custom-radio"
                                onClick={() => {
                                  setUserInformation({
                                    ...userInformation,
                                    gender: "Nữ",
                                  });
                                }}
                              >
                                <input
                                  type="radio"
                                  className="custom-control-input"
                                  checked={userInformation.gender === "Nữ"}
                                />
                                <label className="custom-control-label">
                                  Nữ
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12">
                        <div className="form-group">
                          <label>Số điện thoại</label>
                          <input
                            type="text"
                            value={userInformation.username}
                            className="form-control"
                            placeholder="Nhập số điện thoại"
                            onChange={(e) => {
                              setUserInformation({
                                ...userInformation,
                                username: e.target.value,
                              });
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12">
                        <div className="form-group">
                          <label>Ngày sinh</label>
                          <input
                            type="date"
                            value={formatTimeInput(userInformation.birthday)}
                            className="form-control"
                            placeholder="YYYY-MM-DD"
                            onChange={(e) => {
                              setUserInformation({
                                ...userInformation,
                                birthday: e.target.value,
                              });
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12">
                        <div className="form-group">
                          <label>Email Address</label>
                          <h6 className="m-a0 font-14">
                            {userInformation.email}
                          </h6>
                          <Link to={"#"}>Change Email Address</Link>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="site-button"
                    onClick={() => setBasicDetails(false)}
                  >
                    Cancel
                  </button>
                  <button type="button" className="site-button">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        </div>
        <div className="content-block">
          <div className="section-full browse-job content-inner-2">
            <div className="container">
              <div className="row">
                <div className="col-xl-3 col-lg-4 col-md-4 col-sm-12 m-b30">
                  <Listingsidebar />
                </div>
                <div className="col-xl-9 col-lg-8 col-md-8 col-sm-12">
                  <div
                    id="resume_headline_bx"
                    className=" job-bx bg-white table-job-bx m-b30"
                  >
                    <div className="d-flex">
                      <h5 className="m-b15">Kinh nghiệm làm việc</h5>
                      <Link
                        to={"#"}
                        className="site-button add-btn button-sm"
                        onClick={() => setResume(true)}
                      >
                        <i className="fa fa-pencil m-r5"></i> Thêm
                      </Link>
                    </div>
                    <p className="m-b0">Job board currently living in USA</p>
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        {userInformation.workExperience?.map((item, index) => {
                          return (
                            <>
                              <hr />
                              <div className="clearfix m-b20">
                                <div className="badge-time">
                                  <span className="badge badge-primary">
                                    <i className="fa fa-suitcase" />
                                    <span>
                                      {" " + getMonthYear(item.start)} -{" "}
                                      {item.process.slice(-1)[0].isCurrent
                                        ? "Hiện tại"
                                        : getMonthYear(item.end)}
                                    </span>
                                  </span>
                                </div>
                                <div className="d-flex">
                                  <label className="m-b0 font-20">
                                    {item.company}
                                  </label>
                                  <Link
                                    to={"#"}
                                    onClick={() => handleDeleteWorkExperience(item._id)}
                                    className="site-button add-btn button-sm"
                                    style={{ backgroundColor: "red" }}
                                  >
                                    <i className="ti-trash m-r5"></i>
                                  </Link>
                                </div>
                                <p className="m-b0 font-16">
                                  Địa chỉ: {item.address}
                                </p>
                                <label className="m-b0 font-16">
                                  Quá trình làm việc
                                </label>
                                {item.process.map((item, index) => {
                                  return (
                                    <div className="pl-4">
                                      <div className="badge-time">
                                        <span className="badge badge-primary">
                                          <i className="fa fa-clock-o" />
                                          <span>
                                            {" " + getMonthYear(item.from)} -{" "}
                                            {item.isCurrent
                                              ? "Hiện tại"
                                              : getMonthYear(item.to)}
                                          </span>
                                        </span>
                                      </div>
                                      <p className="m-b0 font-16">
                                        Công việc: {item.workDescription}
                                      </p>
                                      <p className="m-b0 font-16">
                                        Chuyên nghành: {item.major}
                                      </p>
                                      
                                      <p className="m-b0 font-16">
                                        Chức danh: {item.jobTitle}
                                      </p>
                                      <p className="m-b0 font-16">
                                        Địa chỉ: {item.address}
                                      </p>
                                      <p className="m-b0 font-16">
                                        Kết quả: {item.result}
                                      </p>
                                     
                                    </div>
                                  );
                                })}
                                <p className="m-b0 font-16">
                                  {item.process.slice(-1)[0].isCurrent
                                    ? ""
                                    : "Nghỉ việc: " + item.leaving}
                                </p>
                              </div>
                            </>
                          );
                        })}
                      </div>
                    </div>
                    <Accordion>
                      <Card border="primary">
                        <Card.Header className="d-flex w-100 py-1">
                          <Nav.Item className="mr-auto h4 fw" as={Nav.Item}>
                            Tiêu chí và kết quả đánh giá
                          </Nav.Item>
                          <Nav.Item
                            className="align-self-center"
                            style={{ width: "50px" }}
                          >
                            Điểm
                          </Nav.Item>
                        </Card.Header>
                      </Card>
                      {questions.map((question, index) => {
                        return (
                          <Card border="primary">
                            <Card.Header className="d-flex w-100 py-1">
                              <Accordion.Toggle
                                as={Nav.Link}
                                eventKey={index + 1}
                                className="mr-auto"
                              >
                                {index + 1 + ". " + question.name}{" "}
                                <i className="fa fa-question-circle ms-0"></i>
                              </Accordion.Toggle>
                              <Form.Control
                                className="align-self-center mr-0"
                                style={{ width: "50px" }}
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
                        );
                      })}
                    </Accordion>
                    <Modal
                      show={resume}
                      onHide={setResume}
                      className="modal fade modal-bx-info editor"
                    >
                      <div className="modal-dialog m-0" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5
                              className="modal-title"
                              id="ResumeheadlineModalLongTitle"
                            >
                              Kinh nghiệm làm việc
                            </h5>
                            <button
                              type="button"
                              className="close"
                              onClick={() => setResume(false)}
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div
                            className="modal-body"
                            style={{ overflow: "auto", maxHeight: "70vh" }}
                          >
                            <form
                              id="addCompanyInfo"
                              onSubmit={() => console.log("submit")}
                              action="javascript:void(0);"
                            >
                              <div className="row">
                                <div className="col-lg-12 col-md-12"></div>
                              </div>
                            </form>

                            <form
                              id="addWorkExperience"
                              action="javascript:void(0);"
                            >
                              <div className="row">
                                <div className="col-lg-12 col-md-12"></div>
                                <Card className="w-100 mx-3">
                                  <Card.Header className="">
                                    <InputGroup size="sm" className="mb-2">
                                      <InputGroup.Prepend>
                                        <InputGroup.Text>
                                          Nơi làm việc
                                        </InputGroup.Text>
                                      </InputGroup.Prepend>
                                      <FormControl
                                        value={newWork.company}
                                        onChange={(e) =>
                                          setNewWork({
                                            ...newWork,
                                            company: e.target.value,
                                          })
                                        }
                                      />
                                    </InputGroup>
                                    <InputGroup size="sm">
                                      <InputGroup.Prepend>
                                        <InputGroup.Text>
                                          Địa chỉ
                                        </InputGroup.Text>
                                      </InputGroup.Prepend>
                                      <FormControl
                                        value={newWork.address}
                                        onChange={(e) =>
                                          setNewWork({
                                            ...newWork,
                                            address: e.target.value,
                                          })
                                        }
                                      />
                                    </InputGroup>
                                  </Card.Header>
                                  <Card.Body>
                                    <Card.Title className="text-center">
                                      Quá trình làm việc
                                    </Card.Title>
                                    {newWork.process.map((item, index) => {
                                      return (
                                        <form>
                                          <Form.Row>
                                            <Col sm={6}>
                                              <InputGroup
                                                size="sm"
                                                className="mb-2"
                                              >
                                                <InputGroup.Prepend>
                                                  <InputGroup.Text>
                                                    Từ
                                                  </InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <FormControl
                                                  required
                                                  type="date"
                                                  value={item.from}
                                                />
                                              </InputGroup>
                                            </Col>
                                            <Col>
                                              <InputGroup
                                                size="sm"
                                                className="mb-2"
                                              >
                                                <InputGroup.Prepend>
                                                  <InputGroup.Text>
                                                    Đến
                                                  </InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <FormControl
                                                  required
                                                  type="date"
                                                  value={item.to}
                                                />
                                              </InputGroup>
                                            </Col>
                                          </Form.Row>
                                          <Form.Group
                                            className="mb-2"
                                            controlId="isWorking"
                                          >
                                            <Form.Check
                                              type="checkbox"
                                              label="Đang làm việc tại đây"
                                              checked={item.isCurrent}
                                            />
                                          </Form.Group>

                                          <InputGroup
                                            size="sm"
                                            className="mb-2"
                                          >
                                            <InputGroup.Prepend className="w-100">
                                              <InputGroup.Text className="w-100">
                                                Công việc
                                              </InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl
                                              required
                                              value={item.workDescription}
                                            />
                                          </InputGroup>
                                          <InputGroup
                                            size="sm"
                                            className="mb-2"
                                          >
                                            <InputGroup.Prepend className="w-100">
                                              <InputGroup.Text className="w-100">
                                                Chuyên nghành
                                              </InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl value={item.major} />
                                          </InputGroup>
                                          <InputGroup
                                            size="sm"
                                            className="mb-2"
                                          >
                                            <InputGroup.Prepend className="w-100">
                                              <InputGroup.Text className="w-100">
                                                Chức danh công việc
                                              </InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl
                                              value={item.jobTitle}
                                            />
                                          </InputGroup>
                                          <InputGroup
                                            size="sm"
                                            className="mb-2"
                                          >
                                            <InputGroup.Prepend className="w-100">
                                              <InputGroup.Text className="w-100">
                                                Địa chỉ
                                              </InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl value={item.address} />
                                          </InputGroup>
                                          <InputGroup
                                            size="sm"
                                            className="mb-2"
                                          >
                                            <InputGroup.Prepend className="w-100">
                                              <InputGroup.Text className="w-100">
                                                Kết quả hoàn thành
                                              </InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl value={item.result} />
                                          </InputGroup>
                                        </form>
                                      );
                                    })}
                                    <form
                                      id="addProcessInCompany"
                                      onSubmit={handleAddProcess}
                                      action="javascript:void(0);"
                                    >
                                      <Form.Row>
                                        <Col sm={6}>
                                          <InputGroup
                                            size="sm"
                                            className="mb-2"
                                          >
                                            <InputGroup.Prepend>
                                              <InputGroup.Text>
                                                Từ
                                              </InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl
                                              required
                                              type="date"
                                              value={newProcess.from}
                                              onChange={(e) => {
                                                setNewProcess({
                                                  ...newProcess,
                                                  from: e.target.value,
                                                });
                                              }}
                                            />
                                          </InputGroup>
                                        </Col>
                                        <Col>
                                          <InputGroup
                                            size="sm"
                                            className="mb-2"
                                          >
                                            <InputGroup.Prepend>
                                              <InputGroup.Text>
                                                Đến
                                              </InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl
                                              required
                                              type="date"
                                              disabled={newProcess.isCurrent}
                                              value={newProcess.to}
                                              onChange={(e) => {
                                                setNewProcess({
                                                  ...newProcess,
                                                  to: e.target.value,
                                                });
                                              }}
                                            />
                                          </InputGroup>
                                        </Col>
                                      </Form.Row>
                                      <Form.Group className="mb-2">
                                        <Form.Check
                                          type="checkbox"
                                          label="Đang làm việc tại đây"
                                          checked={newProcess.isCurrent}
                                          onChange={(e) => {
                                            setNewProcess({
                                              ...newProcess,
                                              isCurrent: e.target.checked,
                                              to: "",
                                            });
                                          }}
                                        />
                                      </Form.Group>

                                      <InputGroup size="sm" className="mb-2">
                                        <InputGroup.Prepend className="w-100">
                                          <InputGroup.Text className="w-100">
                                            Công việc
                                          </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                          required
                                          value={newProcess.workDescription}
                                          onChange={(e) => {
                                            setNewProcess({
                                              ...newProcess,
                                              workDescription: e.target.value,
                                            });
                                          }}
                                        />
                                      </InputGroup>
                                      <InputGroup size="sm" className="mb-2">
                                        <InputGroup.Prepend className="w-100">
                                          <InputGroup.Text className="w-100">
                                            Chuyên nghành
                                          </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                          required
                                          as={Select}
                                          size="sm"
                                          className="p-0"
                                          value={getValueSelect(
                                            newProcess.major
                                          )}
                                          placeholder="Chọn chuyên nghành"
                                          onChange={(e) =>
                                            setNewProcess((prev) => ({
                                              ...prev,
                                              major: e.value,
                                            }))
                                          }
                                          options={majors}
                                        />
                                      </InputGroup>
                                      <InputGroup size="sm" className="mb-2">
                                        <InputGroup.Prepend className="w-100">
                                          <InputGroup.Text className="w-100">
                                            Chức danh công việc
                                          </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                          required
                                          as={Select}
                                          size="sm"
                                          className="p-0"
                                          value={getValueSelect(
                                            newProcess.jobTitle
                                          )}
                                          placeholder="Chọn chức danh"
                                          onChange={(e) =>
                                            setNewProcess((prev) => ({
                                              ...prev,
                                              jobTitle: e.value,
                                            }))
                                          }
                                          options={jobTitleOption}
                                        />
                                      </InputGroup>
                                      <InputGroup size="sm" className="mb-2">
                                        <InputGroup.Prepend className="w-100">
                                          <InputGroup.Text className="w-100">
                                            Địa chỉ
                                          </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                          required
                                          value={newProcess.address}
                                          onChange={(e) => {
                                            setNewProcess({
                                              ...newProcess,
                                              address: e.target.value,
                                            });
                                          }}
                                        />
                                      </InputGroup>
                                      <InputGroup size="sm" className="mb-2">
                                        <InputGroup.Prepend className="w-100">
                                          <InputGroup.Text className="w-100">
                                            Kết quả hoàn thành
                                          </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                          required
                                          as={Select}
                                          size="sm"
                                          className="p-0"
                                          value={getValueSelect(
                                            newProcess.result
                                          )}
                                          placeholder="Chọn mức hoàn thành"
                                          onChange={(e) =>
                                            setNewProcess((prev) => ({
                                              ...prev,
                                              result: e.value,
                                            }))
                                          }
                                          options={resultOption}
                                        />
                                      </InputGroup>
                                      <Button
                                        type="submit"
                                        form="addProcessInCompany"
                                        className="float-right"
                                      >
                                        Thêm quá trình làm việc
                                      </Button>
                                    </form>
                                  </Card.Body>

                                  <Card.Footer className="">
                                    <InputGroup size="sm">
                                      <InputGroup.Prepend>
                                        <InputGroup.Text>
                                          Nghỉ việc
                                        </InputGroup.Text>
                                      </InputGroup.Prepend>
                                      <FormControl
                                        as={Select}
                                        size="sm"
                                        className="p-0"
                                        options={listLeaving}
                                        value={getValueSelect(newWork.leaving)}
                                        onChange={(e) => {
                                          setNewWork({
                                            ...newWork,
                                            leaving: e.label,
                                          });
                                        }}
                                      ></FormControl>
                                    </InputGroup>
                                  </Card.Footer>
                                </Card>
                              </div>
                            </form>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="site-button"
                              onClick={() => setResume(false)}
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="site-button"
                              onClick={handleAddWorkExperience}
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </Modal>
                  </div>
                  <div id="education_bx" className="job-bx bg-white m-b30">
                    <div className="d-flex">
                      <h5 className="m-b15">Quá trình học tập</h5>
                      <Link
                        to={"#"}
                        onClick={() => setEducation(true)}
                        className="site-button add-btn button-sm"
                      >
                        <i className="fa fa-pencil m-r5"></i> Thêm
                      </Link>
                    </div>
                    <p>
                      Mention your employment details including your current and
                      previous company work experience
                    </p>
                    <Modal
                      className="modal fade modal-bx-info editor"
                      show={education}
                      onHide={setEducation}
                    >
                      <div className="modal-dialog my-0" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5
                              className="modal-title"
                              id="EducationModalLongTitle"
                            >
                              Quá trình học tập
                            </h5>
                            <button
                              type="button"
                              className="close"
                              onClick={() => setEducation(false)}
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <form>
                              <div className="row">
                                <div className="col-lg-6 col-md-6">
                                  <div className="form-group">
                                    <label>Từ</label>
                                    <input
                                      type="month"
                                      className="form-control"
                                      onChange={(e) => {
                                        setNewSchool({
                                          ...newSchool,
                                          start: e.target.value,
                                        });
                                      }}
                                      required
                                    ></input>
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                  <div className="form-group">
                                    <label>Đến</label>
                                    <input
                                      type="month"
                                      className="form-control"
                                      onChange={(e) => {
                                        setNewSchool({
                                          ...newSchool,
                                          end: e.target.value,
                                        });
                                      }}
                                    ></input>
                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                  <div className="form-group">
                                    <label>Cấp bậc</label>
                                    <Select
                                      placeholder="Chọn cấp bậc"
                                      onChange={(e) =>
                                        setNewSchool((prev) => ({
                                          ...prev,
                                          level: e.value,
                                        }))
                                      }
                                      options={levels}
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                  <div className="form-group">
                                    <label>Trường</label>
                                    <Select
                                      placeholder="Chọn trường"
                                      onChange={(e) =>
                                        setNewSchool((prev) => ({
                                          ...prev,
                                          school: e.label,
                                        }))
                                      }
                                      options={schools}
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                  <div className="form-group">
                                    <label>Chuyên nghành</label>
                                    <Select
                                      placeholder="Chọn chuyên nghành"
                                      onChange={(e) =>
                                        setNewSchool((prev) => ({
                                          ...prev,
                                          major: e.value,
                                        }))
                                      }
                                      options={majors}
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                  <div className="form-group">
                                    <label>Chức danh chuyên môn</label>
                                    <input
                                      className="form-control"
                                      required
                                      placeholder="Nhập chức danh chuyên môn"
                                      onChange={(e) =>
                                        setNewSchool({
                                          ...newSchool,
                                          jobTitle: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="site-button"
                              onClick={() => setEducation(false)}
                            >
                              Cancel
                            </button>
                            <button
                              className="site-button btn"
                              disabled={
                                !newSchool.school ||
                                !newSchool.level ||
                                !newSchool.major ||
                                !newSchool.jobTitle
                              }
                              onClick={handleAddSchool}
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </Modal>
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="clearfix m-b20">
                          {/* badge time */}
                          <div className="badge-time">
                            <span className="badge badge-primary">
                              <i className="fa fa-graduation-cap" />
                              <span>
                                {getMonthYear(userInformation.startYear)} -{" "}
                                {getMonthYear(userInformation.endYear)}
                              </span>
                            </span>
                          </div>
                          <div className="d-flex">
                            <label className="m-b0">
                              {userInformation.school}
                            </label>
                          </div>
                          <p className="m-b0 font-16">
                            Cấp bậc: {userInformation.level}
                          </p>
                          <p className="m-b0 font-16">
                            Chuyên nghành: {userInformation.major}
                          </p>
                        </div>
                        {userInformation.skillEducation?.map((item, index) => {
                          return (
                            <>
                              <hr />
                              <div className="clearfix m-b20">
                                <div className="badge-time">
                                  <span className="badge badge-primary">
                                    <i className="fa fa-graduation-cap" />
                                    <span>
                                      {getMonthYear(item.start)} -{" "}
                                      {getMonthYear(item.end)}
                                    </span>
                                  </span>
                                </div>
                                <div className="d-flex">
                                  <label className="m-b0">{item.school}</label>
                                  <Link
                                    to={"#"}
                                    onClick={() => handleDeleteSchool(item._id)}
                                    className="site-button add-btn button-sm"
                                    style={{ backgroundColor: "red" }}
                                  >
                                    <i className="ti-trash m-r5"></i>
                                  </Link>
                                </div>
                                <p className="m-b0 font-16">
                                  Cấp bậc: {item.level}
                                </p>
                                <p className="m-b0 font-16">
                                  Chuyên nghành: {item.major}
                                </p>
                                <p className="m-b0 font-16">
                                  Chức danh: {item.jobTitle}
                                </p>
                              </div>
                            </>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div
                    id="it_skills_bx"
                    className="job-bx table-job-bx bg-white m-b30"
                  >
                    <div className="d-flex">
                      <h5 className="m-b15">Khóa đào tạo ngắn hạn</h5>
                      <Link
                        to={"#"}
                        onClick={() => setShowShortTraining(true)}
                        className="site-button add-btn button-sm"
                      >
                        <i className="fa fa-pencil m-r5"></i> Thêm
                      </Link>
                    </div>
                    <p>
                      Mention your employment details including your current and
                      previous company work experience
                    </p>
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        {userInformation.shortTraining?.map((item, index) => {
                          return (
                            <>
                              <div className="clearfix m-b20">
                                <div className="badge-time">
                                  <span className="badge badge-primary">
                                    <i className="fa fa-graduation-cap" />
                                    <span>
                                      {getMonthYear(item.start)} -{" "}
                                      {getMonthYear(item.end)}
                                    </span>
                                  </span>
                                </div>
                                <div className="d-flex">
                                  <label className="m-b0">
                                    {item.certificate}
                                  </label>
                                  <Link
                                    to={"#"}
                                    onClick={() =>
                                      handleDeleteShortTraining(item._id)
                                    }
                                    className="site-button add-btn button-sm"
                                    style={{ backgroundColor: "red" }}
                                  >
                                    <i className="ti-trash m-r5"></i>
                                  </Link>
                                </div>
                                <p className="m-b0 font-16">
                                  Đơn vị tổ chức: {item.organizer}
                                </p>
                              </div>
                              <hr />
                            </>
                          );
                        })}
                      </div>
                    </div>
                    <Modal
                      className="modal fade modal-bx-info editor"
                      show={showShortTraining}
                      onHide={setShowShortTraining}
                    >
                      <div className="modal-dialog my-0" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title">
                              Khóa đào tạo ngắn hạn
                            </h5>
                            <button
                              type="button"
                              className="close"
                              onClick={() => setItSkills(false)}
                            >
                              <span>&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <form
                              id="addShortTraining"
                              onSubmit={handleAddShortTraining}
                              action="javascript:void(0);"
                            >
                              <div className="row">
                                <div className="col-lg-6 col-md-6">
                                  <div className="form-group">
                                    <label>Từ</label>
                                    <input
                                      type="date"
                                      className="form-control"
                                      value={newShortTraining.start}
                                      onChange={(e) => {
                                        setNewShortTraining({
                                          ...newShortTraining,
                                          start: e.target.value,
                                        });
                                      }}
                                      required
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                  <div className="form-group">
                                    <label>Đến</label>
                                    <Form.Control
                                      type="date"
                                      value={newShortTraining.end}
                                      onChange={(e) => {
                                        setNewShortTraining({
                                          ...newShortTraining,
                                          end: e.target.value,
                                        });
                                      }}
                                      required
                                    ></Form.Control>
                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-6">
                                  <div className="form-group">
                                    <label>Tên chứng chỉ</label>
                                    <Form.Control
                                      placeholder="Nhập tên chứng chỉ"
                                      value={newShortTraining.certificate}
                                      onChange={(e) => {
                                        setNewShortTraining({
                                          ...newShortTraining,
                                          certificate: e.target.value,
                                        });
                                      }}
                                      required
                                    ></Form.Control>
                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                  <div className="form-group">
                                    <label>Đơn vị tổ chức</label>
                                    <input
                                      className="form-control"
                                      placeholder="Nhập đơn vị tổ chức"
                                      value={newShortTraining.organizer}
                                      onChange={(e) => {
                                        setNewShortTraining({
                                          ...newShortTraining,
                                          organizer: e.target.value,
                                        });
                                      }}
                                      required
                                    />
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="site-button"
                              onClick={() => setShowShortTraining(false)}
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="site-button btn"
                              form="addShortTraining"
                              disabled={
                                !newShortTraining.certificate ||
                                !newShortTraining.organizer ||
                                !newShortTraining.start ||
                                !newShortTraining.end
                              }
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </Modal>
                  </div>
                  <div
                    id="accomplishments_bx"
                    className="job-bx table-job-bx bg-white m-b30"
                  >
                    <div className="d-flex">
                      <h5 className="m-b15">IT Skills</h5>
                      <Link
                        to={"#"}
                        onClick={() => setItSkills(true)}
                        className="site-button add-btn button-sm"
                      >
                        <i className="fa fa-pencil m-r5"></i> Thêm
                      </Link>
                    </div>
                    <p>
                      Mention your employment details including your current and
                      previous company work experience
                    </p>
                    <table>
                      <thead>
                        <tr>
                          <th>Skills</th>
                          <th>Version</th>
                          <th>Last Used</th>
                          <th>Experience</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Bootstrap</td>
                          <td>3</td>
                          <td>2018</td>
                          <td>1 Year 5 Months</td>
                          <td>
                            <Link
                              to={"#"}
                              className="m-l15 font-14"
                              data-toggle="modal"
                              data-target="#itskills"
                            >
                              <i className="fa fa-pencil"></i>
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <td>Bootstrap</td>
                          <td>4</td>
                          <td>2013</td>
                          <td>5 Year 5 Months</td>
                          <td>
                            <Link
                              to={"#"}
                              className="m-l15 font-14"
                              data-toggle="modal"
                              data-target="#itskills"
                            >
                              <i className="fa fa-pencil"></i>
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <td>html</td>
                          <td>5</td>
                          <td>2016</td>
                          <td>2 Year 7 Months</td>
                          <td>
                            <Link
                              to={"#"}
                              className="m-l15 font-14"
                              data-toggle="modal"
                              data-target="#itskills"
                            >
                              <i className="fa fa-pencil"></i>
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <td>css</td>
                          <td>3</td>
                          <td>2018</td>
                          <td>0 Year 5 Months</td>
                          <td>
                            <Link
                              to={"#"}
                              className="m-l15 font-14"
                              data-toggle="modal"
                              data-target="#itskills"
                            >
                              <i className="fa fa-pencil"></i>
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <td>photoshop</td>
                          <td>64bit</td>
                          <td>2017</td>
                          <td>1 Year 0 Months</td>
                          <td>
                            <Link
                              to={"#"}
                              className="m-l15 font-14"
                              data-toggle="modal"
                              data-target="#itskills"
                            >
                              <i className="fa fa-pencil"></i>
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <Modal
                      className="modal fade modal-bx-info editor"
                      show={itskills}
                      onHide={setItSkills}
                    >
                      <div className="modal-dialog my-0" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title">IT Skills</h5>
                            <button
                              type="button"
                              className="close"
                              onClick={() => setItSkills(false)}
                            >
                              <span>&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <form>
                              <div className="row">
                                <div className="col-lg-12 col-md-12">
                                  <div className="form-group">
                                    <label>IT Skills</label>
                                    <input
                                      type="email"
                                      className="form-control"
                                      placeholder="Enter IT Skills"
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                  <div className="form-group">
                                    <label>Version</label>
                                    <input
                                      type="email"
                                      className="form-control"
                                      placeholder="Enter Version"
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                  <div className="form-group">
                                    <label>Last Used</label>
                                    <Form.Control as="select"></Form.Control>
                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-6">
                                  <div className="form-group">
                                    <label>Experience</label>
                                    <div className="row">
                                      <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                        <Form.Control as="select"></Form.Control>
                                      </div>
                                      <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                        <Form.Control as="select"></Form.Control>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="site-button"
                              onClick={() => setItSkills(false)}
                            >
                              Cancel
                            </button>
                            <button type="button" className="site-button">
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </Modal>
                  </div>
                  <div
                    id="desired_career_profile_bx"
                    className="job-bx table-job-bx bg-white m-b30"
                  >
                    <div className="d-flex">
                      <h5 className="m-b15">IT Skills</h5>
                      <Link
                        to={"#"}
                        onClick={() => setOtherSkill(true)}
                        className="site-button add-btn button-sm"
                      >
                        <i className="fa fa-pencil m-r5"></i> Thêm
                      </Link>
                    </div>
                    <p>
                      Mention your employment details including your current and
                      previous company work experience
                    </p>
                    <table>
                      <thead>
                        <tr>
                          <th>Tên kĩ năng</th>
                          <th>Xếp loại</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>css</td>
                          <td>3</td>
                          <td>2018</td>
                          <td>0 Year 5 Months</td>
                          <td>
                            <Link to={"#"} className="m-l15 font-14">
                              <i className="fa fa-pencil"></i>
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <Modal
                      className="modal fade modal-bx-info editor"
                      show={otherSkill}
                      onHide={setOtherSkill}
                    >
                      <div className="modal-dialog my-0" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title">IT Skills</h5>
                            <button
                              type="button"
                              className="close"
                              onClick={() => setOtherSkill(false)}
                            >
                              <span>&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <form>
                              <div className="row">
                                <div className="col-lg-12 col-md-12">
                                  <div className="form-group">
                                    <label>IT Skills</label>
                                    <input
                                      type="email"
                                      className="form-control"
                                      placeholder="Enter IT Skills"
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                  <div className="form-group">
                                    <label>Version</label>
                                    <input
                                      type="email"
                                      className="form-control"
                                      placeholder="Enter Version"
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                  <div className="form-group">
                                    <label>Last Used</label>
                                    <Form.Control as="select"></Form.Control>
                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-6">
                                  <div className="form-group">
                                    <label>Experience</label>
                                    <div className="row">
                                      <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                        <Form.Control as="select"></Form.Control>
                                      </div>
                                      <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                        <Form.Control as="select"></Form.Control>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="site-button"
                              onClick={() => setOtherSkill(false)}
                            >
                              Cancel
                            </button>
                            <button type="button" className="site-button">
                              Save
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
      </div>
      <Footer />
    </>
  );
}
export default Jobmyresume;
