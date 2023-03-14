import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import {
  getListSchools,
  getListProvince,
  getListMajorByLevel,
  getListLevel,
  getListDistrict,
  getListWard,
  getListJobTitle,
} from "../../services/GetListService";
import {
  loadingToggleAction,
  employeeSignupAction,
} from "../../store/actions/AuthActions";
import FormRegister from "../../components/EmployeeRegister/Step1/FormRegister";
import FormRegister1 from "../../components/EmployeeRegister/Step2/FormRegister1";
import "../../components/EmployeeRegister/RegisterStyles.css";
import FormRegister2 from "../../components/EmployeeRegister/Step3/FormRegister2";
var bnr = require("./../../images/background/bg6.jpg");
function Register2(props) {
  let errorsObj = {
    name: "",
    username: "",
    birthday: "",
    gender: "",
    province: "",
    district: "",
    ward: "",
    address: "",
    level: "",
    school: "",
    major: "",
    jobTitle: "",
    startYear: "",
    endYear: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [errors, setErrors] = useState(errorsObj);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [address, setAddress] = useState("");
  const [level, setLevel] = useState("");
  const [school, setSchool] = useState("");
  const [major, setMajor] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [levels, setLevels] = useState([]);
  const [schools, setSchools] = useState([]);
  const [majors, setMajors] = useState([]);
  const [jobTitles, setJobTitles] = useState([]);
  const [isAgree, setIsAgree] = useState(false);
  const [step, setStep] = useState(1);
  const genderOptions = [
    { value: "Nam", label: "Nam" },
    { value: "Nữ", label: "Nữ" },
  ];

  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      getListLevel().then((res) => {
        setLevels(res.data.map((item) => ({ value: item, label: item })));
      });
      getListSchools().then((res) => {
        setSchools(
          res.data.map((item) => ({ value: item._id, label: item.name }))
        );
      });
      getListProvince().then((res) => {
        setProvinces(res.data.map((item) => ({ value: item, label: item })));
      });
      getListJobTitle().then((res) => {
        setJobTitles(
          res.data.map((item) => ({ value: item.name, label: item.name }))
        );
      });
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchDistrictAndWard() {
      if (province !== "") {
        let listDistrict = await getListDistrict(province);
        setDistricts(
          listDistrict.data.map((item) => ({ value: item, label: item }))
        );
      }
      if (district !== "") {
        let listWard = await getListWard(province, district);
        setWards(listWard.data.map((item) => ({ value: item, label: item })));
        setWard("");
      }
    }
    fetchDistrictAndWard();
  }, [province, district]);

  useEffect(() => {
    async function fetchSchoolAndMajor() {
      if (level !== "") {
        let listMajor = await getListMajorByLevel(level);
        setMajors(listMajor.data.map((item) => ({ value: item, label: item })));
        setMajor("");
      }
    }
    fetchSchoolAndMajor();
  }, [level]);
  function onSubmitStep1(e) {
    console.log("123");
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
    if (name === "") {
      errorObj.name = "Vui lòng nhập tên";
      error = true;
    }
    if (name !== "" && !name.includes(" ")) {
      errorObj.name = "Vui lòng nhập đầy đủ họ và tên";
      error = true;
    }
    if (username === "") {
      errorObj.username = "Vui lòng nhập số điện thoại";
      error = true;
    }
    if (username !== "" && username.length !== 10) {
      errorObj.username = "Số điện thoại không hợp lệ";
      error = true;
    }
    if (birthday === "") {
      errorObj.birthday = "Vui lòng nhập ngày sinh";
      error = true;
    }
    if (gender === "") {
      errorObj.gender = "Vui lòng nhập giới tính";
      error = true;
    }
    if (email === "") {
      errorObj.email = "Vui lòng nhập email";
      error = true;
    }
    if (email !== "" && !email.includes("@") && !email.includes(".")) {
      errorObj.email = "Email không hợp lệ";
      error = true;
    }
    if (password === "") {
      errorObj.password = "Vui lòng nhập mật khẩu";
      error = true;
    }
    if (password !== "" && password.length < 6) {
      errorObj.password = "Mật khẩu phải có ít nhất 6 ký tự";
      error = true;
    }
    if (password !== "" && password.length > 20) {
      errorObj.password = "Mật khẩu không được quá 20 ký tự";
      error = true;
    }
    if (confirmPassword === "") {
      errorObj.confirmPassword = "Vui lòng nhập lại mật khẩu";
      error = true;
    }
    if (confirmPassword !== "" && confirmPassword !== password) {
      errorObj.confirmPassword = "Mật khẩu không khớp";
      error = true;
    }
    setErrors(errorObj);
    if (!error) {
      setStep(2);
    }
  }
  function onSubmitStep2(e) {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
    if (province === "") {
      errorObj.province = "Vui lòng nhập tỉnh/thành phố";
      error = true;
    }
    if (district === "") {
      errorObj.district = "Vui lòng nhập quận/huyện";
      error = true;
    }
    if (ward === "") {
      errorObj.ward = "Vui lòng nhập phường/xã";
      error = true;
    }
    if (address === "") {
      errorObj.address = "Vui lòng nhập địa chỉ";
      error = true;
    }
    setErrors(errorObj);
    if (!error) {
      setStep(3);
    }
  }
  function onSignUp(e) {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };

    if (level === "") {
      errorObj.level = "Vui lòng nhập trình độ";
      error = true;
    }
    if (school === "") {
      errorObj.school = "Vui lòng nhập trường";
      error = true;
    }
    if (major === "") {
      errorObj.major = "Vui lòng nhập chuyên ngành";
      error = true;
    }
    if (jobTitle === "") {
      errorObj.jobTitle = "Vui lòng nhập chức danh";
      error = true;
    }
    if (startYear === "") {
      errorObj.startYear = "Vui lòng nhập năm bắt đầu";
      error = true;
    }
    if (endYear === "") {
      errorObj.endYear = "Vui lòng nhập năm kết thúc";
      error = true;
    }

    setErrors(errorObj);
    if (error) return;
    dispatch(loadingToggleAction(true));
    let data = {
      name,
      username,
      birthday,
      gender,
      province,
      district,
      ward,
      address,
      level,
      school,
      major,
      jobTitle,
      startYear,
      endYear,
      email,
      password,
    };
    dispatch(employeeSignupAction(data, props.history));
  }

  return (
    <div className='container-fluid '>
      <div className='row register-container'>
        <div className='col-md-6 col-sm-12 col-12 bg-white'>
          <div className=' register-wrapper'>
            <div className='container-md form-container'>
              <div className='header-regiser'>
                <Link to={"./"}>
                  <h1 className='m-b0'>CVIDPRO</h1>
                </Link>
              </div>
              <div className='wrapper-form'>
                <div className={step === 1 ? `appear` : `register-steps`}>
                  <FormRegister setStep={setStep} />
                </div>
                <div className={step === 2 ? ` appear` : `register-steps`}>
                  <FormRegister1 setStep={setStep} />
                </div>
                <div className={step === 3 ? `appear` : `register-steps`}>
                  <FormRegister2 setStep={setStep} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-md-6 col-sm-12 col-12 bg-white register-img'></div>
      </div>
    </div>
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
