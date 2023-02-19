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
import useNeedRecuited from "../../hooks/useNeedRecuited";
import TabListJobs from "../../components/CompanyManageJobs/TabListJobs";
import ModalInfoNeededPosi from "../../components/CompanyManageJobs/ModalInfoNeededPosi/ModalInfoNeededPosi";
import ModalAddNeedPosi from "../../components/CompanyManageJobs/ModalAddNeededPosi/ModalAddNeedPosi";

function Companymanage(props) {
  let search = props.location.search;
  //??
  let params = new URLSearchParams(search);
  let key = params.get("key");
  if (key) {
    localStorage.setItem("key", key);
  }
  // key = localStorage.getItem("key"); ?? sao phai gan lai vao localstorage
  // ??
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
  ] = useNeedRecuited();
  const [reload, setReload] = useState(false);
  const [isShowModalInfo, setIsShowModalInfo] = useState(false);
  const [isShowModalAddJob, setIsShowModalAddJob] = useState(false);

  function handleOpenModalCompany() {
    setIsShowModalInfo(true);
  }
  function handleAddJob() {}
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
                    handleOpenModalCompany={handleOpenModalCompany}
                    key={key}
                    setShowAddJob={setIsShowModalAddJob}
                  />
                  <ModalInfoNeededPosi
                    company={isShowModalInfo}
                    setCompany={setIsShowModalInfo}
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
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {/* <Modal
        show={isShowModal}
        onHide={() => setIsShowModal(false)}
        className='modal fade modal-bx-info'
      >
        <Modal.Header closeButton>
          <Modal.Title>Thêm tiêu chí đánh giá</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='form-group'>
            <label for=''>Tên tiêu chí</label>
            <input
              type='text'
              className='form-control' //form-control-sm
              value={newQuestion.name}
              onChange={(e) => {
                setNewQuestion({ ...newQuestion, name: e.target.value });
              }}
            />
          </div>
          <div className='form-group'>
            <label for=''>Tiêu chí con</label>
            {newQuestion.detail.map((item, index) => {
              return (
                <>
                  <input
                    type='text'
                    className='form-control mb-2'
                    value={item}
                  />
                </>
              );
            })}
            <input
              type='text'
              className='form-control'
              value={childQuestion}
              onChange={(e) => setChildQuestion(e.target.value)}
            />
            <button
              className='btn btn-primary mt-2'
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
            type='button'
            className='btn btn-primary'
            onClick={handleAddQuestion}
          >
            Lưu
          </button>
          <button
            type='button'
            className='btn btn-secondary'
            onClick={() => setIsShowModal(false)}
          >
            Hủy
          </button>
        </Modal.Footer>
      </Modal> */}
    </>
  );
}
export default Companymanage;
