import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import Header2 from "../Layout/HeaderDepartment";
import Footer from "../Layout/Footer";
import { createJob } from "../../services/JobApi";
import useNeedRecuited from "../../hooks/useNeedRecuited";
import TabListJobs from "../../components/CompanyManageJobs/TabListJobs";
import ModalAddNeedPosi from "../../components/CompanyManageJobs/ModalAddNeededPosi/ModalAddNeedPosi";

function Companymanage(props) {
  let search = props.location.search;
  //??
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
  const [
    listJob,
    department,
    levelOptions,
    provinceOptions,
    jobTitleOption,
    industryOptions,
    positionOptions,
    majorOptions,
    questionOptions,
    newQuestion,
    childQuestion,
    environmentOption,
    handleAddQuestion,
    newJob,
    setNewJob,
    setQuestionOptions,
    setNewQuestion,
    setChildQuestion,
    setReload,
    deleteAddOnQuestion,
  ] = useNeedRecuited(search);

  const [isShowModalInfo, setIsShowModalInfo] = useState(true);
  const [isShowModalAddJob, setIsShowModalAddJob] = useState(false);

  function handleToggleModalCompany() {
    setIsShowModalInfo(!isShowModalInfo);
    console.log("123");
  }
  const handleAddJob = async () => {
    await createJob({
      ...newJob,
      departmentId: department._id,
      companyId: department.companyId,
    });
    setIsShowModalAddJob(false);
    setNewJob(objJob);
    setReload((prev) => !prev);
  };
  return (
    <>
      <Header2 />
      <div className='page-content bg-white'>
        <div className='content-block'>
          <div className='section-full bg-white p-t50 p-b20'>
            <div className='container'>
              <div className='m-b30'>
                <div className='job-bx browse-job clearfix'>
                  <TabListJobs
                    listJob={listJob}
                    handleOpenModalCompany={handleToggleModalCompany}
                    search={search}
                    setShowAddJob={setIsShowModalAddJob}
                    setReload={setReload}
                    keyDepart={key}
                  />
                  {/* Modal tạo vị trí tuyển dụng */}
                  <ModalAddNeedPosi
                    showAddJob={isShowModalAddJob}
                    setShowAddJob={setIsShowModalAddJob}
                    levelOptions={levelOptions}
                    provinceOptions={provinceOptions}
                    jobTitleOption={jobTitleOption}
                    industryOptions={industryOptions}
                    positionOptions={positionOptions}
                    majorOptions={majorOptions}
                    questionOptions={questionOptions}
                    setQuestionOptions={setQuestionOptions}
                    newQuestion={newQuestion}
                    environmentOption={environmentOption}
                    handleAddQuestion={handleAddQuestion}
                    setNewJob={setNewJob}
                    newJob={newJob}
                    handleAddJob={handleAddJob}
                    setNewQuestion={setNewQuestion}
                    childQuestion={childQuestion}
                    setChildQuestion={setChildQuestion}
                    deleteAddOnQuestion={deleteAddOnQuestion}
                  />
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
