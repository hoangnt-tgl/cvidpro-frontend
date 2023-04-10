import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteJobForDepartment } from "../../../../services/CompanyApi";
import ModalAddNeedPosi from "../ModalAddNeededPosi/ModalAddNeedPosi";
import ModalInfoNeededPosi from "../ModalInfoNeededPosi/ModalInfoNeededPosi";

const ItemListNeededPostion = ({
  index,
  item,
  keyDepart,
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
  const [isShowEditPositionInfo, setIsShowEditPositionInfo] = useState(false);

  function getStatusJob(job) {
    if (job.confirm1.confirmed === -1) return "Không được duyệt";
    if (job.confirm2.confirmed !== 1) return "Đang chờ duyệt";
    if (job.status === 0) return "Dừng tuyển";
    if (job.status === 1) return "Đang tuyển";
  }
  const handleDeleteJob = async (idJob) => {
    await deleteJobForDepartment(keyDepart, idJob);
    setReload((prev) => !prev);
  };

  return (
    <>
      <tr>
        <td className='job-name'>
          <Link to={`company/job-detail/${item._id}`} target='_blank'>
            {item.title}
          </Link>
          <ul className='job-post-info'>
            <li>
              <i className='fa fa-bookmark-o'></i> {item.position}
            </li>
          </ul>
        </td>

        <td className='expired pending'>{getStatusJob(item)} </td>
        <td className='job-links'>
          <Link to={"#"} onClick={() => setIsShowEditPositionInfo(true)}>
            <i className='fa fa-eye'></i>
          </Link>
          <Link to={"#"} onClick={() => handleDeleteJob(item._id)}>
            <i className='ti-trash'></i>
          </Link>
        </td>
      </tr>
      {/* <ModalInfoNeededPosi
        setCompany={handleToggleModalCompany}
        company={isShowModalInfo}
        info={item}
      /> */}
      <ModalAddNeedPosi
        showAddJob={isShowEditPositionInfo}
        setShowAddJob={setIsShowEditPositionInfo}
        isAddNew={false}
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
        preloadValue={preloadValue[index]}
      />
    </>
  );
};

export default ItemListNeededPostion;
