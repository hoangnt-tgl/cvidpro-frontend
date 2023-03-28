import React, { useState } from "react";
import Header from "../../components/Header/Header";
import RegisterLayout from "../../customComponents/RegisterLayout/RegisterLayout";
import CompanyRegister1 from "./CompanyRegister1";
import IndividualRegister from "./IndividualRegister";

const CompanyRegisterBoth = () => {
  const [isIndividual, setIsIndividual] = React.useState(false);
  return (
    <>
      {" "}
      <Header />
      <RegisterLayout>
        <h3 className='form-title m-t0'>Đăng ký tuyển dụng</h3>
        <div className='my-2'>
          <h1>Chọn loại hình tuyển dụng </h1>
          <div
            className=' d-flex justify-content-start w-100'
            style={{ gap: "20px" }}
          >
            <div className='d-flex justify-content-center align-items-center'>
              <input
                className='checkbox-login mr-1'
                type='checkbox'
                checked={!isIndividual && true}
                onClick={() => setIsIndividual(false)}
              />
              <span>Doanh nghiệp</span>
            </div>
            <div className='d-flex justify-content-center align-items-center'>
              <input
                className='checkbox-login mr-1'
                type='checkbox'
                checked={isIndividual && true}
                onClick={() => setIsIndividual(true)}
              />
              <span>Cá nhân</span>
            </div>
          </div>
        </div>
        <div>
          {" "}
          {!isIndividual ? <CompanyRegister1 /> : <IndividualRegister />}
        </div>
      </RegisterLayout>
    </>
  );
};

export default CompanyRegisterBoth;
