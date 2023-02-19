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
          {listJob
            ?.filter((item) => item)
            .map((item, idx) => (
              <ItemListNeededPostion
                key={idx}
                item={item}
                handleOpenModalCompany={handleOpenModalCompany}
                keyDepart={keyDepart}
                setReload={setReload}
              />
            ))}
        </tbody>
      </table>
    </>
  );
};

export default TabListJobs;
