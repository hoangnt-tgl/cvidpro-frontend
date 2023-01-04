import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./../Layout/Header";
import Footer from "./../Layout/Footer";
import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import Select from "react-select";
import { getMyResume } from "../../services/GetApi";
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
} from "../../services/GetListService";
var bnr = require("./../../images/banner/bnr1.jpg");
//var bnr2 = require('./../../images/background/bg3.jpg');
function Jobmyresume() {
  const [userInformation, setUserInformation] = useState({});
  const [levels, setLevels] = useState([]);
  const [majors, setMajors] = useState([]);
  const [listProvince, setListProvince] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [listWard, setListWard] = useState([]);
  const [itemEducation, setItemEducation] = useState({});
  const [schools, setSchools] = useState([]);
  const [basicdetails, setBasicDetails] = useState(false);
  const [resume, setResume] = useState(false);
  const [keyskill, setKeyskill] = useState(false);
  const [employment, setEmployment] = useState(false);
  const [education, setEducation] = useState(false);
  const [itskills, setItSkills] = useState(false);
  const [otherSkill, setOtherSkill] = useState(false);
  const [projects, setProjects] = useState(false);
  const [profilesummary, setProfileSummary] = useState(false);
  const [onlineprofile, setOnlineProfile] = useState(false);
  const [worksample, setWorkSample] = useState(false);
  const [whitepaper, setWhitePaper] = useState(false);
  const [presentation, setPresentation] = useState(false);
  const [patent, setPatent] = useState(false);
  const [certification, setCertification] = useState(false);
  const [careerprofile, setCareerProfile] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchData() {
      const response = await getMyResume();
      console.log(response._doc);
      setUserInformation(response._doc);
      let listLevel = await getListLevel();
      setLevels(
        listLevel.data.map((item) => ({
          value: item,
          label: item,
        }))
      );
      let listSchool = await getListSchools();
      setSchools(
        listSchool.data.map((item) => ({ value: item._id, label: item.name }))
      );
      let listMajor = await getAllListMajor();
      setMajors(listMajor.data.map((item) => ({ value: item, label: item })));
    }
    fetchData();
  }, []);

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
                      {userInformation.confirmPhone && (
                        <li>Đã xác thực số điện thoại</li>
                      )}
                      {userInformation.confirm2?.confirmed && (
                        <li>Đã được duyệt</li>
                      )}
                    </ul>
                  </div>
                </Link>
              </div>
            </div>
          </div>
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
                    className=" job-bx bg-white m-b30"
                  >
                    <div className="d-flex">
                      <h5 className="m-b15">Kinh nghiệm làm việc</h5>
                      <Link
                        to={"#"}
                        className="site-button add-btn button-sm"
                        onClick={() => setResume(true)}
                      >
                        <i className="fa fa-pencil m-r5"></i> Edit
                      </Link>
                    </div>
                    <p className="m-b0">Job board currently living in USA</p>
                    <Modal
                      show={resume}
                      onHide={setResume}
                      className="modal fade modal-bx-info editor"
                    >
                      <div className="modal-dialog my-0" role="document">
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
                          <div className="modal-body">
                            <form>
                              <div className="row">
                                <div className="col-lg-12 col-md-12">
                                  <div className="form-group">
                                    <label>Nơi làm việc</label>
                                    <input
                                      className="form-control"
                                      placeholder="Nơi làm việc"
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                  <div className="form-group">
                                    <label>Địa chỉ</label>
                                    <input
                                      className="form-control"
                                      placeholder="Địa chỉ"
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                  <label>Quá trình làm việc</label>
                                  <div className="mx-2">
                                    <div className="row">
                                      <div className="col-md-6 col-sm-12">
                                        <div className="form-group">
                                          <label>Từ</label>
                                          <input
                                            className="form-control"
                                            placeholder="Địa chỉ"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-6 col-sx-12">
                                        <div className="form-group">
                                          <label>Đến</label>
                                          <input
                                            className="form-control"
                                            placeholder="Địa chỉ"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* <div className="form-group">
									<label>Địa chỉ</label>
                                    <input
                                      className="form-control"
                                      placeholder="Địa chỉ"
                                    />
                                  </div> */}
                                </div>
                                <div className="col-lg-12 col-md-12">
                                  <div className="form-group">
                                    <label>Nghỉ việc</label>
                                    <select className="form-control">
                                      <option value="volvo">Volvo</option>
                                      <option value="saab">Saab</option>
                                    </select>
                                  </div>
                                </div>
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
                            <button type="button" className="site-button">
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </Modal>
                  </div>
                  <div id="key_skills_bx" className="job-bx bg-white m-b30">
                    <div className="d-flex">
                      <h5 className="m-b15">Key Skills</h5>
                      <Link
                        to={"#"}
                        data-toggle="modal"
                        data-target="#keyskills"
                        onClick={() => setKeyskill(true)}
                        className="site-button add-btn button-sm"
                      >
                        <i className="fa fa-pencil m-r5"></i> Edit
                      </Link>
                    </div>
                    <div className="job-time mr-auto">
                      <Link to={"#"} className="mr-1">
                        <span>Javascript</span>
                      </Link>
                      <Link to={"#"} className="mr-1">
                        <span>CSS</span>
                      </Link>
                      <Link to={"#"} className="mr-1">
                        <span>HTML</span>
                      </Link>
                      <Link to={"#"} className="mr-1">
                        <span>Bootstrap</span>
                      </Link>
                      <Link to={"#"} className="mr-1">
                        <span>Web Designing</span>
                      </Link>
                      <Link to={"#"} className="mr-1">
                        <span>Photoshop</span>
                      </Link>
                    </div>
                    <Modal
                      show={keyskill}
                      onHide={setKeyskill}
                      className="modal fade modal-bx-info editor"
                    >
                      <div className="modal-dialog my-0" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5
                              className="modal-title"
                              id="KeyskillsModalLongTitle"
                            >
                              Key Skills
                            </h5>
                            <button
                              type="button"
                              className="close"
                              onClick={() => setKeyskill(false)}
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <p>
                              It is the first thing recruiters notice in your
                              profile. Write concisely what makes you unique and
                              right person for the job you are looking for.
                            </p>
                            <form>
                              <div className="row">
                                <div className="col-lg-12 col-md-12">
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      className="form-control tags_input"
                                      defaultValue="html,css,bootstrap,photoshop"
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
                              onClick={() => setKeyskill(false)}
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
                  <div id="employment_bx" className="job-bx bg-white m-b30 ">
                    <div className="d-flex">
                      <h5 className="m-b15">Employment</h5>
                      <Link
                        to={"#"}
                        onClick={() => setEmployment(true)}
                        className="site-button add-btn button-sm"
                      >
                        <i className="fa fa-pencil m-r5"></i> Edit
                      </Link>
                    </div>
                    <h6 className="font-14 m-b0">
                      Junior Software DeveloperEdit
                    </h6>
                    <p className="m-b0">W3itexperts</p>
                    <p className="m-b0">
                      Oct 2015 to Present (3 years 4 months)
                    </p>
                    <p className="m-b0">Available to join in 1 Months</p>
                    <p className="m-b0">Junior Software Developer</p>
                    <Modal
                      show={employment}
                      onHide={setEmployment}
                      className="modal fade modal-bx-info editor"
                    >
                      <div className="modal-dialog my-0" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5
                              className="modal-title"
                              id="EmploymentModalLongTitle"
                            >
                              Add Employment
                            </h5>
                            <button
                              type="button"
                              className="close"
                              onClick={() => setEmployment(false)}
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <form>
                              <div className="row">
                                <div className="col-lg-12 col-md-12">
                                  <div className="form-group">
                                    <label>Your Designation</label>
                                    <input
                                      type="email"
                                      className="form-control"
                                      placeholder="Enter Your Designation"
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                  <div className="form-group">
                                    <label>Your Organization</label>
                                    <input
                                      type="email"
                                      className="form-control"
                                      placeholder="Enter Your Organization"
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                  <div className="form-group">
                                    <label>Is this your current company?</label>
                                    <div className="row">
                                      <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                        <div className="custom-control custom-radio">
                                          <input
                                            type="radio"
                                            className="custom-control-input"
                                            id="employ_yes"
                                            name="example1"
                                          />
                                          <label
                                            className="custom-control-label"
                                            htmlFor="employ_yes"
                                          >
                                            Yes
                                          </label>
                                        </div>
                                      </div>
                                      <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                        <div className="custom-control custom-radio">
                                          <input
                                            type="radio"
                                            className="custom-control-input"
                                            id="employ_no"
                                            name="example1"
                                          />
                                          <label
                                            className="custom-control-label"
                                            htmlFor="employ_no"
                                          >
                                            No
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                  <div className="form-group">
                                    <label>Started Working From</label>
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
                                <div className="col-lg-12 col-md-12">
                                  <div className="form-group">
                                    <label>Worked Till</label>
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
                                <div className="col-lg-12 col-md-12">
                                  <div className="form-group">
                                    <label>Describe your Job Profile</label>
                                    <textarea
                                      className="form-control"
                                      placeholder="Type Description"
                                    ></textarea>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="site-button"
                              onClick={() => setEmployment(false)}
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
                                      class="form-control"
                                    ></input>
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                  <div className="form-group">
                                    <label>Đến</label>
                                    <input
                                      type="month"
                                      class="form-control"
                                    ></input>
                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                  <div className="form-group">
                                    <label>Cấp bậc</label>
                                    <Select
                                      placeholder="Chọn cấp bậc"
                                      onChange={(e) =>
                                        setItemEducation((prev) => ({
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
                                        setItemEducation((prev) => ({
                                          ...prev,
                                          name: e.label,
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
                                        setItemEducation((prev) => ({
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
                                      placeholder="Nhập chức danh chuyên môn"
                                      onBlur={(e) =>
                                        setItemEducation((prev) => ({
                                          ...prev,
                                          title: e.target.value,
                                        }))
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
                              type="button"
                              className="site-button"
                              onClick={() => {
                                userInformation.skillEducation.push(
                                  itemEducation
                                );
                                setEducation(false);
                              }}
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
                          <div className="d-flex">
                            <label className="m-b0">
                              {userInformation.school}
                              <span className="float-right mr-3 font-13">
                                {getMonthYear(userInformation.startYear)} -{" "}
                                {getMonthYear(userInformation.endYear)}
                              </span>
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
                                <div className="d-flex">
                                  <label className="m-b0">
                                    {item.name}
                                    <span className="float-right mr-3 font-13">
                                      {getMonthYear(userInformation.startYear)}{" "}
                                      - {getMonthYear(userInformation.endYear)}
                                    </span>
                                  </label>
                                  <Link
                                    to={"#"}
                                    onClick={() => setOnlineProfile(true)}
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
                                  Chức danh: {item.title}
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
                      <h5 className="m-b15">IT Skills</h5>
                      <Link
                        to={"#"}
                        onClick={() => setItSkills(true)}
                        className="site-button add-btn button-sm"
                      >
                        <i className="fa fa-pencil m-r5"></i> Edit
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
                  <div id="projects_bx" className="job-bx bg-white m-b30">
                    <div className="d-flex">
                      <h5 className="m-b15">Projects</h5>
                      <Link
                        to={"#"}
                        onClick={() => setProjects(true)}
                        className="site-button add-btn button-sm"
                      >
                        <i className="fa fa-pencil m-r5"></i> Edit
                      </Link>
                    </div>
                    <h6 className="font-14 m-b0">Job BoardEdit</h6>
                    <p className="m-b0">w3itexpert (Offsite)</p>
                    <p className="m-b0">Dec 2018 to Present (Full Time)</p>
                    <p className="m-b0">Job Board Template</p>
                    <Modal
                      className="modal fade modal-bx-info editor"
                      show={projects}
                      onHide={setProjects}
                    >
                      <div className="modal-dialog my-0" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5
                              className="modal-title"
                              id="ProjectsModalLongTitle"
                            >
                              Add Projects
                            </h5>
                            <button
                              type="button"
                              className="close"
                              onClick={() => setProjects(false)}
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <form>
                              <div className="row">
                                <div className="col-lg-12 col-md-12">
                                  <div className="form-group">
                                    <label>Project Title</label>
                                    <input
                                      type="email"
                                      className="form-control"
                                      placeholder="Enter Project Title"
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                  <div className="form-group">
                                    <label>
                                      Tag this project with your
                                      Employment/Education
                                    </label>
                                    <select>
                                      <option>Class 12th</option>
                                      <option>Class 10th</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                  <div className="form-group">
                                    <label>Client</label>
                                    <input
                                      type="email"
                                      className="form-control"
                                      placeholder="Enter Client Name"
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                  <div className="form-group">
                                    <label>Project Status</label>
                                    <div className="row">
                                      <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                        <div className="custom-control custom-radio">
                                          <input
                                            type="radio"
                                            className="custom-control-input"
                                            id="inprogress"
                                            name="example1"
                                          />
                                          <label
                                            className="custom-control-label"
                                            htmlFor="inprogress"
                                          >
                                            In Progress
                                          </label>
                                        </div>
                                      </div>
                                      <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                        <div className="custom-control custom-radio">
                                          <input
                                            type="radio"
                                            className="custom-control-input"
                                            id="finished"
                                            name="example1"
                                          />
                                          <label
                                            className="custom-control-label"
                                            htmlFor="finished"
                                          >
                                            Finished
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-6">
                                  <div className="form-group">
                                    <label>Started Working From</label>
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
                                <div className="col-lg-12 col-md-6">
                                  <div className="form-group">
                                    <label>Worked Till</label>
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
                                <div className="col-lg-12 col-md-12">
                                  <div className="form-group">
                                    <label>Details of Project</label>
                                    <textarea
                                      className="form-control"
                                      placeholder="Type Description"
                                    ></textarea>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="site-button"
                              onClick={() => setProjects(false)}
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
                    id="profile_summary_bx"
                    className="job-bx bg-white m-b30"
                  >
                    <div className="d-flex">
                      <h5 className="m-b15">Profile Summary</h5>
                      <Link
                        to={"#"}
                        onClick={() => setProfileSummary(true)}
                        className="site-button add-btn button-sm"
                      >
                        <i className="fa fa-pencil m-r5"></i> Edit
                      </Link>
                    </div>
                    <p className="m-b0">
                      Your Profile Summary should mention the highlights of your
                      career and education, what your professional interests
                      are, and what kind of a career you are looking for. Write
                      a meaningful summary of more than 50 characters.
                    </p>
                    <Modal
                      className="modal fade modal-bx-info editor"
                      show={profilesummary}
                      onHide={setProfileSummary}
                    >
                      <div className="modal-dialog my-0" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title">Profile Summary</h5>
                            <button
                              type="button"
                              className="close"
                              onClick={() => setProfileSummary(false)}
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <p>
                              Your Profile Summary should mention the highlights
                              of your career and education, what your
                              professional interests are, and what kind of a
                              career you are looking for. Write a meaningful
                              summary of more than 50 characters.
                            </p>
                            <form>
                              <div className="row">
                                <div className="col-lg-12 col-md-12">
                                  <div className="form-group">
                                    <label>Details of Project</label>
                                    <textarea
                                      className="form-control"
                                      placeholder="Type Description"
                                    ></textarea>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="site-button"
                              onClick={() => setProfileSummary(false)}
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
                    id="accomplishments_bx"
                    className="job-bx bg-white m-b30"
                  >
                    <h5 className="m-b10">Accomplishments</h5>
                    <div className="list-row">
                      <div className="list-line">
                        <div className="d-flex">
                          <h6 className="font-14 m-b5">Online Profile</h6>
                          <Link
                            to={"#"}
                            onClick={() => setOnlineProfile(true)}
                            className="site-button add-btn button-sm"
                          >
                            <i className="fa fa-pencil m-r5"></i> Edit
                          </Link>
                        </div>
                        <p className="m-b0">
                          Add link to Online profiles (e.g. Linkedin, Facebook
                          etc.).
                        </p>
                        <Modal
                          className="modal fade modal-bx-info editor"
                          show={onlineprofile}
                          onHide={setOnlineProfile}
                        >
                          <div className="modal-dialog my-0" role="document">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title">Online Profiles</h5>
                                <button
                                  type="button"
                                  className="close"
                                  onClick={() => setOnlineProfile(false)}
                                >
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div className="modal-body">
                                <form>
                                  <div className="row">
                                    <div className="col-lg-12 col-md-12">
                                      <div className="form-group">
                                        <label>Social Profile</label>
                                        <input
                                          type="email"
                                          className="form-control"
                                          placeholder="Social Profile Name"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                      <div className="form-group">
                                        <label>URL</label>
                                        <input
                                          type="email"
                                          className="form-control"
                                          placeholder="www.google.com"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                      <div className="form-group">
                                        <label>Description</label>
                                        <textarea
                                          className="form-control"
                                          placeholder="Type Description"
                                        ></textarea>
                                      </div>
                                    </div>
                                  </div>
                                </form>
                              </div>
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="site-button"
                                  onClick={() => setOnlineProfile(false)}
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
                        <div className="list-line">
                          <div className="d-flex">
                            <h6 className="font-14 m-b5">Work Sample</h6>
                            <Link
                              to={"#"}
                              onClick={() => setWorkSample(true)}
                              className="site-button add-btn button-sm"
                            >
                              <i className="fa fa-pencil m-r5"></i> Edit
                            </Link>
                          </div>
                          <p className="m-b0">
                            Add link to your Projects (e.g. Github links etc.).
                          </p>
                          <Modal
                            className="modal fade modal-bx-info editor"
                            show={worksample}
                            onHide={setWorkSample}
                          >
                            <div className="modal-dialog my-0" role="document">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5 className="modal-title">Work Sample</h5>
                                  <button
                                    type="button"
                                    className="close"
                                    onClick={() => setWorkSample(false)}
                                  >
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>
                                <div className="modal-body">
                                  <form>
                                    <div className="row">
                                      <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                          <label>Work Title</label>
                                          <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Enter Title"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                          <label>URL</label>
                                          <input
                                            type="email"
                                            className="form-control"
                                            placeholder="www.google.com"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                          <label>Duration From</label>
                                          <div className="row">
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                              <Form.Control as="select">
                                                \n
                                              </Form.Control>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                              <Form.Control as="select"></Form.Control>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                          <label>Duration To</label>
                                          <div className="row">
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                              <Form.Control as="select">
                                                \n
                                              </Form.Control>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                              <Form.Control as="select"></Form.Control>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                          <div className="custom-control custom-checkbox">
                                            <input
                                              type="checkbox"
                                              className="custom-control-input"
                                              id="check1"
                                              name="example1"
                                            />
                                            <label
                                              className="custom-control-label"
                                              htmlFor="check1"
                                            >
                                              I am currently working on this
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                          <label>Description</label>
                                          <textarea
                                            className="form-control"
                                            placeholder="Type Description"
                                          ></textarea>
                                        </div>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    className="site-button"
                                    onClick={() => setWorkSample(false)}
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
                        <div className="list-line">
                          <div className="d-flex">
                            <h6 className="font-14 m-b5">
                              White Paper / Research Publication / Journal Entry
                            </h6>
                            <Link
                              to={"#"}
                              onClick={() => setWhitePaper(true)}
                              className="site-button add-btn button-sm"
                            >
                              <i className="fa fa-pencil m-r5"></i> Edit
                            </Link>
                          </div>
                          <p className="m-b0">
                            Add links to your Online publications.
                          </p>
                          <Modal
                            className="modal fade modal-bx-info editor"
                            show={whitepaper}
                            onHide={setWhitePaper}
                          >
                            <div className="modal-dialog my-0" role="document">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5
                                    className="modal-title"
                                    id="JournalentryModalLongTitle"
                                  >
                                    White Paper / Research Publication / Journal
                                    Entry
                                  </h5>
                                  <button
                                    type="button"
                                    className="close"
                                    onClick={() => setWhitePaper(false)}
                                  >
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>
                                <div className="modal-body">
                                  <form>
                                    <div className="row">
                                      <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                          <label>Title</label>
                                          <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Enter Title"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                          <label>URL</label>
                                          <input
                                            type="email"
                                            className="form-control"
                                            placeholder="www.google.com"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                          <label>Published On</label>
                                          <div className="row">
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                              <Form.Control as="select">
                                                \n
                                              </Form.Control>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                              <Form.Control as="select"></Form.Control>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                          <label>Description</label>
                                          <textarea
                                            className="form-control"
                                            placeholder="Type Description"
                                          ></textarea>
                                        </div>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    className="site-button"
                                    onClick={() => setWhitePaper(false)}
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
                        <div className="list-line">
                          <div className="d-flex">
                            <h6 className="font-14 m-b5">Presentation</h6>
                            <Link
                              to={"#"}
                              onClick={() => setPresentation(true)}
                              className="site-button add-btn button-sm"
                            >
                              <i className="fa fa-pencil m-r5"></i> Edit
                            </Link>
                          </div>
                          <p className="m-b0">
                            Add links to your Online presentations (e.g.
                            Slideshare presentation links etc.).
                          </p>
                          <Modal
                            className="modal fade modal-bx-info editor"
                            id="presentation"
                            show={presentation}
                            onHide={setPresentation}
                          >
                            <div className="modal-dialog my-0" role="document">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5
                                    className="modal-title"
                                    id="PresentationModalLongTitle"
                                  >
                                    Presentation
                                  </h5>
                                  <button
                                    type="button"
                                    className="close"
                                    onClick={() => setPresentation(false)}
                                  >
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>
                                <div className="modal-body">
                                  <form>
                                    <div className="row">
                                      <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                          <label>Title</label>
                                          <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Enter Title"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                          <label>URL</label>
                                          <input
                                            type="email"
                                            className="form-control"
                                            placeholder="www.google.com"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                          <label>Description</label>
                                          <textarea
                                            className="form-control"
                                            placeholder="Type Description"
                                          ></textarea>
                                        </div>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    className="site-button"
                                    data-dismiss="modal"
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
                        <div className="list-line">
                          <div className="d-flex">
                            <h6 className="font-14 m-b5">Patent</h6>
                            <Link
                              to={"#"}
                              data-toggle="modal"
                              data-target="#patent"
                              onClick={() => setPatent(true)}
                              className="site-button add-btn button-sm"
                            >
                              <i className="fa fa-pencil m-r5"></i> Edit
                            </Link>
                          </div>
                          <p className="m-b0">
                            Add details of Patents you have filed.
                          </p>
                          <Modal
                            className="modal fade modal-bx-info editor"
                            show={patent}
                            onHide={setPatent}
                          >
                            <div className="modal-dialog my-0" role="document">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5
                                    className="modal-title"
                                    id="PatentModalLongTitle"
                                  >
                                    Patent
                                  </h5>
                                  <button
                                    type="button"
                                    className="close"
                                    onClick={() => setPatent(false)}
                                  >
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>
                                <div className="modal-body">
                                  <form>
                                    <div className="row">
                                      <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                          <label>Title</label>
                                          <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Enter Title"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                          <label>URL</label>
                                          <input
                                            type="email"
                                            className="form-control"
                                            placeholder="www.google.com"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                          <label>Patent Office</label>
                                          <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Enter Patent Office"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                          <label>Status</label>
                                          <div className="row">
                                            <div className="col-lg-6 col-md-6">
                                              <div className="custom-control custom-radio">
                                                <input
                                                  type="radio"
                                                  className="custom-control-input"
                                                  id="check2"
                                                  name="example1"
                                                />
                                                <label
                                                  className="custom-control-label"
                                                  htmlFor="check2"
                                                >
                                                  Patent Issued
                                                </label>
                                              </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6">
                                              <div className="custom-control custom-radio">
                                                <input
                                                  type="radio"
                                                  className="custom-control-input"
                                                  id="check3"
                                                  name="example1"
                                                />
                                                <label
                                                  className="custom-control-label"
                                                  htmlFor="check3"
                                                >
                                                  Patent pending
                                                </label>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                          <label>Application Number</label>
                                          <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Enter Application Number"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                          <label>Published On</label>
                                          <div className="row">
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                              <Form.Control as="select">
                                                \n
                                              </Form.Control>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                              <Form.Control as="select"></Form.Control>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                          <label>Description</label>
                                          <textarea
                                            className="form-control"
                                            placeholder="Type Description"
                                          ></textarea>
                                        </div>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    className="site-button"
                                    onClick={() => setPatent(false)}
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
                        <div className="list-line">
                          <div className="d-flex">
                            <h6 className="font-14 m-b5">Certification</h6>
                            <Link
                              to={"#"}
                              onClick={() => setCertification(true)}
                              className="site-button add-btn button-sm"
                            >
                              <i className="fa fa-pencil m-r5"></i> Edit
                            </Link>
                          </div>
                          <p className="m-b0">
                            Add details of Certification you have filed.
                          </p>
                          <Modal
                            className="modal fade modal-bx-info editor"
                            show={certification}
                            onHide={setCertification}
                          >
                            <div className="modal-dialog my-0" role="document">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5
                                    className="modal-title"
                                    id="CertificationModalLongTitle"
                                  >
                                    Certification
                                  </h5>
                                  <button
                                    type="button"
                                    className="close"
                                    onClick={() => setCertification(false)}
                                  >
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>
                                <div className="modal-body">
                                  <form>
                                    <div className="row">
                                      <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                          <label>Certification Name</label>
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Certification Name"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                          <label>Certification Body</label>
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Certification Body"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                          <label>Year Onlabel</label>
                                          <Form.Control as="select"></Form.Control>
                                        </div>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    className="site-button"
                                    onClick={() => setCertification(false)}
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
                        <i className="fa fa-pencil m-r5"></i> Edit
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
