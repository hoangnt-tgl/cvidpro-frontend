import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header2 from "./../Layout/HeaderEmployee";
import Footer from "./../Layout/Footer";
import SavedJobs from "./../Element/SavedJobs";
import { Form, FormControl } from "react-bootstrap";
import Select from "react-select";
import Profilesidebar from "./../Element/Profilesidebar";
import { getMyResume, findJob } from "../../services/EmployeeApi";
import ModalSelectJob from "./../Element/ModalSelectJob";
import { displaySalary } from "../../services/DisplayService";
import {
  getListLevel,
  getListSchools,
  getAllListMajor,
  getListJobTitle,
  getListPosition,
  getListCompanyType,
  getListProvince,
  getListEnvironment,
  getListIndustry,
} from "../../services/GetListService";
function Jobsavedjobs(props) {
  const [resume, setResume] = useState("");
  const [reload, setReload] = useState(false);
  const [modalSelectJob, setModalSelectJob] = useState(false);
  const [jobId, setJobId] = useState("");

  const [position, setPosition] = useState(null);
  const [jobTitle, setJobTitle] = useState(null);
  const [companyType, setCompanyType] = useState(null);
  const [province, setProvince] = useState(null);
  const [environment, setEnvironment] = useState(null);
  const [industry, setIndustry] = useState(null);
  const [major, setMajor] = useState(null);

  // const [levelOption, setLevelOption] = useState([]);
  const [jobTitleOption, setJobTitleOption] = useState([]);
  const [envrionmentOption, setEnvrionmentOption] = useState([]);
  const [majorOption, setMajorOption] = useState([]);
  const [positionOption, setPositionOption] = useState([]);
  // const [schoolOption, setSchoolOption] = useState([]);
  const [provinceOption, setProvinceOption] = useState([]);
  const [industryOption, setIndustryOption] = useState([]);
  const [typeBusinessOption, setTypeBusinessOption] = useState([]);
  const [listJob, setListJob] = useState([]);

  const formatValue = (value) => {
    if (value) {
      return { label: value, value: value };
    }
    return null;
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      let data = await getMyResume();
      setResume(data);
      setPosition(
        data.jobCriteria.position.map((item) => ({ label: item, value: item }))
      );
      setJobTitle(formatValue(data.jobCriteria.jobTitle));
      setEnvironment(
        data.jobCriteria.environment.map((item) => ({
          label: item,
          value: item,
        }))
      );
      setMajor(formatValue(data.jobCriteria.major));
      setCompanyType(formatValue(data.jobCriteria.companyType));
      setProvince(formatValue(data.jobCriteria.province));
      console.log(data);
    };

    fetchData();
  }, [reload]);

  useEffect(() => {
    const fetchData = async () => {
      // let listLevel = await getListLevel();
      // setLevelOption(
      //   listLevel.data.map((item) => ({ value: item, label: item }))
      // );
      // let listSchool = await getListSchools();
      // setSchoolOption(
      //   listSchool.data.map((item) => ({ value: item.name, label: item.name }))
      // );
      let listMajor = await getAllListMajor();
      setMajorOption(
        listMajor.data.map((item) => ({ value: item, label: item }))
      );
      // let listQuestion = await getListQuestion();
      // setQuestions(listQuestion.data);
      let listJobTitle = await getListJobTitle();
      setJobTitleOption(
        listJobTitle.data.map((item) => ({
          value: item.name,
          label: item.name,
        }))
      );
      let listPosition = await getListPosition();
      setPositionOption(
        listPosition.data.map((item) => ({
          value: item.name,
          label: item.name,
        }))
      );
      let listCompanyType = await getListCompanyType();
      setTypeBusinessOption(
        listCompanyType.data.map((item) => ({
          value: item.name,
          label: item.name,
        }))
      );
      let listProvince = await getListProvince();
      setProvinceOption(
        listProvince.data.map((item) => ({
          value: item,
          label: item,
        }))
      );
      let listEnvironment = await getListEnvironment();
      setEnvrionmentOption(
        listEnvironment.data.map((item) => ({
          value: item.name,
          label: item.name,
        }))
      );
      let listIndustry = await getListIndustry();
      setIndustryOption(
        listIndustry.data.map((item) => ({
          value: item.name,
          label: item.name,
        }))
      );
    };
    fetchData();
  }, []);

  const handleFindJob = async (e) => {
    e.preventDefault();
    resume.jobCriteria.status = !resume.jobCriteria.status;
    let data = {
      position: position ? position.map((item) => item.value) : undefined,
      jobTitle: jobTitle ? jobTitle.value : undefined,
      companyType: companyType ? companyType.value : undefined,
      province: province ? province.value : undefined,
      environment: environment
        ? environment.map((item) => item.value)
        : undefined,
      industry: industry ? industry.value : undefined,
      major: major ? major.value : undefined,
      status: resume.jobCriteria.status,
    };
    console.log(data);
    let jobs = await findJob(resume._id, data);
    console.log(jobs.data);
    setListJob(jobs.data);
  };
  return (
    <>
      <Header2 />
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white p-t50 p-b20">
            <div className="container">
              <div className=" m-b30">
                <div className="section-full">
                  <div className="find-job-bx">
                    <form className="dezPlaceAni">
                      <div className="row">
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <FormControl
                              as={Select}
                              custom
                              placeholder="Chuyên nghành mong muốn"
                              value={major}
                              options={majorOption}
                              onChange={(e) => setMajor(e)}
                            ></FormControl>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <FormControl
                              as={Select}
                              custom
                              placeholder="Chức danh mong muốn"
                              options={jobTitleOption}
                              value={jobTitle}
                              onChange={(e) => setJobTitle(e)}
                            ></FormControl>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <FormControl
                              as={Select}
                              custom
                              placeholder="Chức vụ mong muốn"
                              options={positionOption}
                              onChange={(e) => setPosition(e)}
                              value={position}
                              isClearable={true}
                              isMulti={true}
                              closeMenuOnSelect={false}
                            ></FormControl>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <FormControl
                              as={Select}
                              custom
                              placeholder="Môi trường làm việc mong muốn"
                              options={envrionmentOption}
                              value={environment}
                              onChange={(e) => setEnvironment(e)}
                              isClearable={true}
                              isMulti={true}
                              closeMenuOnSelect={false}
                            ></FormControl>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <FormControl
                              as={Select}
                              custom
                              placeholder="Lĩnh vực mong muốn"
                              value={industry}
                              options={industryOption}
                              onChange={(e) => setIndustry(e)}
                              isClearable={true}
                            ></FormControl>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <FormControl
                              as={Select}
                              custom
                              placeholder="Loại hình đơn vị tuyển dụng"
                              options={typeBusinessOption}
                              value={companyType}
                              onChange={(e) => setCompanyType(e)}
                              isClearable={true}
                            ></FormControl>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <FormControl
                              as={Select}
                              custom
                              placeholder="Nơi làm việc mong muốn"
                              value={province}
                              options={provinceOption}
                              onChange={(e) => setProvince(e)}
                              isClearable={true}
                            ></FormControl>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <button
                            type="submit"
                            className="site-button btn-block"
                            style={{ zIndex: "auto" }}
                            onClick={handleFindJob}
                          >
                            {resume.jobCriteria?.status
                              ? "Tìm kiếm"
                              : "Dừng tìm"}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="job-bx clearfix">
                  <div className="job-bx-title clearfix d-flex align-items-center">
                    <h5 className="font-weight-700 pull-left text-uppercase mr-auto my-0">
                      {listJob.length} Ứng viên
                    </h5>
                    {/* <div className="float-right">
                        <span className="select-title">Sắp xếp: </span>
                        <select className="custom-btn btn-sm">
                          <option disabled>Chọn ...</option>
                          <option>Điểm CV</option>
                          <option>Tùy chọn 2</option>
                          <option>Tùy chọn 3</option>
                        </select>
                      </div> */}
                    {/* <Link to={"/company-manage-job"} className="site-button right-arrow button-sm float-right">Back</Link> */}
                  </div>
                  <ul className="post-job-bx browse-job-grid post-resume row">
                    {listJob.length === 0 && !resume.jobCriteria?.status && (
                      <>
                        <div className="col-lg-12 col-md-12">
                          <div className="post-bx">
                            <div className="d-flex">
                              <div className="job-post-info">
                                <h5 className="m-b0">
                                  <Link to={"/jobs-profile"}>
                                    Không có ứng viên nào
                                  </Link>
                                </h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {listJob.map((item, index) => (
                      <li className="col-lg-6 col-md-6" key={index}>
                        <div className="post-bx">
                          {/* <div className="d-flex m-b20"> */}
                          <div className="d-flex">
                            <div className="job-post-info">
                              <h5 className="m-b0">
                                <Link to={"/jobs-profile"}>{item.title}</Link>
                              </h5>
                              <p className="m-b5 font-13">
                                <Link to={"#"} className="text-primary">
                                  {item.position}{" "}
                                </Link>
                              </p>
                              <ul>
                                <li>
                                  <i className="fa fa-map-marker"></i>
                                  {item.location}
                                </li>
                                <li>
                                  <i className="fa fa-money"></i>
                                  {displaySalary(
                                    item.minSalary,
                                    item.maxSalary
                                  )}
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="job-time m-t15 m-b10">
                            {item.major.map((element, index) => (
                              <>
                                <Link to={"#"} className="mr-1">
                                  <span>{element}</span>
                                </Link>
                              </>
                            ))}
                          </div>
                          {/* <Link
                              to={"/files/pdf-sample.pdf"}
                              className="job-links"
                              style={{ bottom: "0px", left: "8px" }}
                            >
                              <i className="fa fa-check"></i>{" "}
                            </Link> */}
                          <Link
                            to={"/files/pdf-sample.pdf"}
                            target="blank"
                            className="job-links"
                            style={{ top: "8px", right: "8px" }}
                          >
                            <i className="fa fa-download"></i>
                          </Link>
                          <Link
                            to={"#"}
                            className="job-links"
                            style={{ top: "80%", right: "8px" }}
                            onClick={() => {
                              setModalSelectJob(true);
                              setJobId(item._id);
                            }}
                          >
                            <i className="fa fa-plus"></i>
                          </Link>
                        </div>
                        {item._id === jobId && (
                          <ModalSelectJob
                            show={modalSelectJob}
                            setShow={setModalSelectJob}
                            sender={"employee"}
                            employeeId={resume._id}
                            jobId={item._id}
                          />
                        )}
                      </li>
                    ))}
                  </ul>
                  {/* <div className="pagination-bx float-right">
                      <ul className="pagination">
                        <li className="previous">
                          <Link to={"#"}>
                            <i className="ti-arrow-left"></i> Prev
                          </Link>
                        </li>
                        <li className="active">
                          <Link to={"#"}>1</Link>
                        </li>
                        <li>
                          <Link to={"#"}>2</Link>
                        </li>
                        <li>
                          <Link to={"#"}>3</Link>
                        </li>
                        <li className="next">
                          <Link to={"#"}>
                            Next <i className="ti-arrow-right"></i>
                          </Link>
                        </li>
                      </ul>
                    </div> */}
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

export default Jobsavedjobs;
