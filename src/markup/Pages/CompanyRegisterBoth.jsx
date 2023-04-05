import React, { useState } from 'react';
import { useEffect } from 'react';
import Header from '../../components/Header/Header';
import RegisterLayout from '../../customComponents/RegisterLayout/RegisterLayout';
import CompanyRegister1 from './CompanyRegister1';
import IndividualRegister from './IndividualRegister';

const CompanyRegisterBoth = () => {
  const [isIndividual, setIsIndividual] = React.useState(false);
  const [isStep2, setIsStep2] = useState(false);
  const [isStep2In, setIsStep2In] = useState(false);
  const [offSelect, setOffSelect] = useState(false);
  useEffect(() => {
    console.log(isStep2);
  }, [isStep2]);
  return (
    <>
      {' '}
      {/* <Header /> */}
      <RegisterLayout>
        <div className='font-size-14'>
          <h4 className='form-title mb-4 text-uppercase'>Đăng ký tuyển dụng</h4>

          {!offSelect && (
            <div className='my-2 select-type-wrapper'>
              <span>Loại hình tuyển dụng</span>
              <div
                className=' d-flex justify-content-start w-70 flex-wrap'
                style={{ gap: '20px' }}
              >
                <div className='d-flex justify-content-center align-items-center'>
                  <input
                    className='checkbox-login mr-1'
                    type='checkbox'
                    checked={!isIndividual && true}
                    onClick={() => setIsIndividual(false)}
                    disabled={isStep2In ? true : false}
                  />
                  <span>Doanh nghiệp</span>
                </div>
                <div className='d-flex justify-content-center align-items-center'>
                  <input
                    className='checkbox-login mr-1'
                    type='checkbox'
                    checked={isIndividual && true}
                    onClick={() => setIsIndividual(true)}
                    disabled={isStep2 ? true : false}
                  />
                  <span>Kinh doanh cá thể</span>
                </div>
                <div className='d-flex justify-content-center align-items-center'>
                  <input
                    className='checkbox-login mr-1'
                    type='checkbox'
                    // checked={isIndividual && true}
                    // onClick={() => setIsIndividual(true)}
                    disabled={true}
                  />
                  <span>Hiệp hội, tổ chức</span>
                </div>
              </div>
            </div>
          )}

          <div>
            {' '}
            {!isIndividual ? (
              <CompanyRegister1
                setIsStep2={setIsStep2}
                setOffSelect={setOffSelect}
              />
            ) : (
              <IndividualRegister
                setIsStep2={setIsStep2In}
                setOffSelect={setOffSelect}
              />
            )}
          </div>
        </div>
      </RegisterLayout>
    </>
  );
};

export default CompanyRegisterBoth;
