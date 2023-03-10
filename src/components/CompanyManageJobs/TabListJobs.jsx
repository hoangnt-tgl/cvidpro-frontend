import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteJobForDepartment } from "../../services/CompanyApi";
import ItemListNeededPostion from "./ItemListNeededPostion/ItemListNeededPostion";

const TabListJobs = ({
  listJob,
  handleOpenModalCompany,
  keyDepart,
  setShowAddJob,
  setReload,
  // list default values
  setNewJob,
  newJob,
  jobTitleOption,
  positionOptions,
  levelOptions,
  majorOptions,
  industryOptions,
  provinceOptions,
  environmentOption,
  questionOptions,
  handleAddJob,
  newQuestion,
  setNewQuestion,
  childQuestion,
  setChildQuestion,
  handleAddQuestion,
  deleteAddOnQuestion,
  addOnQuestionOptions,
  setAddOnQuestionOptions,
  preloadValue,
}) => {
  return (
    <>
      {" "}
      <div className='job-bx-title clearfix'>
        <h5 className='font-weight-700 pull-left text-uppercase my-2'>
          Vị trí tuyển dụng{" "}
          <i
            className='fa fa-plus text-primary'
            onClick={() => setShowAddJob(true)}
          ></i>
        </h5>
      </div>
      <table className='table-job-bx cv-manager company-manage-job'>
        <thead>
          <tr>
            <th>Chức danh</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {listJob?.map((item, idx) => (
            <ItemListNeededPostion
              key={idx}
              index={idx}
              item={item}
              handleOpenModalCompany={handleOpenModalCompany}
              keyDepart={keyDepart}
              setReload={setReload}
              // list default value
              levelOptions={levelOptions}
              provinceOptions={provinceOptions}
              jobTitleOption={jobTitleOption}
              industryOptions={industryOptions}
              positionOptions={positionOptions}
              majorOptions={majorOptions}
              questionOptions={questionOptions}
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
              addOnQuestionOptions={addOnQuestionOptions}
              setAddOnQuestionOptions={setAddOnQuestionOptions}
              preloadValue={preloadValue}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TabListJobs;
