import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteJobForDepartment } from "../../services/CompanyApi";
import ItemListNeededPostion from "./ItemListNeededPostion/ItemListNeededPostion";

const TabListJobs = ({
  listJob,
  handleOpenModalCompany,
  key,
  setShowAddJob,
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
          {listJob?.map((item) => (
            <ItemListNeededPostion
              item={item}
              handleOpenModalCompany={handleOpenModalCompany}
              key={key}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TabListJobs;
