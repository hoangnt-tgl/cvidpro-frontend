import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import {
  loadingToggleAction,
  employeeSignupAction,
} from "../../store/actions/AuthActions";
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
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [levels, setLevels] = useState([]);
  const [schools, setSchools] = useState([]);
  const [majors, setMajors] = useState([]);
  const [jobTitles, setJobTitles] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadingToggleAction(false));
  }, []);
  function onSignUp(e) {
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
      errorObj.username = "Vui lòng nhập tên đăng nhập";
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
    <div className="page-wraper">
      <div className="browse-job login-style3">
        <div className="bg-img-fix" style={{ backgroundImage: `url(${bnr})` }}>
          <div className="row">
            <div className="col-xl-4 col-lg-5 col-md-6 col-sm-12 bg-white z-index2 relative p-a0 content-scroll skew-section left-bottom">
              <div className="login-form style-2">
                <div className="logo-header text-center p-tb30">
                  <Link to={"./"}>
                    <h1 className="m-b0">CVIDPRO</h1>
                    {/* <img src={require("./../../images/logo.png")} alt="" /> */}
                  </Link>
                </div>
                <div className="clearfix"></div>
                <div className="tab-content nav p-b30 tab">
                  <div id="login" className="tab-pane active ">
                    {props.errorMessage && (
                      <div className="">{props.errorMessage}</div>
                    )}
                    {props.successMessage && (
                      <div className="">{props.successMessage}</div>
                    )}
                    <form className=" dez-form p-b30" onSubmit={onSignUp}>
                      <h3 className="form-title m-t0">Đăng kí người tìm việc</h3>
                      <div className="dez-separator-outer m-b5">
                        <div className="dez-separator bg-primary style-liner"></div>
                      </div>
                      <p>Vui lòng nhập chính xác thông tin</p>
                      <div className="form-group">
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="form-control"
                          placeholder="Nhập họ và tên"
                        />
                        <div className="text-danger">
                          {errors.name && <div>{errors.name}</div>}
                        </div>
                      </div>
                      <div className="form-group">
                        <input
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="form-control"
                          placeholder="Nhập tên đăng nhập"
                        />
                        <div className="text-danger">
                          {errors.username && <div>{errors.username}</div>}
                        </div>
                      </div>
                      <div className="form-group">
                        <input
                          type="date"
                          value={birthday}
                          onChange={(e) => setBirthday(e.target.value)}
                          className="form-control"
                          placeholder="Nhập ngày sinh"
                        />
                        <div className="text-danger">
                          {errors.birthday && <div>{errors.birthday}</div>}
                        </div>
                      </div>
                      <div className="form-group">
                        <select
                          className="form-control"
                          onChange={(e) => setGender(e.target.value)}
                        >
                          <option value="">Chọn giới tính</option>
                          <option value="Nam">Nam</option>
                          <option value="Nữ">Nữ</option>
                        </select>
                        <div className="text-danger">
                          {errors.gender && <div>{errors.gender}</div>}
                        </div>
                      </div>
                      <div className="form-group">
                        <select
                          className="form-control"
                          onChange={(e) => setProvince(e.target.value)}
                        >
                          <option value="">Chọn tỉnh/thành phố</option>
                          {provinces.map((province) => (
                            <option value={province.name}>
                              {province.name}
                            </option>
                          ))}
                        </select>
                        <div className="text-danger">
                          {errors.province && <div>{errors.province}</div>}
                        </div>
                      </div>
                      <div className="form-group">
                        <select
                          className="form-control"
                          onChange={(e) => setDistrict(e.target.value)}
                        >
                          <option value="">Chọn quận/huyện</option>
                          {districts.map((district) => (
                            <option value={district.name}>
                              {district.name}
                            </option>
                          ))}
                        </select>
                        <div className="text-danger">
                          {errors.district && <div>{errors.district}</div>}
                        </div>
                      </div>
                      <div className="form-group">
                        <select
                          className="form-control"
                          onChange={(e) => setWard(e.target.value)}
                        >
                          <option value="">Chọn phường/xã</option>
                          {wards.map((ward) => (
                            <option value={ward.name}>{ward.name}</option>
                          ))}
                        </select>
                        <div className="text-danger">
                          {errors.ward && <div>{errors.ward}</div>}
                        </div>
                      </div>
                      <div className="form-group">
                        <input
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="form-control"
                          placeholder="Nhập địa chỉ"
                        />
                        <div className="text-danger">
                          {errors.address && <div>{errors.address}</div>}
                        </div>
                      </div>
                      <div className="form-group">
                        <select
                          onChange={(e) => setLevel(e.target.value)}
                          className="form-control"
                        >
                          <option value="">Chọn cấp bậc</option>
                          {levels.map((level) => (
                            <option value={level.name}>{level.name}</option>
                          ))}
                        </select>
                        <div className="text-danger">
                          {errors.level && <div>{errors.level}</div>}
                        </div>
                      </div>
                      <div className="form-group">
                        <select
                          onChange={(e) => setSchool(e.target.value)}
                          className="form-control"
                        >
                          <option value="">Chọn trường</option>
                          {schools.map((school) => (
                            <option value={school.name}>{school.name}</option>
                          ))}
                        </select>
                        <div className="text-danger">
                          {errors.school && <div>{errors.school}</div>}
                        </div>
                      </div>
                      <div className="form-group">
                        <select
                          className="form-control"
                          onChange={(e) => setMajor(e.target.value)}
                        >
                          <option value="">Chọn ngành</option>
                          {majors.map((major) => (
                            <option value={major.name}>{major.name}</option>
                          ))}
                        </select>
                        <div className="text-danger">
                          {errors.major && <div>{errors.major}</div>}
                        </div>
                      </div>
                      <div className="form-group">
                        <input
                          value={jobTitle}
                          onChange={(e) => setJobTitle(e.target.value)}
                          className="form-control"
                          placeholder="Nhập chức danh"
                        />
                        <div className="text-danger">
                          {errors.jobTitle && <div>{errors.jobTitle}</div>}
                        </div>
                      </div>
                      <div className="form-group">
                        <input
                          type="month"
                          value={startYear}
                          onChange={(e) => setStartYear(e.target.value)}
                          className="form-control"
                          placeholder="Nhập năm bắt đầu"
                        />
                        <div className="text-danger">
                          {errors.startYear && <div>{errors.startYear}</div>}
                        </div>
                      </div>
                      <div className="form-group">
                        <input
                          type="month"
                          value={endYear}
                          onChange={(e) => setEndYear(e.target.value)}
                          className="form-control"
                          placeholder="Nhập năm kết thúc"
                        />
                        <div className="text-danger">
                          {errors.endYear && <div>{errors.endYear}</div>}
                        </div>
                      </div>
                      <div className="form-group">
                        <input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="form-control"
                          placeholder="Nhập email"
                        />
                        <div className="text-danger">
                          {errors.email && <div>{errors.email}</div>}
                        </div>
                      </div>
                      <div className="form-group">
                        <input
                          value={password}
                          className="form-control"
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Nhập mật khẩu"
                        />
                        <div className="text-danger">
                          {errors.password && <div>{errors.password}</div>}
                        </div>
                      </div>
                      <div className="form-group text-left">
                        <button
                          type="submit"
                          className="site-button dz-xs-flex m-r5"
                        >
                          Đăng ký
                        </button>
                        <span className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="check1"
                            name="example1"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="check1"
                          >
                            Remember me
                          </label>
                        </span>
                        <Link
                          data-toggle="tab"
                          to="#forgot-password"
                          className="forget-pass m-l5"
                        >
                          <i className="fa fa-unlock-alt"></i> Quên mật khẩu
                        </Link>
                      </div>
                      <div className="dz-social clearfix d-none">
                        <h5 className="form-title m-t5 pull-left">
                          Sign In With
                        </h5>
                        <ul className="dez-social-icon dez-border pull-right dez-social-icon-lg text-white">
                          <li>
                            <Link
                              to={""}
                              className="fa fa-facebook  fb-btn mr-1"
                              target="bank"
                            ></Link>
                          </li>
                          <li>
                            <Link
                              to={""}
                              className="fa fa-twitter  tw-btn mr-1"
                              target="bank"
                            ></Link>
                          </li>
                          <li>
                            <Link
                              to={""}
                              className="fa fa-linkedin link-btn mr-1"
                              target="bank"
                            ></Link>
                          </li>
                          <li>
                            <Link
                              to={""}
                              className="fa fa-google-plus  gplus-btn"
                              target="bank"
                            ></Link>
                          </li>
                        </ul>
                      </div>
                    </form>
                    <div className="text-center bottom">
                      <Link
                        to="/login"
                        className="site-button button-md btn-block text-white"
                      >
                        Đăng nhập
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="bottom-footer clearfix m-t10 m-b20 row text-center">
                  <div className="col-lg-12 text-center">
                    <span>
                      {" "}
                      © Copyright by{" "}
                      <i className="fa fa-heart m-lr5 text-red heart"></i>
                      <Link to={""}>CVIDPRO </Link> All rights reserved.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
