import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import Header2 from '../Layout/HeaderDepartment';
import Footer from '../Layout/Footer';
import { createJob, updateJob } from '../../services/JobApi';
import useNeedRecuited from '../../hooks/useNeedRecuited';
import TabListJobs from '../../components/CompanyComponents/CompanyManageJobs/TabListJobs';
import ModalAddNeedPosi from '../../components/CompanyComponents/CompanyManageJobs/ModalAddNeededPosi/ModalAddNeedPosi';
import { toast } from 'react-hot-toast';

function Companymanage(props) {
  let search = props.location.search;
  //??
  let params = new URLSearchParams(search);
  let key = params.get('key');
  if (key) {
    localStorage.setItem('key', key);
  }
  key = localStorage.getItem('key');

  const objJob = {
    title: '',
    position: '',
    level: [],
    major: [],
    industry: '',
    location: '',
    workingEnvironment: '',
    experience: '',
    quantity: 0,
    salaryMin: 0,
    salaryMax: 0,
    description: '',
    question: [],
    addOnQuestion: [],
  };
  const initQuestion = {
    name: '',
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
    languagesOptions,
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
    addOnQuestionOptions,
    setAddOnQuestionOptions,
    preloadValue,
    handleGetLanguageDescription,
  ] = useNeedRecuited(search);

  const [isShowModalInfo, setIsShowModalInfo] = useState(true);
  const [isShowModalAddJob, setIsShowModalAddJob] = useState(false);

  function handleToggleModalCompany() {
    setIsShowModalInfo(!isShowModalInfo);
  }
  const handleAddJob = async (data) => {
    console.log(data);
    try {
      await createJob({
        ...data,
        // departmentId: department._id,
        // companyId: department.companyId,
        key: key,
      });
      setIsShowModalAddJob(false);
      setNewJob(objJob);
      setReload((prev) => !prev);
      toast.success('Thêm việc làm thành công');
    } catch (error) {
      toast.error('Thêm việc làm thất bại');
    }
  };

  const handleUpdateJob = async (id, data) => {
    console.log(data);
    try {
      await updateJob(id, {
        ...data,
        key: key,
      });
      setIsShowModalAddJob(false);
      setNewJob(objJob);
      setReload((prev) => !prev);
      toast.success('Sửa việc làm thành công');
    } catch (error) {
      toast.error('Sửa việc làm thất bại');
    }
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
                    // list default value
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
                    handleUpdateJob={handleUpdateJob}
                    setNewQuestion={setNewQuestion}
                    childQuestion={childQuestion}
                    setChildQuestion={setChildQuestion}
                    deleteAddOnQuestion={deleteAddOnQuestion}
                    addOnQuestionOptions={addOnQuestionOptions}
                    setAddOnQuestionOptions={setAddOnQuestionOptions}
                    preloadValue={preloadValue}
                    languagesOptions={languagesOptions}
                    handleGetLanguageDescription={handleGetLanguageDescription}
                  />
                  {/* Modal tạo vị trí tuyển dụng */}
                  <ModalAddNeedPosi
                    handleGetLanguageDescription={handleGetLanguageDescription}
                    showAddJob={isShowModalAddJob}
                    setShowAddJob={setIsShowModalAddJob}
                    isAddNew={true}
                    levelOptions={levelOptions}
                    provinceOptions={provinceOptions}
                    jobTitleOption={jobTitleOption}
                    industryOptions={industryOptions}
                    positionOptions={positionOptions}
                    majorOptions={majorOptions}
                    languagesOptions={languagesOptions}
                    questionOptions={questionOptions}
                    setQuestionOptions={setQuestionOptions}
                    newQuestion={newQuestion}
                    environmentOption={environmentOption}
                    handleAddQuestion={handleAddQuestion}
                    setNewJob={setNewJob}
                    newJob={newJob}
                    handleAddJob={handleAddJob}
                    handleUpdateJob={handleUpdateJob}
                    setNewQuestion={setNewQuestion}
                    childQuestion={childQuestion}
                    setChildQuestion={setChildQuestion}
                    deleteAddOnQuestion={deleteAddOnQuestion}
                    addOnQuestionOptions={addOnQuestionOptions}
                    setAddOnQuestionOptions={setAddOnQuestionOptions}
                    preloadValue={preloadValue}
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
