import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteJobForDepartment } from '../../../../services/CompanyApi';
import ModalAddNeedPosi from '../ModalAddNeededPosi/ModalAddNeedPosi';

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
  handleUpdateJob,
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
    if (job.confirm1.confirmed === -1) return 'Không được duyệt';
    if (job.confirm2.confirmed !== 1) return 'Đang chờ duyệt';
    if (job.status === 0) return 'Dừng tuyển';
    if (job.status === 1) return 'Đang tuyển';
  }
  const handleDeleteJob = async (idJob) => {
    await deleteJobForDepartment(keyDepart, idJob);
    setReload((prev) => !prev);
  };
  const handleUpdateJobCloseModal = async (id, data) => {
    await handleUpdateJob(id, data);
    setIsShowEditPositionInfo(false);
  };

  return (
    <>
      <tr className='appear'>
        <td className='job-name '>
          <Link to={`company/job-detail/${item._id}`} target='_blank'>
            {item.title}
          </Link>
        </td>

        <td className='expired pending'>{getStatusJob(item)} </td>
        <td className='job-links'>
          <Link to={'#'} onClick={() => setIsShowEditPositionInfo(true)}>
            <i class='fa fa-pencil-square-o'></i>
          </Link>
          <Link to={'#'} onClick={() => handleDeleteJob(item._id)}>
            <i className='ti-trash'></i>
          </Link>
        </td>
      </tr>
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
        handleUpdateJob={handleUpdateJobCloseModal}
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
