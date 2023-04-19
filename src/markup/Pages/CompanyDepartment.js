import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header2 from './../Layout/HeaderCompany';
import Footer from './../Layout/Footer';
import { Modal } from 'react-bootstrap';
import {
  createDepartment,
  getMyCompany,
  editDepartment,
} from '../../services/CompanyApi';
import { getListDepartment } from '../../services/DepartmentApi';
import ModalEditDeparment from '../../components/CompanyComponents/CompanyMangeDepartment/ModalEditDeparment/index.jsx';
import ModalCreateDepartment from '../../components/CompanyComponents/CompanyMangeDepartment/ModalCreateDepartment/index.jsx';

import Loader from '../../customComponents/Loader';
import useManageDepartment from '../../hooks/useManageDepartment';
function CompanyDepartment(props) {
  const {
    innerWidth,
    companyInfo,
    company,
    addDepartment,
    listDepartment,
    isLoading,
    selectedDepartment,
    handleSelectDepartment,
    handleAddDepartment,
    handleEditDepartment,
    handleDeleteDepartment,
    setAddDepartment,
    setCompany,
  } = useManageDepartment(props);

  return (
    <>
      <Header2 />
      <div className='page-content bg-white'>
        <div className='content-block'>
          <div className='section-full bg-white p-t50 p-b20'>
            <div className='container'>
              <div className='m-b30'>
                <div className='job-bx browse-job clearfix'>
                  <div className='job-bx-title  clearfix'>
                    <h5 className='font-weight-700 pull-left text-uppercase'>
                      Quản lý phòng ban
                    </h5>

                    {/* Nút tạo phòng ban bên phải */}
                    {companyInfo?.confirm2?.confirmed === 1 &&
                      listDepartment && (
                        <div className='float-right'>
                          <button
                            className='site-button float-right mb-3'
                            onClick={() => setAddDepartment(true)}
                          >
                            Tạo phòng ban
                          </button>
                        </div>
                      )}
                  </div>

                  <table className='table-job-bx cv-manager company-manage-job'>
                    <thead>
                      <tr>
                        <th>Tên phòng ban</th>
                        {innerWidth > 768 && <th>Người quản lí</th>}
                        {innerWidth > 768 && <th>Email</th>}
                        <th>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {companyInfo.confirm2?.confirmed === 1 &&
                      !isLoading &&
                      listDepartment ? (
                        <>
                          {listDepartment && (
                            <>
                              {listDepartment?.length === 0 ? (
                                <>
                                  {' '}
                                  <tr className='text-center'>
                                    <td colSpan='4'>Chưa có phòng ban nào</td>
                                  </tr>
                                </>
                              ) : (
                                <>
                                  {listDepartment.map((department, index) => {
                                    return (
                                      <tr key={index} className='appear'>
                                        <td className='job-name '>
                                          <Link
                                            to={`company-manage-jobs?key=${department.key}`}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            style={{ color: 'blue' }}
                                          >
                                            {department.departmentName}
                                          </Link>
                                        </td>
                                        {innerWidth > 768 && (
                                          <td className='application font-size-14'>
                                            {department.managerName}
                                          </td>
                                        )}
                                        {innerWidth > 768 && (
                                          <td className='expired font-size-14'>
                                            {department.managerEmail}
                                          </td>
                                        )}
                                        <td className='job-links'>
                                          <div
                                            onClick={() =>
                                              handleSelectDepartment(department)
                                            }
                                          >
                                            <i class='fa fa-pencil-square-o'></i>
                                          </div>
                                          <div>
                                            <i
                                              className='ti-trash'
                                              onClick={() =>
                                                handleDeleteDepartment(
                                                  department._id
                                                )
                                              }
                                            ></i>
                                          </div>
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </>
                              )}
                            </>
                          )}
                        </>
                      ) : !isLoading && listDepartment ? (
                        <>
                          <tr className='text-center'>
                            <td colSpan='4'>Tài khoản chưa được duyệt</td>
                          </tr>
                        </>
                      ) : (
                        <>
                          <tr className='text-center'>
                            <td colSpan='4'>
                              <Loader height={150} spinHeight={8} />
                            </td>
                          </tr>{' '}
                        </>
                      )}
                    </tbody>
                  </table>

                  {/* Modal tạo phòng ban */}
                  <ModalCreateDepartment
                    addDepartment={addDepartment}
                    setAddDepartment={setAddDepartment}
                    handleAddDepartment={handleAddDepartment}
                  />
                  {/* Modal edit phòng ban */}
                  <ModalEditDeparment
                    editDepartment={company}
                    setEditDepartment={setCompany}
                    preloadValue={selectedDepartment}
                    handleEditDepartment={handleEditDepartment}
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
export default CompanyDepartment;
