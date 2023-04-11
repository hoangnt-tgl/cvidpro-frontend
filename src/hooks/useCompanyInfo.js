import React, { useState, useEffect } from 'react';
import { getMyCompany } from '../services/CompanyApi';

const useCompanyInfo = (props) => {
  const [companyInfo, setCompanyInfo] = useState({});
  const [isUpdate, setIsUpdate] = useState('');
  function selectUpdate(e) {
    console.log(e.target.dataset.update);
    setIsUpdate(e.target.dataset.update);
  }
  useEffect(() => {
    async function fetchData() {
      let myCompany = await getMyCompany(props.history);
      setCompanyInfo(myCompany);
      console.log(myCompany);
    }
    fetchData();
  }, []);
  return { companyInfo, isUpdate, selectUpdate };
};

export default useCompanyInfo;
