import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header2 from "./../Layout/Header2";
import Footer from "./../Layout/Footer";
import SavedJobs from "./../Element/SavedJobs";
import { Form, FormControl } from "react-bootstrap";
import Select from "react-select";
import Profilesidebar from "./../Element/Profilesidebar";
import { getMyResume, findJob } from "../../services/EmployeeApi";
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
      setPosition(data.jobCriteria.position.map(item=>({label:item,value:item})));
      setJobTitle(formatValue(data.jobCriteria.jobTitle));
      setEnvironment(data.jobCriteria.environment.map(item=>({label:item,value:item})));
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
    };
    let jobs = await findJob(resume._id, data);
    setListJob(jobs.data);
    console.log(jobs.data);
  };
  return (
    <>
      <Header2 />
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white p-t50 p-b20">
            <div className="container">
              <div className="row">
                <Profilesidebar url={props.location.pathname} />
                <div className="col-xl-9 col-lg-8 m-b30">
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
                              Tìm việc
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <SavedJobs />
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
