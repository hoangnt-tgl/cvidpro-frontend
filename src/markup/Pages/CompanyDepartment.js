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

import { toast } from 'react-hot-toast';
function CompanyDepartment(props) {
  const [companyInfo, setCompanyInfo] = useState({});
  const [reload, setReload] = useState(false);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [company, setCompany] = useState(false);
  const [addDepartment, setAddDepartment] = useState(false);
  const [listDepartment, setListDepartment] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newDepartment, setNewDepartment] = useState({
    departmentName: '',
    managerName: '',
    managerEmail: '',
  });
  const [selectedDepartment, setSelectedDepartment] = useState({});

  function handleSelectDepartment(department) {
    setSelectedDepartment(department);
    setCompany(true);
  }

  async function handleAddDepartment(data) {
    try {
      await createDepartment({ ...data, companyId: companyInfo._id });
      setAddDepartment(false);
      setReload(true);
      toast.success('Thêm phòng ban thành công');
    } catch (error) {
      toast.error('Vui lòng thử lại');
    }
  }
  async function handleEditDepartment(data) {
    try {
      await editDepartment({ ...data, companyId: companyInfo._id });
      setCompany(false);
      setReload(!reload);
      toast.success('Sửa thông tin phòng ban thành công');
    } catch (error) {
      toast.error('Vui lòng thử lại');
    }
  }
  useEffect(() => {
    async function fetchData() {
      let myCompany = await getMyCompany(props.history);
      setCompanyInfo(myCompany);
      setIsLoading(false);
    }
    fetchData();
    window.addEventListener('resize', () => setInnerWidth(window.innerWidth));
    setReload(false);
  }, []);
  useEffect(() => {
    async function fetchData() {
      if (companyInfo._id) {
        let { data } = await getListDepartment(companyInfo._id);
        setListDepartment(data);
      }
    }
    fetchData();
    window.addEventListener('resize', () => setInnerWidth(window.innerWidth));
    setReload(false);
  }, [reload, companyInfo]);

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
                    {companyInfo?.confirm2?.confirmed === 1 && (
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
                        listDepartment?.length === 0 &&
                        !isLoading && (
                          <>
                            <tr className='text-center'>
                              <td colSpan='4'>Chưa có phòng ban nào</td>
                            </tr>
                          </>
                        )}
                      {companyInfo.confirm2?.confirmed !== 1 && !isLoading && (
                        <>
                          <tr className='text-center'>
                            <td colSpan='4'>Tài khoản chưa được duyệt</td>
                          </tr>
                        </>
                      )}
                      {listDepartment.map((department, index) => {
                        return (
                          <tr key={index}>
                            <td className='job-name'>
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
                              <Link
                                to={'#'}
                                onClick={() =>
                                  handleSelectDepartment(department)
                                }
                              >
                                <i className='fa fa-eye'></i>
                              </Link>
                              <Link to={'#'}>
                                <i className='ti-trash'></i>
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
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
                    preloadValue={{
                      departmentName: selectedDepartment.departmentName,
                      managerName: selectedDepartment.managerName,
                      managerEmail: selectedDepartment.managerEmail,
                    }}
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
