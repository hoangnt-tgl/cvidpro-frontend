import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "./../Layout/HeaderCompany";
import Footer from "./../Layout/Footer";
import swal from "sweetalert";
import "../../css/layout.css"
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
import { getResumeById } from "../../services/EmployeeApi";
import {
  getSortTime,
  formatTimeInput,
  getMonthYear,
  formatMonthInput,
} from "../../services/TimeService";

import Listingsidebar from "./../Element/Listingsidebar";
import {
  getListLevel,
  getListSchools,
  getAllListMajor,
  getListQuestion,
  getListJobTitle,
} from "../../services/GetListService";
import {
  getRole,
  confirmResume,
  cancelConfirmResume,
  rejectResume,
} from "../../services/AdminApi.js";
var bnr = require("./../../images/background/bg3.jpg");
function JobResume(props) {
  // option lý do nghỉ việc
  const [userInformation, setUserInformation] = useState({});
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");
  const [reload, setReload] = useState(false);
  const [levels, setLevels] = useState([]);
  const [majors, setMajors] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [jobTitleOption, setJobTitleOption] = useState([]);
  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  let query = useQuery();

  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchData() {
      let listQuestion = await getListQuestion();
      setQuestions(listQuestion.data);
      let token = query.get("token");
      console.log("token", token);
      if (token) {
        token = decodeURIComponent(token);
        setToken(token);
        let temp = (await getRole(token)).roles;
        setRole(temp);
      }
    }

    fetchData();
  }, []);
  useEffect(() => {
    async function fetchData() {
      const response = await getResumeById(props.match.params.id);
      console.log(response);
      setUserInformation(response);
    }
    fetchData();
  }, [reload]);
  const getValueSelect = (value) => {
    return value ? { label: value, value: value } : "";
  };

  const getExperience = (workExperience) => {
    let year = 0;
    let month = 0;
    if (!workExperience) {
      return "Chưa có kinh nghiệm";
    }
    workExperience.forEach((company) => {
      company.process.forEach((process) => {
        if (process.isCurrent === true) {
          let to = new Date();
          let from = new Date(process.from);
          let diff = to.getTime() - from.getTime();
          month += Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
        } else {
          let to = new Date(process.to);
          let from = new Date(process.from);
          let diff = to.getTime() - from.getTime();
          month += Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
        }
      });
    });
    if (month >= 12) {
      year += Math.floor(month / 12);
      month = month % 12;
    }
    return `${year} năm ${month} tháng`;
  };

  const getPoint = (point, index) => {
    try {
      return point[index];
    } catch (e) {
      return 0;
    }
  };

  const Confirm = (times) => {
    swal({
      title: "Bạn có chắc chắn muốn duyệt ứng viên này?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async(willDelete) => {
      if (willDelete) {
        await confirmResume(userInformation._id, times, token, "");
        swal("Xác nhận thành công!", {
          icon: "success",
        });
        setReload(!reload);
      } else {
        swal("Xác nhận không thành công!");
      }
    });
  };
  const CancelConfirm = (times) => {
    swal({
      title: "Bạn có chắc chắn muốn hủy duyệt ứng viên này?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        await cancelConfirmResume(userInformation._id, times, token, "");
        swal("Hủy xác nhận thành công!", {
          icon: "success",
        });
        setReload(!reload);
      } else {
        swal("Hủy xác nhận không thành công!");
      }
    });
  };
  const NotConfirm = (times) => {
    swal({
      title: "Bạn có chắc chắn muốn từ chối ứng viên này?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        await rejectResume(userInformation._id, times, token, "");
        swal("Từ chối thành công!", {
          icon: "success",
        });
        setReload(!reload);
      } else {
        swal("Từ chối không thành công!");
      }
    });
  };

  return (
    <>
      {/* <Header /> */}
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
                      />
                      <i className="fa fa-camera"></i>
                    </div>
                  </div>
                  <div className="text-white browse-job text-left">
                    <h4 className="m-b0">{userInformation?.name}</h4>
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
                         Điểm CV:
                       <span>{userInformation.points}</span>
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
                        <li>Chưa xác thực số điện thoại</li>
                      )}
                    </ul>
                  </div>
                </Link>
                {/* Tạo 1 button ở giữa */}
              </div>
            </div>
          </div>
        </div>
        <div className="content-block">
          <div className="section-full browse-job content-inner-2">
            <div className="container">
              <div
                id="resume_headline_bx"
                className=" job-bx bg-white table-job-bx m-b30"
              >
                <div className="d-flex">
                  <h5 className="m-b15 bold">Kinh nghiệm làm việc</h5>
                </div>
                {userInformation.workExperience?.map((item, index1) => {
                  return (
                    <Form className="mb-3">
                      <Card>
                        <Card.Header>
                          <div className="row">
                            <div className="col-12">
                              <InputGroup size="sm" className="mb-2">
                                <InputGroup.Prepend
                                  style={{ maxHeight: "38px" }}
                                >
                                  <InputGroup.Text>
                                    Nơi làm việc
                                  </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                  value={item.company}
                                  className="m-0"
                                  style={{ maxHeight: "38px" }}
                                />
                              </InputGroup>
                            </div>
                            <div className="col-md-4 col-sm-12">
                              <InputGroup size="sm" className="mb-2">
                                <InputGroup.Prepend
                                  style={{ maxHeight: "38px" }}
                                >
                                  <InputGroup.Text>Từ</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                  className="m-0"
                                  value={formatMonthInput(item.start)}
                                  style={{ maxHeight: "38px" }}
                                  type="month"
                                />
                              </InputGroup>
                            </div>
                            <div className="col-md-4 col-sm-12">
                              <InputGroup size="sm">
                                <InputGroup.Prepend
                                  style={{ maxHeight: "38px" }}
                                >
                                  <InputGroup.Text>Đến</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                  className="m-0"
                                  style={{ maxHeight: "38px" }}
                                  type="month"
                                  value={formatMonthInput(item.end)}
                                />
                              </InputGroup>
                            </div>
                            <div className="col-md-4 col-sm-12">
                              <Form.Group
                                controlId="formBasicCheckbox"
                                className="my-2"
                              >
                                <Form.Check
                                  type="checkbox"
                                  label="Đang làm việc"
                                  checked={
                                    item.process[item.process.length - 1]
                                      .isCurrent
                                  }
                                />
                              </Form.Group>
                            </div>
                            <div className="col-12">
                              <InputGroup size="sm">
                                <InputGroup.Prepend
                                  style={{ maxHeight: "38px" }}
                                >
                                  <InputGroup.Text>Địa chỉ</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                  className="m-0"
                                  style={{ maxHeight: "38px" }}
                                  value={item.address}
                                />
                              </InputGroup>
                            </div>
                          </div>
                        </Card.Header>
                        <Card.Body>
                          <Card.Title className="text-center">
                            Quá trình làm việc
                          </Card.Title>
                          {item.process.map((element, index2) => {
                            return (
                              <>
                                <div className="row ">
                                  <div className="col-md-4 col-sm-12">
                                    <InputGroup size="sm" className="mb-2">
                                      <InputGroup.Prepend
                                        style={{ maxHeight: "38px" }}
                                      >
                                        <InputGroup.Text>Từ</InputGroup.Text>
                                      </InputGroup.Prepend>
                                      <FormControl
                                        className="m-0"
                                        style={{ maxHeight: "38px" }}
                                        type="month"
                                        value={formatMonthInput(element.from)}
                                      />
                                    </InputGroup>
                                  </div>
                                  <div className="col-md-4 col-sm-12">
                                    <InputGroup size="sm">
                                      <InputGroup.Prepend
                                        style={{ maxHeight: "38px" }}
                                      >
                                        <InputGroup.Text>Đến</InputGroup.Text>
                                      </InputGroup.Prepend>
                                      <FormControl
                                        className="m-0"
                                        style={{ maxHeight: "38px" }}
                                        type="month"
                                        value={formatMonthInput(element.to)}
                                      />
                                    </InputGroup>
                                  </div>
                                  <div className="col-md-4 col-sm-12">
                                    <Form.Group
                                      controlId="formBasicCheckbox"
                                      className="my-2"
                                    >
                                      <Form.Check
                                        type="checkbox"
                                        label="Đang làm việc"
                                        checked={element.isCurrent}
                                      />
                                    </Form.Group>
                                  </div>
                                  <div className="col-12">
                                    <InputGroup size="sm" className="mb-2">
                                      <InputGroup.Prepend
                                        style={{ maxHeight: "38px" }}
                                      >
                                        <InputGroup.Text>
                                          Công việc
                                        </InputGroup.Text>
                                      </InputGroup.Prepend>
                                      <FormControl
                                        className="m-0"
                                        style={{ maxHeight: "38px" }}
                                        value={element.workDescription}
                                      />
                                    </InputGroup>
                                  </div>
                                  <div className="col-12">
                                    <InputGroup size="sm" className="mb-2">
                                      <InputGroup.Prepend
                                        style={{ maxHeight: "38px" }}
                                      >
                                        <InputGroup.Text>
                                          Chuyên nghành
                                        </InputGroup.Text>
                                      </InputGroup.Prepend>
                                      <FormControl
                                        as={Select}
                                        size="sm"
                                        className="m-0 p-0"
                                        options={majors}
                                        value={getValueSelect(element.major)}
                                      />
                                    </InputGroup>
                                  </div>
                                  <div className="col-12">
                                    <InputGroup size="sm" className="mb-2">
                                      <InputGroup.Prepend
                                        style={{ maxHeight: "38px" }}
                                      >
                                        <InputGroup.Text>
                                          Chức danh công việc
                                        </InputGroup.Text>
                                      </InputGroup.Prepend>
                                      <FormControl
                                        as={Select}
                                        size="sm"
                                        className="m-0 p-0"
                                        options={jobTitleOption}
                                        value={getValueSelect(element.jobTitle)}
                                      />
                                    </InputGroup>
                                  </div>
                                  <div className="col-12">
                                    <InputGroup size="sm" className="mb-2">
                                      <InputGroup.Prepend
                                        style={{ maxHeight: "38px" }}
                                      >
                                        <InputGroup.Text>
                                          Địa chỉ
                                        </InputGroup.Text>
                                      </InputGroup.Prepend>
                                      <FormControl
                                        className="m-0"
                                        style={{ maxHeight: "38px" }}
                                        value={element.address}
                                      />
                                    </InputGroup>
                                  </div>
                                  <div className="col-12">
                                    <InputGroup size="sm" className="mb-2">
                                      <InputGroup.Prepend
                                        style={{ maxHeight: "38px" }}
                                      >
                                        <InputGroup.Text>
                                          Kết quả
                                        </InputGroup.Text>
                                      </InputGroup.Prepend>
                                      <FormControl
                                        as={Select}
                                        size="sm"
                                        className="m-0 p-0"
                                        value={getValueSelect(element.result)}
                                      />
                                    </InputGroup>
                                  </div>
                                </div>
                              </>
                            );
                          })}
                        </Card.Body>
                        <Card.Footer>
                          <InputGroup size="sm">
                            <InputGroup.Prepend style={{ maxHeight: "38px" }}>
                              <InputGroup.Text>Nghỉ việc</InputGroup.Text>
                            </InputGroup.Prepend>

                            <FormControl
                              as={Select}
                              size="sm"
                              className="m-0 p-0"
                              value={getValueSelect(item.leaving)}
                            ></FormControl>
                          </InputGroup>
                        </Card.Footer>
                      </Card>
                    </Form>
                  );
                })}
                <h5 className="">
                  Kinh nghiệm đến hiện tại:{" "}
                  {getExperience(userInformation.workExperience)}
                </h5>

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
                            value={getPoint(userInformation.pointList, index)}
                            style={{ width: "50px" }}
                            type="number"
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
              </div>
              <div id="education_bx" className="job-bx bg-white m-b30">
                <div className="d-flex">
                  <h5 className="m-b15">Quá trình học tập</h5>
                </div>

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
                        <label className="m-b0">{userInformation.school}</label>
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
                  <Link to={"#"} className="site-button add-btn button-sm">
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
                              <label className="m-b0">{item.certificate}</label>
                              <Link
                                to={"#"}
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
              </div>
              <div
                id="accomplishments_bx"
                className="job-bx table-job-bx bg-white m-b30"
                style={{ display: "none" }}
              >
                <div className="d-flex">
                  <h5 className="m-b15">IT Skills</h5>
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
              </div>
              <div
                id="desired_career_profile_bx"
                className="job-bx table-job-bx bg-white m-b30"
                style={{ display: "none" }}
              >
                <div className="d-flex">
                  <h5 className="m-b15">IT Skills</h5>
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
              </div>
              {/* Tạo 2 button 2 bên */}

              {userInformation.confirm2?.confirmed !== 1 &&
              role.includes("nldC1") ? (
                <>
                  {/* tạo 3 button đều nhau trên 1 hàng*/}
                  <div class="d-flex justify-content-center my-1">
                    <button
                      className="btn btn-light mx-1"
                      onClick={() => NotConfirm(1)}
                    >
                      Không duyệt 1
                    </button>
                    <button
                      className="btn btn-secondary mx-1"
                      onClick={() => CancelConfirm(1)}
                    >
                      Hủy duyệt 1
                    </button>
                    <button
                      className="btn btn-primary mx-1"
                      onClick={() => Confirm(1)}
                    >
                      Duyệt 1
                    </button>
                  </div>
                </>
              ) : (
                <></>
              )}
              {userInformation.confirm1?.confirmed === 1 &&
              role.includes("nldC2") ? (
                <>
                  {/* tạo 3 button đều nhau trên 1 hàng*/}
                  <div class="d-flex justify-content-center my-1">
                    <button
                      className="btn btn-light mx-1"
                      onClick={() => NotConfirm(2)}
                    >
                      Không duyệt 2
                    </button>
                    <button
                      className="btn btn-secondary mx-1"
                      onClick={() => CancelConfirm(2)}
                    >
                      Hủy duyệt 2
                    </button>
                    <button
                      className="btn btn-primary mx-1"
                      onClick={() => Confirm(2)}
                    >
                      Duyệt 2
                    </button>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
            {/* <div className="col-md-6">
                  {userInformation.confirm1?.confirmed === 0 && role.includes('nldC1')? <>
                    <button className="btn btn-primary float-right" >Duyệt</button>
                  </> : <></>}
                </div> */}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
export default JobResume;
