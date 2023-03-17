import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { connect, useDispatch } from "react-redux";
import {
  loadingToggleAction,
  companySignupAction,
} from "../../store/actions/AuthActions";
import {
  getListCompanyType,
  getListIndustry,
} from "../../services/GetListService";
import { getInfoCompany } from "../../services/CompanyApi";
import RegisterLayout from "../../customComponents/RegisterLayout/RegisterLayout";
import FormRegister from "../../components/Registers/CompanyRegister/Step1/FormRegister";
import FormRegister1 from "../../components/Registers/CompanyRegister/Step2/FormRegister1";
import useRegister from "../../hooks/useRegister";
import useGetOptions from "../../hooks/useGetOptions";
import Stepper from "../../customComponents/Stepper/Stepper";

function Register2(props) {
  const { setInfoRegister1, registerCompany } = useRegister(props.history);
  const { optionsSelect, fetchFieldOptions, getCompanyInfo } =
    useGetOptions(false);
  const [businessLicense, setBusinessLicense] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  const [managedBy, setManagedBy] = useState("");
  const [engName, setEngName] = useState("");
  const [sortName, setSortName] = useState("");
  const [address, setAddress] = useState("");
  const [taxCode, setTaxCode] = useState("");
  const [representative, setRepresentative] = useState("");
  const [openDate, setOpenDate] = useState("");
  const [status, setStatus] = useState("");
  const [typeOfBusiness, setTypeOfBusiness] = useState("");
  const [step, setStep] = useState(1);
  let totalStep = [
    { step: 1, title: "Thông tin đăng ký" },
    { step: 2, title: "Thông tin công ty" },
  ];
  const dispatch = useDispatch();

  // function getCompanyInfo(e) {
  //   let value = e.target.value;
  //   console.log(value);
  //   getInfoCompany(value)
  //     .then((res) => {
  //       if (res) {
  //         console.log(res);
  //         setAddress(res.address);
  //         setOpenDate(res.openDate);
  //         setTaxCode(res.taxCode);
  //         setCompanyName(res.companyName);
  //         setCompanyPhone(res.companyPhone);
  //         setRepresentative(res.representative);
  //         setManagedBy(res.managedBy);
  //         setStatus(res.status);
  //         setEngName(res.engName);
  //         setSortName(res.sortName);
  //         setTypeOfBusiness(res.typeOfBusiness);
  //       }
  //     })
  //     .catch((e) => {});
  // }

  return (
    <RegisterLayout>
      <h3 className='form-title m-t0'>Đăng ký doanh nghiệp</h3>
      <Stepper step={step} totalStep={totalStep} />
      <div className={step === 1 ? `appear` : `register-steps`}>
        <FormRegister
          setStep={setStep}
          setInfoRegister1={setInfoRegister1}
          fetchFieldOptions={fetchFieldOptions}
        />
      </div>
      <div className={step === 2 ? `appear` : `register-steps`}>
        <FormRegister1
          setStep={setStep}
          optionsSelect={optionsSelect}
          getCompanyInfo={getCompanyInfo}
          registerCompany={registerCompany}
        />
      </div>
    </RegisterLayout>
  );
}
const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};
export default connect(mapStateToProps)(Register2);
