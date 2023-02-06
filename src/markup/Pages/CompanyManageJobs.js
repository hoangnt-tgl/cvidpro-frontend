import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Select from "react-select";
import Header2 from "../Layout/HeaderDepartment";
import Footer from "../Layout/Footer";
import { Modal } from "react-bootstrap";
import CompanySidebar from "../Element/DepartmentSidebar";
import {
  getDepartmentByKey,
  createJobForDepartment,
  deleteJobForDepartment,
} from "../../services/CompanyApi";
import {
  getListSchools,
  getListProvince,
  getListJobTitle,
  getListIndustry,
  getListLevel,
  getListPosition,
  getListEnvironment,
  getAllListMajor,
} from "../../services/GetListService";

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
  };
  const [reload, setReload] = useState(false);
  const [newJob, setNewJob] = useState(objJob);
  const [company, setCompany] = useState(false);
  const [showAddJob, setShowAddJob] = useState(false);
  const [department, setDepartment] = useState({});
  const [levelOptions, setLevelOptions] = useState([]);
  const [provinceOptions, setProvinceOption] = useState([]);
  const [jobTitleOption, setJobTitleOption] = useState([]);
  const [industryOptions, setIndustryOptions] = useState([]);
  const [positionOptions, setPositionOptions] = useState([]);
  const [majorOptions, setMajorOptions] = useState([]);
  const [environmentOption, setEnvironmentOption] = useState([]);

  //   let key = localStorage.getItem("key");
  useEffect(() => {
    async function fetchData() {
      let departmentInfo = await getDepartmentByKey(key);
      setDepartment(departmentInfo);
      console.log(departmentInfo);
    }
    fetchData();
  }, [reload, key]);

  useEffect(() => {
    async function fetchData() {
      let listLevel = await getListLevel();
      setLevelOptions(
        listLevel.data.map((item) => ({ value: item, label: item }))
      );
      let listProvince = await getListProvince();
      setProvinceOption(
        listProvince.data.map((item) => ({ value: item, label: item }))
      );
      let listJobTitle = await getListJobTitle();
      setJobTitleOption(
        listJobTitle.data.map((item) => ({
          value: item.name,
          label: item.name,
        }))
      );
      let listPosition = await getListPosition();
      setPositionOptions(
        listPosition.data.map((item) => ({
          value: item.name,
          label: item.name,
        }))
      );
      let listIndustry = await getListIndustry();
      setIndustryOptions(
        listIndustry.data.map((item) => ({
          value: item.name,
          label: item.name,
        }))
      );
      let listMajor = await getAllListMajor();
      setMajorOptions(
        listMajor.data.map((item) => ({ value: item, label: item }))
      );
      let listEnvironment = await getListEnvironment();
      setEnvironmentOption(
        listEnvironment.data.map((item) => ({
          value: item.name,
          label: item.name,
        }))
      );
    }
    fetchData();
  }, []);

  const handleAddJob = async () => {
    await createJobForDepartment(key, newJob);
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
                      {department.jobs?.map((item) => (
                        <tr>
                          <td className="job-name">
                            <Link to={"#"}>{item.title}</Link>
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
    </>
  );
}
export default Companymanage;
