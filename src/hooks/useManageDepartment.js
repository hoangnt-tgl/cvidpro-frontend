import React, { useState, useEffect } from 'react';
import {
  createDepartment,
  deleteDepartment,
  editDepartment,
  getMyCompany,
} from '../services/CompanyApi';
import { getListDepartment } from '../services/DepartmentApi';
import { toast } from 'react-hot-toast';

const useManageDepartment = (props) => {
  const [companyInfo, setCompanyInfo] = useState({});
  const [reload, setReload] = useState(false);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [company, setCompany] = useState(false);
  const [addDepartment, setAddDepartment] = useState(false);
  const [listDepartment, setListDepartment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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
      // console.log('data', { ...data, companyId: companyInfo._id });
      await editDepartment({ ...data, companyId: companyInfo._id });
      setCompany(false);
      setReload(!reload);
      toast.success('Sửa thông tin phòng ban thành công');
    } catch (error) {
      toast.error('Vui lòng thử lại');
    }
  }
  async function handleDeleteDepartment(id) {
    try {
      await deleteDepartment(id);
      setReload(!reload);
      toast.success('Xóa phòng ban thành công');
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
  return {
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
  };
};

export default useManageDepartment;
