import React, { useState } from "react";
import Header from "../../components/Header/Header";
import RegisterLayout from "../../customComponents/RegisterLayout/RegisterLayout";
import CompanyRegister1 from "./CompanyRegister1";
import IndividualRegister from "./IndividualRegister";

const CompanyRegisterBoth = () => {
  const [isIndividual, setIsIndividual] = React.useState(false);
  const [isStep2, setIsStep2] = useState(false);
  return (
    <>
      {" "}
      {/* <Header /> */}
      <RegisterLayout>
        <div className='font-size-14'>
          <h4 className='form-title m-t0'>Đăng ký tuyển dụng</h4>
          {!isStep2 && (
            <div className='my-2 select-type-wrapper'>
              <span>Loại hình tuyển dụng? </span>
              <div
                className=' d-flex justify-content-start w-70'
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
          )}

          <div>
            {" "}
            {!isIndividual ? (
              <CompanyRegister1 setIsStep2={setIsStep2} />
            ) : (
              <IndividualRegister setIsStep2={setIsStep2} />
            )}
          </div>
        </div>
      </RegisterLayout>
    </>
  );
};

export default CompanyRegisterBoth;
