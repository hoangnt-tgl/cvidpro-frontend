import React, { useEffect, useState } from 'react';
import Header2 from './../Layout/HeaderCompany';
import Footer from './../Layout/Footer';
import { getMyCompany } from '../../services/CompanyApi';
import CompanyInfo from '../../components/CompanyComponents/CompanyProfile/CompanyInfo/index.jsx';
import CompanyPresenter from '../../components/CompanyComponents/CompanyProfile/CompanyPresenter/index.jsx';
import useCompanyInfo from '../../hooks/useCompanyInfo';

function Companyprofile(props) {
  const { companyInfo, isUpdate, selectUpdate } = useCompanyInfo(props);
  return (
    <>
      <Header2 />
      <div className='page-content bg-white'>
        <div className='content-block'>
          <div className='section-full bg-white p-t50 p-b20 px-3'>
            <div className='container'>
              <div className='m-b30'>
                {companyInfo.name && (
                  <div className='job-bx submit-resume row'>
                    <CompanyInfo companyInfo={companyInfo} />
                    <CompanyPresenter
                      companyInfo={companyInfo}
                      selectUpdate={selectUpdate}
                      isUpdate={isUpdate}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Companyprofile;
