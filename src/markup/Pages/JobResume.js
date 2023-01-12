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
import { getResumeById } from "../../services/EmployeeApi";
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
function JobResume(props) {



  // option lý do nghỉ việc
  const [userInformation, setUserInformation] = useState({});
  const [reload, setReload] = useState(false);
  const [levels, setLevels] = useState([]);
  const [majors, setMajors] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [jobTitleOption, setJobTitleOption] = useState([]);

 

  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchData() {
      let listQuestion = await getListQuestion();
      setQuestions(listQuestion.data);
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

  const uploadAvatar = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64 = reader.result;
      setUserInformation({ ...userInformation, avatar: base64 });
    };
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
                        <li>Chưa xác thực số điện thoại</li>
                      )}
                    </ul>
                  </div>
                </Link>
              </div>
            </div>
          </div>
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
                  </div>
                  <div id="education_bx" className="job-bx bg-white m-b30">
                    <div className="d-flex">
                      <h5 className="m-b15">Quá trình học tập</h5>
                    </div>
                    <p>
                      Mention your employment details including your current and
                      previous company work experience
                    </p>

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
export default JobResume;
